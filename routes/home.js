const express = require("express")
const router = express.Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')({
    dest: 'public/uploads/profile_images'
})

router.get('/', async function(request, response) {
    const user = request.session.username
    if (request.session.loggedin) {
        response.render('../views/home.ejs', { username: user })
    } else {
        response.send('Please login to view this page!')
    }
    response.end()
})

router.get('/logged', async function(request, response) {
    const user = request.session.username
    if (request.session.loggedin) {
        const token = request.session.token
        console.log("🚀 ~ file: home.js ~ line 23 ~ router.get ~ token", token)
        response.render('../public/index.ejs', {
            data: { username: user, token: token }
        })
    } else {
        response.send('Please login to view this page!')
    }
    response.end()
})

router.post('/logout', async function(request, response) {
    response.render('../views/index.ejs', { name: 'logged out' })
})

router.post('/upload', [multer.single('attachment')], async function(req, res, next) {
    console.log('sup')
    var { fileName } = storeWithOriginalName(req.file)
})

function storeWithOriginalName(file) {
    var fullNewPath = path.join(file.destination, file.originalname)
    fs.renameSync(file.path, fullNewPath)
    return {
        fileName: file.originalname
    }
}

module.exports = router