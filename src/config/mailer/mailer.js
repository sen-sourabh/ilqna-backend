const nodemailer = require("nodemailer")

exports.sendMail = async (useremail, subject, body) => {
    let smtpConfig = {
        host: 'https://mail.google.com',
        port: 465,
        secure: true,
        auth: {
            user: 'sourabhsen201313@gmail.com',
            pass: 'Nbe!9969'
        }
    };
    let transporter = nodemailer.createTransport(smtpConfig);
    let options = {
        from: "sourabhsen201313@gmail.com",
        to: useremail,
        subject: subject,
        html: `<div>Hello Dear, <br><p>`+ body +`</p><br><br><p>Thanks & Regards,<br>Q&A</p></div>`
    }
    console.log("mail: ", options)
    await transporter.sendMail(options, (error, info) => {
        if(error) {
            console.log(error) 
        } else {
            console.log(info);
            // res.send("Mail Send")
        }
    })
}