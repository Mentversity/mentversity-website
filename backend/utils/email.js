const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
const config = require('../config/email'); // Centralized email config

class Email {
  constructor(user, url = '') {
    this.to = user.email;
    this.firstName = user.name ? user.name.split(' ')[0] : 'Valued Customer';
    this.url = url;
    this.from = config.from;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465, // true for port 465 (SSL)
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  // Generic send method using a Pug template
  async send(template, subject, templateData = {}) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      ...templateData,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    const transporter = this.newTransport();
    if (transporter) {
      await transporter.sendMail(mailOptions);
    } else {
      console.error('Email not sent: No valid transport available.');
    }
  }

  // Confirmation email to user
  async sendContactConfirmation(contactName, contactEmail, contactSubject, contactMessage) {
    await this.send('contactConfirmation', 'Mentversity: Your message has been received!', {
      contactName,
      contactEmail,
      contactSubject,
      contactMessage,
    });
  }

  // Contact form email to the company
  async sendCompanyContactForm(contactName, contactEmail, contactSubject, contactMessage) {
    const html = pug.renderFile(`${__dirname}/../views/email/contactForm.pug`, {
      contactName,
      contactEmail,
      contactSubject,
      contactMessage,
    });

    const mailOptions = {
      from: this.from,
      to: config.companyEmail,
      subject: `New Contact Form Submission: ${contactSubject}`,
      html,
      text: htmlToText(html),
    };

    const transporter = this.newTransport();
    if (transporter) {
      await transporter.sendMail(mailOptions);
    } else {
      console.error('Company email not sent: No valid transport available.');
    }
  }
}

module.exports = Email;
