console.log("Running script.js");

LoadGameData();

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

// function FillGenreList() {
//     console.log(genreList);
//     genreList.forEach(genre => {
//         console.log(genre);
//     });
// }


// let a = {"a": 1};
// let b = {"b": a};
// let c = {"c": a};

// console.log(a);
// console.log(b);
// console.log(c);
// console.log("-");

// console.log(b.b==c.c);

// console.log(a.a);
// console.log(b.b.a);
// console.log(c.c.a);
// console.log("-");

// b.b.a = 5;

// console.log(a.a);
// console.log(b.b.a);
// console.log(c.c.a);
// console.log("-");