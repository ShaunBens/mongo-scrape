$(function() {
  $("#saveStory").click(function(e) {
    e.preventDefault();

    // Get the id of the data attribute from the parent div
    var storyId = $(this).parents('.storyItem').data("id");

    // Ajax PUT request for the save route
    $.ajax({
      method: "PUT",
      url: "/save/" + storyId,
    }).then(function(data) {
      if (data) {
        $("[data-id='" + data._id + "']").remove();

      }
    });
  });

  $("#unsaveStory").click(function(e) {
    e.preventDefault();

    // Get the id of the data attribute from the parent div
    var storyId = $(this).parents('.storyItem').data("id");

    // Ajax PUT request for the save route
    $.ajax({
      method: "PUT",
      url: "/unsave/" + storyId,
    }).then(function(dbStory) {
      if (dbStory) {
        $("[data-id='" + dbStory._id + "']").remove();
        dbStory.render("savedStories", { stories: dbStory });
      }
    });
    console.log(storyId);
  });


}); //End Document Ready
