/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//given a tweet object
// create JS function that geneartes DOM structure for a tweet
//document ready function- code inside here will only run once the page(DOM) is ready for JavaScript code to execute

$(document).ready(function () {


  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function (tweetObj) {
    const $tweet = $("<article>").addClass("tweet");
    const markup = `
<header class="header">
<img src = ${tweetObj.user.avatars}>
<span>${tweetObj.user.name}</span>
<span> ${tweetObj.user.handle}</span>
</header>
<span>${escape(tweetObj.content.text)}</span>

<footer>
<span>${timeago.format(tweetObj.created_at)}></span>
<span class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-regular fa-heart"></i></span>
</footer>`;
    let tweetElement = $tweet.append(markup)
    return tweetElement;

  }


  const renderTweets = function (tweets) {
    //takes in an array of tweet objects
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    let tweetContainer = $('.all-tweets');

    tweets.forEach((tweet) => {
      let tweetElement = createTweetElement(tweet);
      tweetContainer.prepend(tweetElement)
    })
  };

  //get tweets
  const loadTweets = function () {
    $.ajax('/tweets', { method: "GET", dataType: "json" })
      .then(function (allTweets) {
        renderTweets(allTweets);
      })
  }
  loadTweets();
  // tweetContainer.empty();

  //send data to server ajax
  $('#form').on('submit', function (event) {
    event.preventDefault();
    let tweetLength = $("#tweet-text").val();
    if (tweetLength === "" || tweetLength === null) {
      alert("Tweet cannot be empty.");
      return;
    }
    if (tweetLength.length > 140) {
      alert(`Tweet cannot be more than 140 characters- you have ${tweetLength}.`);
      return;
    }
    $.ajax({
      method: "POST",
      url: $("#form").attr("action"),
      data: $("#form").serialize(),
      success: () => loadTweets(),
    })
    //this line empties the input field so you can enter a new tweet
    $("#tweet-text").val('');
  })
  loadTweets();


});

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

