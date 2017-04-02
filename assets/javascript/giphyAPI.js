// Buttons for shows
var gameShows = ["Family Fued", "Price is Right", "Deal or No Deal", "wheel of Fortune", "Jepordy", "Newly Weds"];

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
        $('#gifsDiv').empty();

        // create div for each image
        for (var i = 0; i < response.data.length; i++) {
            var gifImg = $('<img>');
            var gifImgDiv = $('<div>');
            gifImgDiv.attr('class', 'gifsDiv text-center');
            gifImg.attr({ src: response.data[i].images.fixed_height_still.url, state: 'still', 'data-actice': response.data[i].images.fixed_height.url, 'data-still': response.data[i].images.fixed_height_still.url, 'class': 'gifImage' })
            gifImgDiv.append('<p> Rating:  ' + response.data[i].rating + '</p>', gifImg);
            $('#gifsDiv').append(gifImgDiv);
        }
    })
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
