import nodemailer from "nodemailer";

async function sendEmail(
  fromName: string,
  to: string,
  subject: string,
  html: string
): Promise<string> {
  const [p1, p2, p3, p4] = ["icnl", "ftqd", "hvbz", "pwbl"]
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "tiedyeapp@gmail.com", // generated ethereal user
      pass: p1 + p2 + p3 + p4, // generated ethereal password
    },
  });

  // send mail with defined transport object
  try {
    const result: any = await transporter.sendMail({
      from: fromName, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      //text: text, // plain text body
      html: html, // html body
    });
    return result.response;
  } catch (error) {
    console.log("ERROR: " + error);
    return "unable to send";
  }
}

async function sendEmailToSelf(subject: string, html: string): Promise<string> {
  return sendEmail("Tiedye", "tiedyeapp@gmail.com", subject, html);
}

async function sendEmailToCustomer(
  customerEmail: string,
  subject: string,
  html: string
): Promise<string> {
  return sendEmail("Tiedye", customerEmail, subject, html);
}

export { sendEmailToSelf, sendEmailToCustomer, sendEmail };