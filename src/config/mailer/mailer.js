const nodemailer = require("nodemailer")

exports.sendMail = async (useremail, subject, body) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'eri6ovx53ykebqub@ethereal.email',
            pass: 'FAhVW1E6Y1NAN1WgJs'
        }
    });
    let info = await transporter.sendMail({
        from: "sourabhsen201313@gmail.com",
        to: useremail,
        subject: subject,
        html: `<div>Hello Dear, <br><p>`+ body +`</p><br><br><p>Thanks & Regards,<br>Q&A</p></div>`
    });
    return info;
}