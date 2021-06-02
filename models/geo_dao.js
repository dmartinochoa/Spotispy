async function insert_pos(request, id_user, username, genre, artist, lat, lng) {
    const pool = request.app.get('connection')
    try {
        var query = 'INSERT INTO positions("idUser", "username", "geom", "genre", "artist") SELECT \'' + id_user + '\', \'' + username + '\', \'SRID=3035;POINT(' + lat + ' ' + lng + ')\', \'' + genre + '\', \'' + artist +
            '\' WHERE NOT EXISTS (SELECT 1 FROM positions WHERE "idUser" = \'' + id_user + '\' AND "genre" = \'' + genre + '\' AND "artist" = \'' + artist + '\')'
        console.log(query)
        const result = await pool.query(query)
    } catch (error) {
        console.log('Error inserting position track(catch): ' + error)
    }
}

async function get_users_by_pos_track(request, id_user, username, genre, artist, lat, lng) {
    const pool = request.app.get('connection')
    try {
        var query = 'SELECT DISTINCT ON (b.geom, b.id,b.username, b."idUser", b.genre, b.artist) b.id, b.geom, ST_Distance(b.geom, \'SRID=3035;POINT(' + lat + ' ' + lng + ')\')*100 as dist, b.username, b."idUser", b.genre, b.artist FROM positions b WHERE ' +
            '(ST_DWithin(b.geom, \'SRID=3035;POINT(' + lat + ' ' + lng + ')\', 0.5) AND b."idUser" !=  \'' + id_user + '\' AND (b.artist = \'' + artist + '\' OR b.genre = \'' + genre + '\')) ORDER BY "idUser"'
        console.log(query)
        const result = await pool.query(query)
        console.log(result.rows)

    } catch (error) {
        console.log('Error inserting position track(catch): ' + error)
    }
}

module.exports = { insert_pos, get_users_by_pos_track }