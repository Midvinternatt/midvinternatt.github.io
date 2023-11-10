console.log("Running script.js");

async function Initialize() {
    document.getElementById("searchfield-input").value = "";
    document.getElementById("player-input").value = "";

    await LoadGameData();

    PopulateGenreList();
    PopulateGameList();
}

Initialize();