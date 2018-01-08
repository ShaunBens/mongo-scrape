var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Story
      .find({ saved: false })
      .then(function(dbStory) {
        res.render("index", { stories: dbStory });
      }).catch(function(err) {
        res.json(err);
      });
  });

  //Pull data from the database
  app.get("/all", function(req, res) {
    db.Story
      .find({})
      .then(function(dbStory) {
        res.json(dbStory);
      }).catch(function(err) {
        res.json(err);
      });
  });

  //Scrape route to put data into mongodb
  app.get("/scrape", function(req, res) {
    request("https://disneyparks.disney.go.com/blog/latest-stories/", function(error, response, html) {
      var $ = cheerio.load(html);

      $(".stories-list").children(".row").each(function(i, element) {
        var story = {};

        story.headline = $(element).children("div.story-description").children("div.header-arrow").children("h5").text();
        story.author = $(element).children("div.story-description").children("div.header-arrow").children("div.module-byuser").children("p").text();
        story.link = $(element).children("div.col-sm-5").children("a").attr("href");
        story.photo = $(element).children("div.col-sm-5").children("a").children("img").attr("src");

        // console.log(story.headline + ": Story Headline");
        // console.log(story.author + ": Author");
        // console.log(story.link + ": Link");
        // console.log(story.photo + ": photo");
        // console.log(story);

        if (story.headline && story.author && story.link && story.photo) {
          db.Story
            .create(story)
            .then(function(dbStory) {

            }).catch(function(err) {
              res.json(err);
            });
        }

      });
      res.redirect("/");
    });
  });

  //Save an article
  app.put("/save/:id", function(req, res) {
    db.Story
      .findOneAndUpdate({ _id: req.params.id }, { saved: true })
      .then(function(dbStory) {
        res.json(dbStory);
      }).catch(function(err) {
        res.json(err);
      });
  });

  //Unsave an aritcle
  app.put("/unsave/:id", function(req, res) {
    db.Story
      .findOneAndUpdate({ _id: req.params.id }, { saved: false })
      .then(function(dbStory) {
        res.json(dbStory);
      }).catch(function(err) {
        res.json(err);
      });
  });

  //Display all saved articles
  app.get("/saved", function(req, res) {
    db.Story
      .find({ saved: true })
      .then(function(dbStory) {
        res.render("savedStories", { stories: dbStory });
      }).catch(function(err) {
        res.json(err);
      });
  });

  //Save and update Article's populated comments
  app.post("/comments/:id", function(req, res) {

    //Create a new comment and pass it to the article entry
    db.Comment
      .create(req.body)
      .then(function(dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: dbComment._id } }, { new: true });
      }).then(function(dbStory) {
        res.json(dbStory);
      }).catch(function(err) {
        res.json(err);
      });
  });

  //Grab a specific article by its ID, and populate it with it's comments
  app.get("/articles/:id", function(req, res) {
    db.Story
      .findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(dbStory) {
        res.json(dbStory);
      }).catch(function(err) {
        res.json(err);
      });
  });

  //Remove a comment from an article
  app.put("/comments/remove/:id", function(req, res) {
    db.Comment
      .findOneAndRemove({ _id: req.params.id })
      .then(function(dbComment) {
        res.json(dbComment);
      }).catch(function(err) {
        res.json(err);
      });
  });



};
