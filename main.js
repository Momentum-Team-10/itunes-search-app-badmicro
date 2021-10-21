/* globals fetch, moment */

const url = "https://itunes.apple.com/search?term="
const songsList = document.getElementById("song-list");
const form = document.querySelector("#song-form");
const audioPlayer = document.getElementById("audio-player");

/*
    Listen for user submit input on the input form and creates
    a list of songs based on the search
*/

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("search-param");
  fetch(url + searchInput.value)
    .then((res) => res.json())
    .then((data) => {
      //for every item create a list element that is
      // img, song title, band
      //console.log(data);
      clearSongsList();
      for (let item of data.results) {
        if (item.kind === "song") {
          generateSongCard(item);
        }
      }
    });
  form.reset();
});

/*
    Creates the source when a song title is clicked on, and
    loads the src into the music player
*/

songsList.addEventListener("click", (e) => {
  console.log(e.target.id)
  if(e.target.id) {
    audioPlayer.src = e.target.id;
    audioPlayer.play();
  }
})

// function generateUrl(input) {
//   if(document.getElementById("search-songTitle").checked) {
//     return url + input + "&entity=musicTrack"
//   } else if(document.getElementById("search-artist").checked) {
//     return url + input + "&entity=allArtist"
//   } else {
//     return url + input + "&entity=album"
//   }
// }

/*
    Generates a Song "Card" to add to the UL of playable options
    for the user to choose from to play a song sample
    extra note: "create evenlistener here?"
*/

function generateSongCard(songObj) {
  // if (songObj.kind === "song") {
    const li = document.createElement("li");
    //li.trackId = songObj.trackId;
    li.imgSrc = songObj.artworkUrl100;
    li.trackName = songObj.trackName;
    li.artistName = songObj.artistName;
    li.musicSrc = songObj.previewUrl;

    renderSongCard(li);
    songsList.appendChild(li);
  // } else {
  //   console.error("Invalid Filetype, cannot generate song card");
  // }
}

/*
    Processes the list information in a user-friendly way.
    Creatrs the individual "song-card" that the user sees.
*/

function renderSongCard(li) {
  li.innerHTML = `
    <div class="fl w-150 h-150 w-third-ns pa2 ba">
      <div class="flex justify-center">
        <img src="${li.imgSrc}" alt="Album Cover">
      </div>
      <p id=${li.musicSrc} class="tc i cursor: pointer">${li.trackName}"</p>
      <p class="tc">${li.artistName}</p>
    </div>
    `;
}

/*
    Clears the search results from the list
*/


function clearSongsList(){
  while(songsList.firstChild) {
    songsList.removeChild(songsList.firstChild);
  }
}