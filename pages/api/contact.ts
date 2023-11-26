import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "./util/mailer";

type ContactResponse = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method === "POST") {
    const { name, contact, subject, body } = req.body;
    try {
      console.log(name, contact, "are the name and contact");
      await sendEmail(
        "aaron.y.chan64@gmail.com",
        `${subject} (CONTACT from ${name} (${contact}))`,
        `<p>${body}</p>`
      );
      res.status(200).json({ success: true, message: "" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send mail" });
    }
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
}
