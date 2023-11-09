
console.log("script.js");
// LoadData();

return;

$(function() {
    $.each(catalog, function(index, gameObject) {
        // let gameContainer = $('<div class="gameContainer"></div>');
        // let titleContainer = $('<div class="title"></div>').html(gameObject.title);
        // let genresContainer = $('<div class="genres"></div>');
        // let modesContainer = $('<div class="modes"></div>');
        // let imageContainer = $('<img class="image"></img>').attr("src", gameObject.image);

        // $.each(gameObject.genres, function(index, gameGenre) {
        //     genresContainer.append($("<p></p>").html(gameGenre));
        // });

        
        // let modesTable = $('<table class="mode"></table>');

        // $.each(gameObject.modes, function(gameMode, playerCount) {
        //     modesTable.append($("<tr></tr>")
        //         .append($("<td></td>").html(gameMode))
        //         .append($("<td></td>").html(playerCount))
        //     );

        //     // mode.append($('<p class="titlet"></p>').html(gameMode));
        //     // mode.append($('<p class="playercount"></p>').html(playerCount));

        // });

        
        // modesContainer.append(modesTable);

        // gameContainer.append(titleContainer);
        // gameContainer.append(genresContainer);
        // gameContainer.append(modesContainer);
        // gameContainer.append(imageContainer);

        let game = $('<tr class="game" data-name="' + gameObject.title + '"></tr>');
        let title = $('<td class="game-title"></td>').html(  gameObject.title +((gameObject.releaseYear!==undefined&&gameObject.releaseYear>0)?" ("+gameObject.releaseYear+")":"") );
        let genres = $('<td class="game-genres"></td>');
        let modes = $('<td class="game-modes"></td>');
        let image = $('<td class="game-thumbnail"></td>').append($('<img></img>').attr("src", gameObject.image));
        
        $.each(gameObject.genres, function(index, gameGenre) {
            genres.append($("<p></p>").html(gameGenre));
            game.data("name", game.data("name") + "," + gameGenre);
        });
        
        let modesTable = $('<table class="mode"></table>');

        $.each(gameObject.modes, function(gameMode, playerCount) {
            modesTable.append($("<tr></tr>")
                .append($("<td></td>").html(gameMode))
                .append($("<td></td>").html(playerCount))
            );
            
            game.data("name", game.data("name") + "," + gameMode);
        });

        game.data("name", game.data("name").toLowerCase());

        modes.append(modesTable);

        game.append(title);
        game.append(genres);
        game.append(modes);
        game.append(image);

        $("#games").append(game);
    });

    $("#searchfield-genre").on("keyup", function(event) {
        $(".game").each(function(index, element) {
            searchValue = event.target.value.toLowerCase();

            if($(element).data("name").includes(searchValue)) {
                $(element).show();
            }
            else {
                $(element).hide();
            }
        });
    });
 });