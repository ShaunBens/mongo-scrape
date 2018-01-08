$(function() {
  $("#saveStory").click(function(e) {
    e.preventDefault();

    // Get the id of the data attribute from the parent div
    var storyId = $(this).parents('.storyItem').data("id");

    // Ajax PUT request for the save route
    $.ajax({
      method: "PUT",
      url: "/save/" + storyId,
    }).then(function(dbStory) {
      if (dbStory) {
        $("[data-id='" + dbStory._id + "']").remove();
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
      }
    });
  });

  $("#viewComment").click(function(e) {
    e.preventDefault();

    var storyId = $(this).parents('.storyItem').data('id');
    var storyHeadline = $(this).parents('.storyItem').find('#storyHeadline').text();
    console.log(storyHeadline);

  })


}); //End Document Ready
