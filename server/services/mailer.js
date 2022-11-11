const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

class Mailer {
    constructor() {
        this._sender = "sansansan018@proton.me"
        this._host = process.env.MAIL_HOST_URL;
        this._transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: process.env.MAIL_LOG,
                pass: process.env.MAIL_PASS,
            },
        })
    }

    async sendRetrieveMail(user, token) {
        const mailPath = path.join(__dirname, "..", "views", "retrieveEmail.html");
        const mail = fs.readFileSync(mailPath, "utf8");
        const replacers = {
            "{{NAME}}": user.username,
            "{{URL}}": `${this._hosthost}user/change-password/${token}`,
        };
        const regEx = new RegExp(Object.keys(replacers).join("|"), "gi");
        const mailWithVariables = mail.replace(
            regEx,
            (matched) => replacers[matched]
        );

        const config = {
            from: `Memory <${this._sender}>`,
            to: user.email,
            subject: "Enregistrer un nouveau mot de passe",
            html: mailWithVariables,
        };

        try {
            console.log("SEND EMAIL START")
            await this._transporter.sendMail(config);
            console.log("SEND EMAIL SUCCESS")
            return true;
        } catch (err) {
            console.error("SEND EMAIL ERROR", err)
            return false;
        }
    }
}

const instance = new Mailer()
module.exports.MailerService = instance
module.exports.Mailer = Mailer
