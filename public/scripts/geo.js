function insert_position(artist, genre) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var raw = JSON.stringify({
                "lat": position.coords.latitude,
                "long": position.coords.longitude,
                "genre": 'pop',
                "artist": artist
            })

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://localhost:3000/home/search", requestOptions)
                .then(response => response.text())
                .then(result => show_nearby(JSON.parse(result)))
                .catch(error => console.log('error', error));
        });

    }
}

function getLocation(callback) {
    if (navigator.geolocation) {
        var lat_lng = navigator.geolocation.getCurrentPosition(function(position) {
            var user_position = {};
            user_position.lat = position.coords.latitude;
            user_position.lng = position.coords.longitude;
            callback(user_position);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function show_nearby(result) {
    const map = new Map(Object.entries(result));
    let user_list = document.getElementById('friends')
    let user_string = ''

    map.forEach(function(value, key) {
        console.log(key + " = " + value.artist_list);
        let dist = Math.round(value.dist)
        let artist_list = value.artist_list.join(', ');
        let genre_list = value.genre_list.join(', ');
        let preview_artist = artist_list
        let preview_genre = genre_list
        if (artist_list.length >= 30) {
            preview_artist = artist_list.substring(0, 20) + '(...)'
        }
        if (genre_list.length >= 30) {
            preview_genre = genre_list.substring(0, 20) + '(...)'
        }


        user_string += '<div style="padding-top:20px">' +
            '    <span class="user__info img"><img src="../favicon.ico" alt="Profile Picture" class="img-responsive" style="float:left; width:36%; padding-right:10px;border-radius: 50%;"></span> <span class="mybolder" id="mybold">' + value.username + ' </span> <span style="padding-left: 5px;"> <small id="mybold">' + dist + 'km away</small></span> <br>' +
            '<span id="mybold"> Artist/s In Common: </span> <br> <div style="padding-left: 5px;"><small id="mysmolbold">' + preview_artist + '</small> </div>' +
            '<span id="mybold"> Genre/s In Common: </span> <br> <div style="padding-left: 5px;"><small id="mysmolbold">' + preview_genre + '</small> </div> </div> <hr class="new1">'
    })



    user_list.innerHTML = user_string
}