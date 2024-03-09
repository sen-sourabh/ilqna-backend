const nodemailer = require('nodemailer');

//Send Mail
exports.sendMail = async (useremail, subject, body) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'verlie.gutkowski59@ethereal.email',
      pass: '8ZrFHa4vjbFnB8BPC4',
    },
  });
  let info = await transporter.sendMail({
    from: 'sourabhsen201313@gmail.com',
    to: useremail,
    subject: subject,
    html:
      `<div>Hello Member, <br><p>` +
      body +
      `</p><br><br><p>Thanks & Regards,<br>Team Q&A</p></div>`,
  });
  return info;
};
