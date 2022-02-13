import nodemailer from 'nodemailer';
import debug from 'debug';

const mailer = async (mailData) => {
  const {
    to, subject, text, html,
  } = mailData;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
       //secure: false, // true for 465, false for other ports
      tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
      }
    });
    const info = await transporter.sendMail({
      from: '"Transferwiser " <@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    debug('development')('Message sent: %s', info.messageId);
    debug('development')('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    debug('development')(err);
  }
};

export default mailer;
