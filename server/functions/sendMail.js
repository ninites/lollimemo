const nodemailer = require("nodemailer");
const fs = require("fs");
const nodemailerTransporter = require("../config/nodemailer");

const sendMail = async (user) => {
  const config = {
    from: "Memory <rmnheo@gmail.com>",
    to: user.email,
    subject: "Enregistrer un nouveau mot de passe",
    html: "<div>HELLO<div>",
  };

  try {
    await nodemailerTransporter.sendMail(config);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = sendMail;
