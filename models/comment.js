//Creating a new constructor to hold the comments in our database

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
