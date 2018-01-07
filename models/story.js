//Creating a new constructor to hold the scraped stories in our database

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema({
  headline: {
    type: String,
    unique: true,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  photo: {
    type: String,
    required: true
  },

  saved: {
    type: Boolean,
    default: false,
    required: true
  },

  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var Story = mongoose.model("Story", StorySchema);

module.exports = Story;
