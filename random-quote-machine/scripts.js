$(document).ready(function() {
  $(".new-quote").on("click", function() {
    animateIt();
    setQuote();
    onResize();
  });

  $(".twitter-share-button").on("click", function tweet(e) {
    $(".twitter-share-button").attr('href', 
    "https://twitter.com/intent/tweet?text=" 
    + encodeURI($(".quote").text()) + "-  " + encodeURI($(".quote-author").text()));
  });
  $(".new-quote").click(); // Initialize new quote generating;
});

function animateIt() {
  var colors = getColors()[Math.floor(Math.random() * 6)];
  last = "#000";
  while (last == colors[0])
    colors = getColors()[Math.floor(Math.random() * 6)];
  last = colors[0];
  console.log(colors[0], last);
  
  $("body").animate( { backgroundColor: colors[0] }, 400);
  $(".quote-container").animate( { backgroundColor: colors[1], 
    borderColor: colors[1], color: colors[0]}, 400);
  $(".button").animate( { backgroundColor: colors[0], color: colors[1] }, 400);
}

function onResize() {
  $(window).resize(function() {
    $(".quote-container").css( {
      position: 'absolute',
      top: ($(window).height() - $(".quote-container").outerHeight()) / 2,
      left: ($(window).width() - $(".quote-container").outerWidth()) / 2
    });
  });
  $(window).resize();
}

function setQuote() {
  var quote = newQuote();
  $(".quote").html("<i class='fa fa-quote-left'></i>  " +  quote["quote"] 
      + "  <i class='fa fa-quote-right'></i>");
  $(".quote-author").text(quote["author"]);
}

function newQuote() {
  var QUOTES = getQuotes();
  var last = 0, random = 0;

  while (last == random)
   random = Math.floor((Math.random() * 12) + 1);
  last = random;

  return QUOTES[random];
}

function getColors() {
return [["#333", "#fff"], ["#854785", "#B6C669"], ["#43787D", "#CD9A6D"], 
        ["#A5C166", "#A25684"], ["#57A457", "#CD6D6D"], ["#734C89", "#CDCD6D"]]
}

function getQuotes() {
  return {
    "1": {
      "author": "H. Jackson Brown, Jr.",
      "quote": "The best preparation for tomorrow is doing your best today." 
    },
    "2": {
      "author": "Helen Keller",
      "quote": "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart."
    },
    "3": {
      "author": "Joyce Brothers",
      "quote": "A strong, positive self-image is the best possible preparation for success."
    },
    "4": {
      "author": "Og Mandino",
      "quote": "Always do your best. What you plant now, you will harvest later."
    },
    "5": {
      "author": "Audrey Hepburn",
      "quote": "The best thing to hold onto in life is each other."
    },
    "6": {
      "author": "Henry Ford",
      "quote": "My best friend is the one who brings out the best in me."
    },
    "7": {
      "author": "George Allen, Sr.",
      "quote": "Work hard, stay positive, and get up early. It's the best part of the day."
    },
    "8": {
      "author": "Benjamin Franklin",
      "quote": "An investment in knowledge pays the best interest."
    },
    "9": {
      "author": "Buddha",
      "quote": "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."
    },
    "10": {
      "author": "Mahatma Gandhi",
      "quote": "The best way to find yourself is to lose yourself in the service of others."
    },
    "11": {
      "author": "Dave Pelzer",
      "quote": "To help yourself, you must be yourself. Be the best that you can be. When you make a mistake, learn from it, pick yourself up and move on."
    },
    "12": {
      "author": "Theodore Roosevelt",
      "quote": "Keep your eyes on the stars, and your feet on the ground."
    }
  }
}