'use strict';

var rover = {};

rover.roverApiKey = 'lcjdv0yXDikxF5uomOk79VCAgZ1lt1XtEGLxIFmC';

//----------
//API Calls
//----------
rover.getNasa = function () {
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover.roverChoice + '/photos',
        method: 'GET',
        dataType: 'json',
        data: {
            sol: '10',
            api_key: rover.roverApiKey
            // page: '1',
            // camera: 'NAVCAM'
        }
    }).then(function (res) {
        console.log(res);
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

//-------
// intro
//-------
rover.introSubmit = function () {
    var intro = $('.intro-container');
    var main = $('.main-container');
    main.hide();
    $('#chooseRover').on('change', function () {
        rover.roverChoice = $(this).val();
        intro.hide();
        main.show();
    });
};

//---------------
//parallax effect
//---------------
rover.scroll = function () {
    $.jInvertScroll(['.sand', '.pink-container', '.green-container', '.red-container', '.yellow-container', '#myCanvas']);
};

//random number generator 
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
    console.log(quoteText, quoteAuthor);
};

rover.quoteDisplayTimer = function () {
    setInterval(function () {
        rover.getQuote();
        var quoteContainer = $('.quote');
        quoteContainer.toggle('.hide');
    }, 10000);
};

//-------
// Nasa 
//-------
rover.imgContainer = $('.nasa-image');

rover.displayNasaImg = function (roverImgs) {
    var randomIndex = rover.randomNum(roverImgs.length);
    var imgChoice = roverImgs[randomIndex].img_src;
    rover.imgContainer.addClass('show');
    rover.imgContainer.removeClass('hide');
    console.log(imgChoice);
    rover.imgContainer.html('<img src="' + imgChoice + '">\n        <span class="close-button">&#x2715</span>');
};

rover.eventRoverClick = function () {
    $('.rover-img').on('click', function () {
        rover.getNasa();
    });
};

rover.eventCloseClick = function () {
    var nasaImgContainer = $('.nasa-image');
    nasaImgContainer.on('click', '.close-button', function () {
        rover.imgContainer.addClass('hide');
        rover.imgContainer.removeClass('show');
    });
};

//-------
// Intro
//-------

rover.charge = function () {
    var obj = { charged: '0%' };

    var JSobject = anime({
        targets: obj,
        charged: '100%',
        round: 1,
        easing: 'linear',
        update: function update() {
            var el = document.querySelector('#charge pre');
            el.innerHTML = JSON.stringify(obj);
        }
    });
};

rover.init = function () {
    //focus on input on load
    var select = $('.rover-selection-container').focus();
    //charging rover
    rover.charge();
    // hiding the intro container
    rover.introSubmit();
    //start inverted parallax scroll
    rover.scroll();
    //start timer to display quote
    rover.quoteDisplayTimer();
    //click rover to get NASA imgs
    rover.eventRoverClick();
    //click to close NASA imgs
    rover.eventCloseClick();
};

$(rover.init());