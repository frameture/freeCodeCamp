$(document).ready(function() {
  setQuote();
  onResize();
  $(".button").on("click", function() {
    setQuote();
    onResize();
  });
});

function onResize() {
  $(window).resize(function() {
    $(".quote-container").css( {
      position: 'absolute',
      top: ($(window).height() - $(".quote-container").outerHeight()) / 2,
      left: ($(window).width() - $(".quote-container").outerWidth()) / 2
    });
  });
  $(window).resize();
  $(window).resize();
}

function setQuote() {
  var quote = newQuote();
  $(".quote").text(quote["quote"]);
  $(".quote-author").text(quote["author"]);
}

function newQuote() {
  var QUOTES = getQuotes();
  var last, random;

  while (last == random)
   random = Math.floor((Math.random() * 6) + 1);
  last = random;

  return QUOTES[random];
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
    }
  }
}