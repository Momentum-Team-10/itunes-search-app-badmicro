/* globals fetch, moment */

//const url = "https://proxy-itunes-api.glitch.me/";
const url = "https://proxy-itunes-api.glitch.me/search?media=music&entity=song&term="
const songsList = document.getElementById("song-list");
const form = document.querySelector("#song-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-param");

    fetch(url + searchInput.value)
        .then(res => res.json())
        .then(data => {
            //for every item create a list element that is
            // img, song title, band
            console.log(data)
            for(let item of data.results) {
                if(item.kind === 'song'){
                    generateSongCard(item)
                }
            }
        })
})

/*
    Generates a Song "Card" to add to the UL of playable options
    for the user to choose from to play a song sample
    extra note: "create evenlistener here?"
*/

function generateSongCard(songObj) {
    if(songObj.kind === "song") {
        const li = document.createElement('li');
        li.trackId = songObj.trackId;
        li.imgSrc = songObj.artworkUrl100;
        li.trackName = songObj.trackName;
        li.artistName = songObj.artistName;
        //add styles to song card here with li.classList.add();

        renderSongCard(li);
        songsList.appendChild(li);
    } else {
        console.error("Invalid Filetype, cannot generate song card");
    }
}

function renderSongCard(li) {
    li.innerHTML = `
    <div class="Song-Card">
        <img src="${li.imgSrc}" alt="Album Cover">
        <p>${li.trackName}</p>
        <p>${li.artistName}</p>
    </div>
    `
}
