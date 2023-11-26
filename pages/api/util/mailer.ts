import { NodeMailgun } from "ts-mailgun";

async function sendEmail(
  recipient: string,
  subject: string,
  html: string
): Promise<any> {
  /**
   * Sends an email using Mailgun
   *
   * @param {string} recipient The email address to send the email to
   * @param {string} subject The subject of the email
   * @param {string} html The HTML to send in the email
   * @returns {Promise<any>} the result of sending the email
   */

  const mailer = new NodeMailgun();
  mailer.apiKey = process.env.MAILGUN_API_KEY || ""; // Set your API key
  mailer.domain = "sandbox3f3f566d2f51464e8f5656096672c6d4.mailgun.org"; // Set the domain you registered earlier
  mailer.fromEmail =
    "noreply@sandbox3f3f566d2f51464e8f5656096672c6d4.mailgun.org"; // Set your from email
  mailer.fromTitle = "Aaronchan.dev Contact Form"; // Set the name you would like to send from

  mailer.init();

  // Send an email to test@example.com
  return await mailer.send(recipient, subject, html);
}

export { sendEmail };
