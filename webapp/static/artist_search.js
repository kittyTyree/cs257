/*
* Kitty Tyree and Sriya Konda
* artist_search.js
* This is for searching by artists
* Sriya and Kitty
*/


window.onload = initialize;

function initialize() {
    var element = document.getElementById('go_button');
    if (element) {
        element.onclick = onGoButton;
    }
}

//Declaration of global variable tableBody
var tableBody;


function getAPIBaseURL() {
    var baseURL = window.location.protocol
                    + '//' + window.location.hostname
                    + ':' + window.location.port
                    + '/api';
    return baseURL;
}

// Get's the input that the user put in the search bar
function getArtistQuery() {
    var query = document.getElementById('artist_query').value;
    document.getElementById('artist_query').value = '';
    return query;
}

// Fills table with list of artists containing the search bar query
function onGoButton() {
    var query = getArtistQuery();
    var url = getAPIBaseURL() + '/artists/' + query;

    fetch(url, {method: 'get'})

    .then((response) => response.json())

    .then(function(artistList) {
        // In the case that there are no artists:
        if (artistList.length == 0){
          tableBody = '<tr><th>There are no artists that match your search 😢</th></tr>';
        }
        else{
          tableBody = '';
          for (var k = 0; k < artistList.length; k++) {
              var artist = artistList[k];
              tableBody += '<tr>';

              tableBody += '<td><a onclick="getSongs(' + artist['artist_id'] +')">'
                              + artist['artist_name']
                              + '</a></td>';
              tableBody += '</tr>';
          }}

          var resultsTableElement = document.getElementById('song_table');
          if (resultsTableElement) {
              resultsTableElement.innerHTML = tableBody;
          }
    })
    .catch(function(error) {
        console.log(error);
    });
};

// Helper function
// It replaces the table in the HTML with the most recent list of artist
// Generated by onGoButton()
function fillSongTable(){
  var resultsTableElement = document.getElementById('song_table');
  if (resultsTableElement) {
      resultsTableElement.innerHTML = tableBody;
  }
};

// When an artist name is clicked on, shows their songs
// Back button implemented here
function getSongs(artistID, tableBody) {
    var url = getAPIBaseURL() + '/artist/' + artistID;

    fetch(url, {method: 'get'})

    .then((response) => response.json())

    .then(function(songsList) {
        var songTableBody = '<tr><th><a onclick="fillSongTable()"> Back To Search↩️ </a></th><th></th><th></th><th></th></tr>'
        songTableBody += '<tr><th></th><th>Song Name</th><th></th><th>Release Date</th></tr>';
        for (var k = 0; k < songsList.length; k++) {
          var song = songsList[k];
          songTableBody += '<tr><td><a href="' + song['url'] +'" target="_blank" rel="noopener noreferrer"> ⏯ </a></td>'
                    + '<td>' + song['song_name'] + '</td>'
                    + '<td></td>'
                    + '<td>' + song['release_date_month'] +'/'+ song['release_date_day'] + '/' + song['release_date_year'] + '</td>'
                    + '</tr>';
          }
        var resultsTableElement = document.getElementById('song_table');
        if (resultsTableElement) {
            resultsTableElement.innerHTML = songTableBody;
          }
      })

      .catch(function(error) {
          console.log(error);
      });
};
