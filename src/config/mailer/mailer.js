const nodemailer = require("nodemailer")

//Send Mail
exports.sendMail = async (useremail, subject, body) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'cecil.blanda@ethereal.email',
            pass: 'bAE8ZrZYA6rFpz9X7j'
        }
    });
    let info = await transporter.sendMail({
        from: "sourabhsen201313@gmail.com",
        to: useremail,
        subject: subject,
        html: `<div>Hello Member, <br><p>`+ body +`</p><br><br><p>Thanks & Regards,<br>Team Q&A</p></div>`
    });
    return info;
}
