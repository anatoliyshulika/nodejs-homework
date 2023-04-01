const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const path = require("path");
const pug = require("pug");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendConfirmationEmail(userEmail, url) {
  const template = path.resolve(
    "./src/views/emailTemplates/verificationEmail.pug"
  );

  const msg = {
    to: userEmail,
    from: "shulika.anatoliy2@gmail.com",
    subject: "Confirm your email for Shulika company",
    text: `To confirm your email, please follow this link ${url}`,
    html: pug.renderFile(template, { url }),
  };
  await sgMail.send(msg);
}

module.exports = { sendConfirmationEmail };
