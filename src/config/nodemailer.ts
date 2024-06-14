import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  port: 587,
  secure: false,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
