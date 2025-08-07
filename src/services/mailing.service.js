import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MailingService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  sendMail(mailOptions) {
    return this.transporter.sendMail(mailOptions);
  }
}

export default MailingService;