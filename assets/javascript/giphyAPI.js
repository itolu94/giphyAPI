var gameShows = ["Family Fued", "Price is Right", "Deal or No Deal", "wheel of Fortune", "Jepordy", "Newly Weds"];





$('#gsButtonGenorator').on('click', function() {
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
    // get the users input and if spaces are in 
    var queryId = ($(this).html()).replace(/ /g, '+');
    queryURL = "http://api.giphy.com/v1/gifs/search?q= " + queryId + "&limit=9&api_key=dc6zaTOxFJmzC"
    $.ajax({
        method: "GET",
        url: queryURL
    }).done(function(response) {
        console.log(response);
        // console.log(response.data[0].images.original.url);
        // console.log(response.data[0].images.original_still.url);
        $('#gifsDiv').empty();
        for (var i = 0; i < response.data.length; i++) {
            var gifImg = $('<img>');
            var gifImgDiv =  $('<div>');
            gifImgDiv.attr('class', 'gifsDiv text-center');
            gifImg.attr({ src: response.data[i].images.fixed_height_still.url, state: 'still', 'data-actice': response.data[i].images.fixed_height.url, 'data-still': response.data[i].images.fixed_height_still.url, 'class': 'gifImage'})
            gifImgDiv.append('<p> Rating:  ' + response.data[i].rating +'</p>' , gifImg);
            $('#gifsDiv').append(gifImgDiv);
        }
    })





});


$('#gifsDiv').on('click', 'img', function() {
    console.log("Current state is " + $(this).attr('state'));
    if ($(this).attr('state') === 'still') {
    	$(this).attr({'src': $(this).attr('data-actice'), state: 'active'});
    } else if ($(this).attr('state') === 'active'){
    	$(this).attr({'src': $(this).attr('data-still'), state: 'still'});

    }
});
