$(document).ready(function() {

    // Buttons for shows
    var gameShows = ["Family Fued", "Price is Right", "Deal or No Deal", "wheel of Fortune", "Jepordy", "Newly Weds"];
    var gameShowsImages = [""];
    var counter = 0;

    for (var i = 0; i < gameShows.length; i++) {
        var newButton = $('<button>');
        newButton.html(gameShows[i]).attr('class', 'gs');
        $('#buttonDiv').append(newButton);
    }
    // Gets users text and generates a button
    $('#gsButtonGenerator').on('click', function() {
        event.preventDefault();
        var newInput = $('#gsSearchBar').val().trim();
        gameShows.push(newInput);
        // Emptys div buttons are in
        $('#buttonDiv').empty();

        // repopulate the buttonDiv with new arrary
        for (var i = 0; i < gameShows.length; i++) {
            var newButton = $('<button>');
            newButton.html(gameShows[i]).attr('class', 'gs');
            $('#buttonDiv').append(newButton);
        }
    });


    $('#buttonDiv').on('click', '.gs', function() {
        // replaces spaces with +
        var queryId = ($(this).html()).replace(/ /g, '+');
        queryURL = "https://api.giphy.com/v1/gifs/search?q= " + queryId + "&limit=9&api_key=dc6zaTOxFJmzC"
        $.ajax({
            method: "GET",
            url: queryURL
        }).done(function(response) {
            // emptys the div that the divs are held in
            // $('#gifsDiv').empty();
            gameShowsImages = [];
            // create div for each image
            for (var i = 0; i < response.data.length; i++) {
                // var gifImg = $('<img>');
                // var gifImgDiv = $('<div>');
                // gifImgDiv.attr('class', 'gifsDiv text-center');
                // gifImg.attr({ src: response.data[i].images.fixed_height_still.url, state: 'still', 'data-actice': response.data[i].images.fixed_height.url, 'data-still': response.data[i].images.fixed_height_still.url,  'class': 'gifImage' })
                // img.attr({ src: gameShowsImages[0].src, state: gameShowsImages[0].state, 'data-actice': gameShowsImages[0]['data-actice'], 'data-still': gameShowsImages[0]['data-still'], rating: gameShowsImages[0].rating, 'class': gameShowsImages[0]['class'] })
                gameShowsImages.push({ src: response.data[i].images.fixed_height_still.url, state: 'still', 'data-actice': response.data[i].images.fixed_height.url, 'data-still': response.data[i].images.fixed_height_still.url, ratin: response.data[i].rating, 'class': 'gifImage' });
                // gifImgDiv.append('<p> Rating:  ' + response.data[i].rating + '</p>', gifImg);
                // $('#gifsDiv').append(gifImgDiv);
            }
            slideShow();
        })
    });

    function slideShow() {
        $('.gifSlideShow:nth-child(1)').empty();
        console.log(gameShowsImages);
        console.log(gameShowsImages[0]);
        var img = $('<img>');
        img.attr({ src: gameShowsImages[0].src, state: gameShowsImages[0].state, 'data-actice': gameShowsImages[0]['data-actice'], 'data-still': gameShowsImages[0]['data-still'], rating: gameShowsImages[0].rating, 'class': gameShowsImages[0]['class'] })
        $('.gifSlideShow' + counter).append(img);
    }


    $('#nextImg').on('click', function() {
        if (counter < 8) {
            $('.gifSlideShow' + counter).empty();
            counter++
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] });
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
        } else if (counter === 8) {
            $('.gifSlideShow' + counter).empty();
            counter = 0;
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] });
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
        }
    });


    $('#previousImg').on('click', function() {
        if (counter > 1) {
            $('.gifSlideShow' + counter).empty();
            counter--
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] })
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
        } else if (counter === 1) {
            $('.gifSlideShow' + counter).empty();
            counter = 8;
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] })
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
        }
    });

    // Changes the state of the gif when it was clicked
    $('#gifsDiv').on('click', 'img', function() {
        console.log("Current state is " + $(this).attr('state'));
        if ($(this).attr('state') === 'still') {
            $(this).attr({ 'src': $(this).attr('data-actice'), state: 'active' });
        } else if ($(this).attr('state') === 'active') {
            $(this).attr({ 'src': $(this).attr('data-still'), state: 'still' });

        }
    });
});
