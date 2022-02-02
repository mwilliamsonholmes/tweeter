$(document).ready(function () {
  $('#tweet-text').on("input", function () {
    let newTweet = $(this).val().length;
    let characterLeft = 140 - newTweet;
    let counterElement = $(this).next().find(".counter");
    counterElement.text(140 - newTweet);
    if (characterLeft < 0) {
      counterElement.addClass("color-red");
    } else {
      counterElement.removeClass("color-red");
    }
  })
});