const nodemailer = require('nodemailer')

function send_email(request, email, password) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'spotispyemail@gmail.com',
            pass: 'crujiente1',
        }
    })

    let mailOptions = {
        from: 'spotispy server',
        to: email,
        subject: 'Spotispy - Recovery Password',
        //html:
        text: ('New password: ' + password)
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error)
        console.log('New password: ' + new_password + ' sent to ' + email)
    })
}

module.exports = { send_email }