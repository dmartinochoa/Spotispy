async function set_password(request, email, password) {
    const pool = request.app.get('connection')
    try {
        const result = await pool.query('UPDATE accounts SET password= $1 WHERE email = $2', [password, email])
        console.log(result.affectedRows + " record(s) updated")
    } catch (error) {
        console.log('Error updating password(catch): ' + error)
    }
}

module.exports = { set_password }