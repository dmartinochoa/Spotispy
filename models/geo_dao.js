async function insert_pos(request, id_user, username, genre, artist, lat, lng) {
    const pool = request.app.get('connection')
    try {

        //insert into positions (id, iduser,username,geom,genero,artista) select '4', '2', 'username', 'SRID=3035;POINT(40.5000 -3.322222)','genre', 'artist' where not exists (select 1 from positions where iduser = '4' and genero = 'rock' );
        var query = 'INSERT INTO positions("idUser", "username", "geom", "genre", "artist") VALUES(' + id_user + ', \'' + username + '\', \'SRID=3035;POINT(' + lat + ' ' + lng + ')\', \'' + genre + '\', \'' + artist + '\')'
        console.log(query)
        const result = await pool.query(query)
    } catch (error) {
        console.log('Error inserting position track(catch): ' + error)
    }
}

module.exports = { insert_pos }