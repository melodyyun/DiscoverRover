'use strict';

var rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC';

//----------
//API Calls
//----------
rover.getNasa = function () {
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
        method: 'GET',
        dataType: 'json',
        data: {
            sol: '1000',
            api_key: rover.roverApiKey,
            page: '1',
            camera: 'NAVCAM'
        }
    }).then(function (res) {
        rover.displayNasaImg(res.photos);
    });
};

rover.getQuote = function () {
    $.ajax({
        url: 'https://api.forismatic.com/api/1.0/',
        method: 'getQuote',
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
            method: "getQuote",
            lang: "en",
            format: "jsonp"
        }
    }).then(function (res) {
        rover.displayQuote(res);
    });
};
//---------------
//parallax effect
//---------------
rover.scroll = function () {
    $.jInvertScroll(['.foreground', '.sand', '.sky', '.mountains1', '.mountains2', '.mountains3']);
};

//rando number generator 
rover.randomNum = function (max) {
    return Math.floor(Math.random() * max);
};

//------
//Quote
//------
rover.displayQuote = function (quote) {
    var quoteText = quote.quoteText;
    var quoteAuthor = quote.quoteAuthor;
    var quoteContainer = $('.quote');
    quoteContainer.empty();
    quoteContainer.append('<q>' + quoteText + '</q> \n                        <p>' + quoteAuthor + '</p>');
    //console.log(quoteText, quoteAuthor);
};

rover.quoteDisplayTimer = function () {
    setInterval(function () {
        rover.getQuote();
    }, 10000);
};

//HELP CUE!!!!!!!!
//NEED PROMISE
rover.toggleQuoteDisplayTimer = function () {
    setInterval(function () {
        var quoteContainer = $('.quote');
        quoteContainer.toggle('.hide');
    }, 10000);
};

// $.when(jokeOne, jokeTwo)
//     .then((resOne, resTwo) => {
//         //returns array
//         console.log(resOne, resTwo)
//         console.log(resOne[0], resTwo[0])
//     })
//     .fail((err) => {
//         console.log(err);
//     });

//-------
// Nasa 
//-------
rover.displayNasaImg = function (roverImgs) {
    var randomIndex = rover.randomNum(roverImgs.length);
    var imgChoice = roverImgs[randomIndex].img_src;
    console.log(imgChoice);
};

rover.eventRoverClick = function () {
    $('.rover-img').on('click', function () {
        rover.getNasa();
    });
};

//---------------------
// Adjust Screen sizes
//---------------------

// rover.adjustBackgroundForScreenResize = () => {
//     window.onresize = displayWindowSize;
//     window.onload = displayWindowSize;

//     function displayWindowSize() {
//         const windowWidth = window.innerWidth;
//         //const windowHeight = window.innerHeight;
//         console.log(windowWidth);
//         const skyBG = $('.sky');
//         skyBG.css('width', '105vw');
//     };
// }

// rover.windowResize = () => {
//     $(window).resize(
//         function () {
//             console.log('window resizing');
//             rover.adjustBackgroundForScreenResize();
//     });
// }

rover.init = function () {
    //start inverted parallax scroll
    rover.scroll();
    //start timer to display quote
    rover.quoteDisplayTimer();
    rover.toggleQuoteDisplayTimer();
    //click rover to get NASA imgs
    rover.eventRoverClick();
};

$(rover.init());