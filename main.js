/* globals fetch, moment */

const url = "https://itunes.apple.com/search?term="
const songsList = document.getElementById("song-list");
const form = document.querySelector("#song-form");
const audioPlayer = document.getElementById("audio-player");

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

songsList.addEventListener("click", (e) => {
  console.log(e.target.id)
  if(e.target.id) {
    audioPlayer.src = e.target.id;
    audioPlayer.play();
  }
})


/*
    Generates a Song "Card" to add to the UL of playable options
    for the user to choose from to play a song sample
    extra note: "create evenlistener here?"
*/

function generateSongCard(songObj) {
  if (songObj.kind === "song") {
    const li = document.createElement("li");
    //li.trackId = songObj.trackId;
    li.imgSrc = songObj.artworkUrl100;
    li.trackName = songObj.trackName;
    li.artistName = songObj.artistName;
    li.musicSrc = songObj.previewUrl;
    //add styles to song card here with li.classList.add();

    renderSongCard(li);
    songsList.appendChild(li);
  } else {
    console.error("Invalid Filetype, cannot generate song card");
  }
}

function renderSongCard(li) {
  li.innerHTML = `
    <div class="fl w-100 w-third-ns pa2 ba">
      <div class="flex justify-center">
        <img src="${li.imgSrc}" alt="Album Cover">
      </div>
      <p id=${li.musicSrc} class="tc cursor: pointer">${li.trackName}</p>
      <p class="tc">${li.artistName}</p>
    </div>
    `;
}

function clearSongsList(){
  while(songsList.firstChild) {
    songsList.removeChild(songsList.firstChild);
  }
}