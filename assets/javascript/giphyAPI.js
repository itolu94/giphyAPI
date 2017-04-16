$(document).ready(function() {

    // Buttons for shows
    var gameShows = ["Family Fued", "Price is Right", "Deal or No Deal", "wheel of Fortune", "Jepordy", "Newly Weds"];
    var gameShowsImages;
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
            gameShowsImages = [];
            for (var i = 0; i < response.data.length; i++) {
                gameShowsImages.push({ src: response.data[i].images.fixed_height_still.url, state: 'still', 'data-actice': response.data[i].images.fixed_height.url, 'data-still': response.data[i].images.fixed_height_still.url, rating: response.data[i].rating, 'class': 'gifImage' });
            }
            slideShow();
        })
    });

    function slideShow() {
        $('.gifSlideShow' + counter).empty();
        console.log(gameShowsImages);
        console.log(gameShowsImages[counter]);
        var img = $('<img>');
        img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] })
        $('.gifSlideShow' + counter).append(img);
        var paragraph = $('<p>')
        paragraph.html("Rating: " + gameShowsImages[counter].rating)
        $('.gifSlideShow' + counter).append(paragraph);

    }


    $('#nextImg').on('click', function() {
        // checks to see if we are on the last img
        if (counter < 8) {
            // remove img that was previously on the screen
            $('.gifSlideShow' + counter).empty();
            // increase counter
            counter++
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] });
            // animate img onto screen
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
            var paragraph = $('<p>')
            paragraph.html("Rating: " + gameShowsImages[counter].rating)
            // append rating onto screen
            $('.gifSlideShow' + counter).append(paragraph);
            // if we are on the last img, we go back to the first img
        } else if (counter === 8) {
            $('.gifSlideShow' + counter).empty();
            counter = 0;
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] });
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
            var paragraph = $('<p>')
            paragraph.html("Rating: " + gameShowsImages[counter].rating)
            $('.gifSlideShow' + counter).append(paragraph);
        }
    });


    $('#previousImg').on('click', function() {
        // checks to see if we are at the first img
        if (counter > 1) {
            $('.gifSlideShow' + counter).empty();
            counter--
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] })
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
            var paragraph = $('<p>')
            paragraph.html("Rating: " + gameShowsImages[counter].rating)
            $('.gifSlideShow' + counter).append(paragraph);
            // if we are at the first img, we change the counter to the last img
        } else if (counter === 1) {
            $('.gifSlideShow' + counter).empty();
            counter = 8;
            var img = $('<img>');
            img.attr({ src: gameShowsImages[counter].src, state: gameShowsImages[counter].state, 'data-actice': gameShowsImages[counter]['data-actice'], 'data-still': gameShowsImages[counter]['data-still'], rating: gameShowsImages[counter].rating, 'class': gameShowsImages[counter]['class'] })
            $('.gifSlideShow' + counter).append(img).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
            var paragraph = $('<p>')
            paragraph.html("Rating: " + gameShowsImages[counter].rating)
            $('.gifSlideShow' + counter).append(paragraph);
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
