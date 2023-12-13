import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sendMail', async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: 'deepakpanwar1743@gmail.com',
    to: 'ravi@anchors.in',
    subject: 'Sending Email From Anchors',
    text: `User Name: ${req.body.name} 
    User Contact Number : ${req.body.number}
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json('Email sent: ' + info.response);
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('running on port 5000'));
