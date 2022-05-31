import crypto from 'crypto';
const nodemailer = require("nodemailer");
import db from '../db/postgres';

export const forgotPassword = async (req: any, res: any) => {
  const { email } = req.body;
  
  try {
    const users: Array<any> = await db('users').select().where({ email });
    if (users && users[0]) {
      // create token that expires at a certain point
      const token = crypto.randomBytes(20).toString('hex');
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.FORGOT_PASSWORD_EMAIL_SENDER, // generated ethereal user
          pass: process.env.FORGOT_PASSWORD_EMAIL_PWD, // generated ethereal password
        },
      });
      
      const mailOptions = {
        from: process.env.FORGOT_PASSWORD_EMAIL_SENDER,
        // to: `${users[0].email}`,
        to: 'tai.hovanky@gmail.com',
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
          + `http://localhost:3000/password-reset/${token}\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };
      
      // send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);

      if (info && info !== '0') {
        const data = {
          passwordtoken: token,
          passwordtoken_expiration: new Date(Date.now() + 3600000)
        };
        db('users').update(data).where({ email })
          .then(() => res.status(200).json('Password reset email was sent'));
      }
      
    } else {
      return res.status(401).send('Invalid email');
    }
  } catch(err) {
    console.log('password reset err', err);
    return res.status(401).send('Password reset email failed to send');
  }
}