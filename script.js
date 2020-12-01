$(function() {
    $.each(catalog, function(index, gameObject) {
        let gameContainer = $('<div class="game"></div>');
        let titleContainer = $('<div class="title"></div>').html(gameObject.title);
        let genresContainer = $('<div class="genres"></div>');
        let modesContainer = $('<div class="modes"></div>');
        let imageContainer = $('<img class="image"></img>').attr("src", gameObject.image);

        gameContainer.append(titleContainer);
        gameContainer.append(genresContainer);
        gameContainer.append(modesContainer);
        gameContainer.append(imageContainer);

        $("#games").append(gameContainer);
    });
 });