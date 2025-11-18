// import {songList} from './data.js';

const pickRandomSong = () => {

    // get a random number based on the number of elements in songList
    let rand = Math.floor(Math.random() * songList.length);
    return songList[rand];

};

const displaySongInformation = () => {

    // call random song picker function
    let song = pickRandomSong();
    console.log(song);

    // creating content dynamically
    // populate title, artist, release
    $('p#title').text(song['title']);
    $('p#artist').text(song['artist']);
    $('p#releaseDate').text(song['release']);
    $('p#spotifyLink').html(`<a href = '${song['spotifyLink']}' target='_blank'> ${song['title']} Spotify Link </a>`);

    // create embed
    $('.embed').html(song['spotifyEmbed']);


    // show element
    // originally i had them hidden but i decided against it
    // $('.songDisplay').show();


} 

// add song function -- per session
const addSong = () => {

    // console.log('this isn\'t working yet');

    // darn i can't keep the song stored in the array 
    // without making a backend solution or accessing local storage
    // unforunately, user added songs will be per session until refreshed

    let newSong = 
    {
        title: `${$('input#addTitle').val()}`,
        artist: `${$('input#addArtist').val()}`,
        release: `${$('input#addRelease').val()}`,
        spotifyLink: `${$('input#addLink').val()}`,
        spotifyEmbed: `${$('input#addEmbed').val()}`

    };

    let oldLength = songList.length;

    songList.push(newSong);

    if(songList.length > oldLength) {

        alert("Pushed Successfully");
        console.log(songList[songList.length-1])

    } else {

        alert("Push Failed!");
    }

    

}



$(document).ready(() => {

    // hide display information until button pressed
    // $('.songDisplay').hide();

    // give random song button button an on click event
    $('#randomSongButton').on('click', displaySongInformation)

    // events and dynamic styling
    $('#randomSongButton').on('mouseover', function () {
        // linear gradient going from left to right
        $(this).css("background", "linear-gradient(to right, #ffadad, #ffd6a5, #fdffb6, #caffbf, #9bf6ff, #a0c4ff, #bdb2ff, #ffc6ff)");
    });
    // reset on mouseout. make the on mouseover look special
    $('#randomSongButton').on('mouseout', function () {
        $(this).css("background", "");
    });

    // hide secret elements
    // originally i had them precreated
    // but then decided to dynamically create them instead
    // $('.addSongElements').hide();


    // create a buffer
    let passphraseBuffer = '';
    const secret = 'addsong'; // passphrase

    // keyboard key event
    $(document).on('keydown', function (char) {
        // case insensitive
        passphraseBuffer += char.key.toLowerCase(); 
        
        if (passphraseBuffer.length > secret.length) {
            // cuts out the last secret.length characters (or n)
            passphraseBuffer = passphraseBuffer.slice(-secret.length); // keep only the last n characters
            // console.log(passphraseBuffer);
        }

        if (passphraseBuffer === secret) {
            console.log('success');

            // add elements using JQuery
            // copy pasted from when i had them created in the html
            const addElems = `
                <!-- adding song elements -->
                <div class="addSongElements">
                    <label for="addTitle">Add Title: <input id="addTitle"></label>
                    <label for="addArtist">Add Artist: <input id="addArtist"></label>
                    <label for="addRelease">Add Release Date: <input id="addRelease"></label>
                    <label for="addLink">Add Spotify Link: <input id="addLink"></label>
                    <label for="addEmbed">Add Spotify Embed: <input id="addEmbed"></label>
                    <button style="width: auto; height: 50%;">Submit New Song</button>
                </div>
            `
            // append elements and change formatting to fit the new div
            $('.songDisplay')
                .css({'grid-template-columns': '1fr 1fr 1fr'})
                .append(addElems);

            // add styling
            // i had show earlier but it's not hidden anymore
            $('.addSongElements')
                .css({
                    'display': 'grid',
                    'grid-template-columns': '1fr 1fr',
                    'border': '3px solid black',
                    'padding': '3px'
                });

            // give the submit new song button an on click event to add new song
            $('.addSongElements button').on('click', addSong);
            // console.log($('.addSongElements button'));

        }
    });

});