//Creating a new constructor to hold the scraped articles in our database

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },

    link: {
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

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
