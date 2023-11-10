
console.log("Running repository.js");

let gameList = [];
let genreList = [];
let modeList = [];

function GetAllGames() {
    return gameList;
}

function GetAllGenres() {
    return genreList;
}

function GetAllModes() {
    return modeList;
}

function FilterGamesMatching(gameArray, searchString) {
    return gameArray.filter(game => game.title.toLowerCase().includes(searchString.toLowerCase()));
}

function FilterGamesWithGenres(gameArray, genreArray) {
    return gameArray.filter(game => {
        if(Array.isArray(game.genres)) {
            const gameGenresLowerCase = game.genres.map(genre => genre.toLowerCase());
            const genreArrayLowerCase = genreArray.map(genre => genre.toLowerCase());
            return genreArrayLowerCase.every(genre => gameGenresLowerCase.includes(genre));

        }
        else
            return false;
    });
}

function FilterGamesBetweenYears(genreArray, startYear, endYear) {
    return genreArray.filter(game => 
        game.releaseYear===undefined
        || (endYear===undefined && game.releaseYear===startYear)
        || (game.releaseYear >= startYear && game.releaseYear <= endYear)
        || game.releaseYear===0
    );
}

// function SortGameArrayByTitle(gameArray, ascendingTitle) {
//     if(ascendingTitle===undefined || ascendingTitle) {
//         gameArray.sort(function(a, b) {
//             let x = a.title.toLowerCase();
//             let y = b.title.toLowerCase();
//             if (x < y) {return -1;}
//             if (x > y) {return 1;}
//             return 0;
//         });
//     }
//     else {
//         gameArray.sort(function(a, b) {
//             let x = a.title.toLowerCase();
//             let y = b.title.toLowerCase();
//             if (x > y) {return -1;}
//             if (x < y) {return 1;}
//             return 0;
//         });
//     }
//     return gameArray;
// }

function LoadGameData() {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", "catalog.json");
        xhttp.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                ProcessGameData(xhttp.response);
                resolve(xhttp.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhttp.statusText
                });
            }
        };
        xhttp.send();
    });
}

function ProcessGameData(responseText) {
    console.log("ProcessGameData()");
    const responseData = JSON.parse(responseText);

    responseData.forEach(game => {
        if(gameList.find(e => e.title==game.title)) {
            console.error("Duplicated game in catalog '" + game.title + "'");
        }
        else {
            gameList.push(game);

            if(game.genres!==undefined) {
                game.genres.forEach(genre => {
                    if(!genreList.includes(genre))
                        genreList.push(genre);
                });
            }
    
            if(game.modes!==undefined) {
                Object.keys(game.modes).forEach(mode => {
                    if(!modeList.includes(mode))
                        modeList.push(mode);
                });
            }
        }
        //     releaseYearList[game.releaseYear] = [];

        // releaseYearList[game.releaseYear].push(game);
    });

    genreList.sort();
    modeList.sort();
    gameList.sort(function(a, b) {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
}


