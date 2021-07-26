const nodemailer = require("nodemailer");
const fs = require("fs");
const nodemailerTransporter = require("../config/nodemailer");
const path = require("path");
const host = process.env.HOST_URL;

const sendMail = async (user, token) => {
  const mailPath = path.join(__dirname, "..", "views", "retrieveEmail.html");
  const mail = fs.readFileSync(mailPath, "utf8");
  const replacers = {
    "{{NAME}}": user.username,
    "{{URL}}": `${host}user/change-password/${token}`,
  };
  const regEx = new RegExp(Object.keys(replacers).join("|"), "gi");
  const mailWithVariables = mail.replace(
    regEx,
    (matched) => replacers[matched]
  );

  const config = {
    from: "Memory <rmnheo@gmail.com>",
    to: user.email,
    subject: "Enregistrer un nouveau mot de passe",
    html: mailWithVariables,
  };

  try {
    await nodemailerTransporter.sendMail(config);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = sendMail;
