/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//given a tweet object
// create JS function that geneartes DOM structure for a tweet
//document ready function- code inside here will only run once the page(DOM) is ready for JavaScript code to execute
$(document).ready(function () {

  const createTweetElement = function (tweetObj) {
    const $tweet = $("<article>").addClass("tweet");
    const markup = `
<header>
<img src = ${tweetObj.user.avatars}>
<span> ${tweetObj.user.name}></span>
<span> ${tweetObj.user.handle}></span>
</header>
<span>${tweetObj.content.text}</span>

<footer>
<span>${timeago.format(created_at)}></span>
<span class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-regular fa-heart"></i></span>
</footer>`;
    $tweet.append(markup);
    return $tweet;
  }
});

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("section.all-tweets").append($tweet);
  }
};


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.all-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.