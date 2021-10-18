/* globals fetch, moment */

const url = "https://itunes.apple.com/search?";
const form = document.querySelector("#song-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-param");

    fetch(generateUrl(searchInput.value))
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
})

/*
    Generates a url that itunes accepts bases on the input string
    Note: Working as intended!
*/

function generateUrl(input) {
    let terms = input.toString().trim().replace(' ', '+')
    return url + "term=" + terms
}

/*

*/

function renderList() {

}