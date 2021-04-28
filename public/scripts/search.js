var server_data = document.getElementById('data').innerHTML
var token = server_data.token
var track_list = document.getElementById("tracks")
var album_list = document.getElementById("albums")
var artist_list = document.getElementById("artists")
var music_widget = document.getElementById("widgetPlayer")
    //const type = 'track%2Cartist%2Cplaylist%2Cepisode%2Calbum%2Cshow' //Use this to fetch extra content

async function searchAll(input) {
    //TODO: VERIFY INPUT DOESNT HAVE URL FUCKING CHARACTERS
    let resCallback, rejCallback
    const returnPromise = new Promise((resolve, reject) => {
        resCallback = resolve
        refCallback = reject
    })
    const type = '&type=track%2Cartist%2Calbum'
    const res = await fetch('https://api.spotify.com/v1/search?q=' + input + type + '&market=from_token&limit=10', {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    const content = await res.json();
    console.log("🚀 ~ file: search.js ~ line 26 ~ searchAll ~ content", content)
    showTracks(content.tracks)
    showAlbums(content.albums)
    showArtists(content.artists)
}

function showTracks(tracks) {
    var track_html = '<div class="section-title"><big>Songs</big></div> <div class="tracks">'
    for (let i = 0; i < tracks.items.length; i++) {
        const track = tracks.items[i]
        const duration = millisToMinutesAndSeconds(track.duration_ms)
        var explicit = ''
        var img_url = 'none found'
        var uri = track.uri.substring(14)
        if (track.explicit) {
            explicit = '<span class="label" data-id=' + uri + '>Explicit</span>'
        }
        if (track.album.images[0]) {
            img_url = track.album.images[0].url
        }
        track_html += ' <div class="track" id=track data-id=' + uri + '> <div class="track__art" > <img src="' + img_url + '" data-id=' + uri + 'alt="Img not found"/> </div>' +
            '<div class="track__title track" data-id=' + uri + '" data-id=' + uri + '> ' + track.name + '<div style="color:grey;" data-id=' + uri +
            '> <small class="track__artist" data-id=' + uri + ' style="padding-left:5px;"> ' + track.artists[0].name +
            '</small></div> </div> <div class="track__explicit">' + explicit + '  </div> <div class="track__plays" data-id=' + uri + '>' + duration + '</div></div>'
    }
    track_list.innerHTML = track_html
}

function showAlbums(albums) {
    var album_html = ' <div class="overview__albums__head"> <span class="section-title"><big>Albums</big></span> </div>'
    for (let i = 0; i < albums.items.length - 5; i++) {
        const album = albums.items[i];
        const release_year = album.release_date.substring(0, 4)
        var uri = album.uri.substring(14)

        album_html +=
            '<div class="album__info" id=album data-id=' + uri + '> <div class="album__info__art"  data-id=' + uri + '> <img src="' + album.images[0].url +
            '" alt="None found"  data-id=' + uri + '/> </div> <div class="album__info__meta"  data-id=' + uri + '> <div class="album__year"  data-id=' + uri + '>' + release_year + '</div> ' +
            '<div class="album__name"  data-id=' + uri + '> <span  data-id=' + uri + '>' + album.name + ' - ' + album.artists[0].name + '</span> </div> <div class="album__actions" data-id=' + uri + '> <button class="button-light save" data-id=' + uri + '>Save</button>' +
            ' <button class="button-light more" data-id=' + uri + '> <i class="ion-ios-more" data-id=' + uri + '></i> </button> </div> </div> </div>'
    }
    album_list.innerHTML = album_html
}

function showArtists(artists) {
    var artist_html = '<div class="overview__albums__head" style="width: 100%;"> <span class="section-title"><big>Artists</big></span> </div>'
    var img_url = ''
    for (let i = 0; i < artists.items.length - 2; i++) {
        const artist = artists.items[i];
        const artist_type = artist.type.charAt(0).toUpperCase() + artist.type.slice(1)
        if (artist.images[0]) {
            img_url = artist.images[0].url
        }
        var uri = artist.uri.substring(15)
        console.log("🚀 ~ file: index.ejs ~ line 431 ~ showArtists ~ uri", uri)

        artist_html += '<div class="media-card" id=artist data-id=' + uri + '> <div class="media-card__image" data-id=' + uri + ' style="background-image: url(' + img_url + ');">' +
            ' <i class="ion-ios-play" data-id=' + uri + '></i> </div> <a class="media-card__footer"  data-id=' + uri + '>' + artist.name + ' <div style="color:grey;"  data-id=' +
            uri + '> <small  data-id=' + uri + '> ' + artist_type + ' </small></div></a> </div></div>'
    }
    artist_list.innerHTML = artist_html
}

var search_bar = document.getElementById("searchbar")
search_bar.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        searchAll(search_bar.value)
    }
})

track_list.onclick = function(event) {
    let target = event.target
    var track_name = document.getElementsByClassName("track__title")
    var track_artist = document.getElementsByClassName("track__artist")
    for (var i = 0; i < track_artist.length; i++) {
        track_artist[i].style.color = 'Gray';
    }
    for (var i = 0; i < track_name.length; i++) {
        track_name[i].style.color = 'White';
    }
    event.target.style.color = "#1DB954";
    const uri = target.getAttribute('data-id')
    music_widget.innerHTML = '<iframe src="https://open.spotify.com/embed/track/' + uri + '" style="border: 0; width: 100%; height: 80px; position:end" allowfullscreen allow="encrypted-media"></iframe>'
}

album_list.onclick = function(event) {
    let target = event.target
    const uri = target.getAttribute('data-id')
    music_widget.innerHTML = '<iframe src="https://open.spotify.com/embed/album/' + uri + '" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
}

artist_list.onclick = function(event) {
    let target = event.target
    const uri = target.getAttribute('data-id')
    music_widget.innerHTML = '<iframe src="https://open.spotify.com/embed/artist/' + uri + '" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}