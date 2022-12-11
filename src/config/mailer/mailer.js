const nodemailer = require("nodemailer")

//Send Mail
exports.sendMail = async (useremail, subject, body) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'carlee.kris44@ethereal.email',
            pass: 'MM33DhXz4SrRVHnZQs'
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
