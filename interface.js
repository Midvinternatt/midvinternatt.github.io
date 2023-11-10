
function OnSearchInput() {
    UpdateGameList();
}

function UpdateGameList() {
    document.querySelectorAll(".game").forEach(gameDiv => {
        gameDiv.style.display = "none";
    });

    console.log(document.getElementById("searchfield-input").value);

    let filteredGames = GetAllGames()
    filteredGames = FilterGamesMatching(GetAllGames(), document.getElementById("searchfield-input").value);

    filteredGames.forEach(game => {
        game.div.style.display = "block";
    });
}

function PopulateGenreList() {
    let genreWrapper = document.getElementById("genre-list");

    GetAllGenres().forEach(genre => {
        const genreElement = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", UpdateGameList);

        const label = document.createElement("label");
        label.innerText = genre;
        
        genreElement.appendChild(checkbox);
        genreElement.appendChild(label);
        
        genreWrapper.appendChild(genreItem);
    });
}

function PopulateGameList() {
    let gameContainer = document.getElementById("games-container");

    GetAllGames().forEach(game => {
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("game");
        game.div = gameDiv;

        // Game title
        const title = document.createElement("h1");
        title.classList.add("game-title");
        title.innerText = game.title;

        // Image thumbnail
        const image = document.createElement("img");
        image.classList.add("game-image");
        image.src = game.image;

        // Release year, shown if defined and > 0
        const releaseYear = document.createElement("span");
        releaseYear.classList.add("game-releaseYear");
        if(game.releaseYear!==undefined && game.releaseYear!==0)
            releaseYear.innerText = game.releaseYear;
            
        // Header text for genres
        const genreHeader = document.createElement("h1");
        genreHeader.classList.add("game-genre-header");
        genreHeader.innerText = "Genres:";
        
        // List of genres
        const genres = document.createElement("span");
        genres.classList.add("game-genres");
        if(Array.isArray(game.genres)) {
            game.genres.forEach(genre => genres.innerText += genre + ", ");
            genres.innerText = genres.innerText.replace(/,\s$/, '');
        }

        // Container for game mode table
        const modes = document.createElement("div");
        modes.classList.add("game-modes");

        // Table containing game mode and supported player count
        const modesTable = document.createElement("table");
        modesTable.classList.add("game-modes-table");

        // Header row for table
        const firstRow = document.createElement("tr");
        const firstColumn = document.createElement("td");
        const secondColumn = document.createElement("td");
            firstColumn.innerText = "Game Modes:";
            secondColumn.innerText = "Players:";
        firstRow.appendChild(firstColumn);
        firstRow.appendChild(secondColumn);
        modesTable.appendChild(firstRow);

        // Populate the table
        if(game.modes!==undefined) {
            const modeArray = Object.keys(game.modes);
            modeArray.forEach(mode => {
                let row = document.createElement("tr");
                let firstColumn = document.createElement("td");
                let secondColumn = document.createElement("td");
                    firstColumn.innerText = mode;
                    secondColumn.innerText = game.modes[mode];

                row.appendChild(firstColumn);
                row.appendChild(secondColumn);
                modesTable.appendChild(row);
            });
        }
                
        modes.appendChild(modesTable);

        gameDiv.appendChild(title);
        gameDiv.appendChild(releaseYear);
        gameDiv.appendChild(image);

        gameDiv.appendChild(genreHeader);
        gameDiv.appendChild(genres);
        gameDiv.appendChild(modes);
        
        gameContainer.appendChild(gameDiv);
    });
}