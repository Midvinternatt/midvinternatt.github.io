
console.log("Running repository.js");

let gameList = {};
let genreList = [];
// let releaseYearList = {};
let modeList = [];

function GetAllGames() {
    return Object.values(gameList);
}

function FilterGamesMatching(gameArray, searchString) {
    const result = gameArray.filter(game => game.title.toLowerCase().includes(searchString.toLowerCase()));

    return result;
}

function GetAllGamesWithGenres(genreArray) {
    const result =  GetAllGames().filter(game => {
        if(Array.isArray(game.genres)) {
            const gameGenresLowerCase = game.genres.map(genre => genre.toLowerCase());
            const genreArrayLowerCase = genreArray.map(genre => genre.toLowerCase());
            return genreArrayLowerCase.every(genre => gameGenresLowerCase.includes(genre));

        }
        else
            return false;
    });

    return result;
}

function GetAllGamesBetweenYears(startYear, endYear) {
    const result =  GetAllGames().filter(game => 
        game.releaseYear===undefined
        || (endYear===undefined && game.releaseYear===startYear)
        || (game.releaseYear >= startYear && game.releaseYear <= endYear)
        || game.releaseYear===0
    );

    return result;
}

function SortGameArrayByTitle(gameArray, ascendingTitle) {
    if(ascendingTitle===undefined || ascendingTitle) {
        gameArray.sort(function(a, b) {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    }
    else {
        gameArray.sort(function(a, b) {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x > y) {return -1;}
            if (x < y) {return 1;}
            return 0;
        });
    }
    return gameArray;
}

function GetAllGenres() {
    return genreList;
    // return Object.keys(genreList);
}

function GetAllModes() {
    return modeList;
    // return Object.keys(modeList);
}

async function LoadGameData() {
    console.log("LoadGameData()");
    const xhttp = new XMLHttpRequest();

    xhttp.onload = ProcessGameData;

    await xhttp.open("GET", "catalog.json", true);
    xhttp.send();
}

function ProcessGameData() {
    console.log("ProcessGameData()");
    const responseData = JSON.parse(this.responseText);

    responseData.forEach(game => {
        gameList[game.title] = game;

        if(game.genres!==undefined) {
            game.genres.forEach(genre => {
                if(!genreList.includes(genre))
                    genreList.push(genre);
                // if(genreList[genre]===undefined)
                //     genreList[genre] = [];
    
                // genreList[genre].push(game);
            });
        }

        if(game.modes!==undefined) {
            Object.keys(game.modes).forEach(mode => {
                if(!modeList.includes(mode))
                    modeList.push(mode);
                // if(modeList[mode]===undefined)
                //     modeList[mode] = true;
    
                // modeList[mode].push(game);
            });
        }
        // if(releaseYearList[game.releaseYear]===undefined)
        //     releaseYearList[game.releaseYear] = [];

        // releaseYearList[game.releaseYear].push(game);
    });

    genreList.sort();
    modeList.sort();

    // gameList = SortGameArrayByTitle(GetAllGames());
    FillGenreList();
    FillGameList();

    // console.log(genreWrapper);

    // console.log(gameList);
    // console.log(genreList);
    // console.log(releaseYearList);
    // console.log(modeList);

    // gameList.sortByTitle();
    // let l = GetAllGamesBetweenYears(2013);
    // console.log(l);
}

function UpdateGameList() {
    console.log(22);
}


function FillGenreList() {
    let genreWrapper = document.getElementById("genre-list");

    genreList.forEach(genre => {
        let genreItem = document.createElement("li");
        let checkbox = document.createElement("input");
        let label = document.createElement("label");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", UpdateGameList);
        label.innerText = genre;
        
        genreItem.appendChild(checkbox);
        genreItem.appendChild(label);
        genreWrapper.appendChild(genreItem);
        // console.log(genre);
    });
}

function FillGameList() {
    let gameContainer = document.getElementById("games-container");

    SortGameArrayByTitle(GetAllGames()).forEach(game => {
        // console.log(game);
        let gameDiv = document.createElement("div");
            gameDiv.classList.add("game");

        let title = document.createElement("h1");
            title.classList.add("game-title");
            title.innerText = game.title;
        let image = document.createElement("img");
            image.classList.add("game-image");
            image.src = game.image;
        let releaseYear = document.createElement("span");
            releaseYear.classList.add("game-releaseYear");
            releaseYear.innerText = game.releaseYear;

        const genreHeader = document.createElement("h1");
            genreHeader.classList.add("game-genre-header");
            genreHeader.innerText = "Genres:";
        let genres = document.createElement("span");
            genres.classList.add("game-genres");
            if(Array.isArray(game.genres)) {
                game.genres.forEach(genre => genres.innerText += genre + ", ");
                genres.innerText = genres.innerText.replace(/,\s$/, '');
            }
        let modes = document.createElement("div");
            modes.classList.add("game-modes");
            let modesTable = document.createElement("table");
                modesTable.classList.add("game-modes-table");
                let firstRow = document.createElement("tr");
                let firstColumn = document.createElement("td");
                let secondColumn = document.createElement("td");
                    firstColumn.innerText = "Game Modes:";
                    secondColumn.innerText = "Players:";

                    firstRow.appendChild(firstColumn);
                    firstRow.appendChild(secondColumn);
                    modesTable.appendChild(firstRow);

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
        gameDiv.appendChild(image);
        gameDiv.appendChild(releaseYear);

        gameDiv.appendChild(genreHeader);
        gameDiv.appendChild(genres);
        gameDiv.appendChild(modes);
        
        gameContainer.appendChild(gameDiv);
        game.div = gameDiv;
    });
}