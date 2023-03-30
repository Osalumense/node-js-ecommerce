/* This all of are helper function */
const userModel = require("../models/users");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const config = require('./config');

exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.validateEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

exports.createToken = function (length) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  let token = '';
  for (let i = 1; i <= length; i++) {
      token += characters[Math.floor(Math.random() * characters.length )];
  }
  return token;
}

exports.emailCheckInDatabase = async function (email) {
  let user = await userModel.findOne({ email: email });
  user.exec((err, data) => {
    if (!data) {
      return false;
    } else {
      return true;
    }
  });
};

exports.phoneNumberCheckInDatabase = async function (phoneNumber) {
  let user = await userModel.findOne({ phoneNumber: phoneNumber });
  user.exec((err, data) => {
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};

const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./templates/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./templates/'),
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: "harkugbeosaz@gmail.com",
    pass: "cuzpmotucoaljdcb"
  }
});

transporter.use('compile', hbs(handlebarOptions));

const sendOutMail = async (mailOptions) => {
  return transporter.sendMail(mailOptions)
    .then( results => {
        console.log("Success:", results);
        return true
    })
    .catch ( error => {
        console.log("Error:", error);
        return false
    })
}

exports.sendMail = async function(data) {
  // console.log('data >>> ', data);
  let mailOptions
  if(data.mailType == 'verificationMail'){
    mailOptions = {
      from: config.ADMIN_MAIL,
      to: data.email,
      subject: data.subject,
      template: 'verify-email',
      context:{
        firstName: data.firstName,
        verifyMailUrl: data.verifyMailUrl,
        appName: config.APP_NAME
      }
    }
  }
  if(data.mailType == 'welcomeMail'){
    mailOptions = {
      from: config.ADMIN_MAIL,
      to: data.email,
      subject: data.subject,
      template: 'welcome-mail',
      context:{
        firstName: data.firstName,
        appName: config.APP_NAME,
        loginUrl: data.loginUrl
      }
    }
  }
  if(data.mailType == 'newOfferMail'){
    mailOptions = {
      from: config.ADMIN_MAIL,
      to: data.email,
      subject: data.subject,
      template: 'new-offer-user',
      context:{
        firstName: data.firstName,
        appName: config.APP_NAME,
        deviceName: data.deviceName,
        preferredDevice: data.preferredDevice,
        amount: data.amount,
        address: data.address,
        whatsappContact: data.whatsappContact
      }
    }
  }
  if(data.mailType == 'newOfferAdminMail'){
    mailOptions = {
      from: config.ADMIN_MAIL,
      to: data.email,
      subject: data.subject,
      template: 'new-offer-admin',
      context:{
        offerUrl: data.offerUrl,
        appName: config.APP_NAME
      }
    }
  }
  if(data.mailType == 'offerMadeMail'){
    mailOptions = {
      from: config.ADMIN_MAIL,
      to: data.email,
      subject: data.subject,
      template: 'offer-made',
      context:{
        firstName: data.firstName,
        appName: config.APP_NAME,
        offer: data.offer,
        offerAmount: data.offerAmount
      }
    }
  }
  // if(data.mailType == 'resetMail'){
  //   mailOptions = {
  //     from: config.ADMIN_MAIL,
  //     to: data.email,
  //     subject: data.subject,
  //     template: 'reset-password',
  //     context:{
  //       userFirstName: data.firstName,
  //       passwordResetURL: data.passwordResetURL
  //     }
  //   }
  // }
    const sendEmail = await sendOutMail(mailOptions)
    if(!sendEmail) console.log('An error occurred while sending mail')
    return true;
}