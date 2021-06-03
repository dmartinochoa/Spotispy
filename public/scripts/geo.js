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
    map.forEach(function(value, key) {
        console.log(key + " = " + value.artist_list);
    })

}