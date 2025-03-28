import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "./util/mailer";
// Note: Server-side Mixpanel tracking uses a different package
import Mixpanel from 'mixpanel';

type ContactResponse = {
  success: boolean;
  message: string;
};

// Initialize Mixpanel for server-side tracking
const MIXPANEL_TOKEN = process.env.MIXPANEL_SERVER_TOKEN || process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'your-token-here';
const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method === "POST") {
    const { name, contact, subject, body } = req.body;
    try {
      console.log(name, contact, "are the name and contact");
      
      // Track the contact form submission from server-side
      mixpanel.track('Contact Form Server Submit', {
        distinct_id: contact, // Use email as distinct ID
        name: name,
        subject_length: subject.length,
        message_length: body.length
      });
      
      await sendEmail(
        "aaron.y.chan64@gmail.com",
        `${subject} (CONTACT from ${name} (${contact}))`,
        `<p>${body}</p>`
      );
      
      // Track successful email send
      mixpanel.track('Contact Form Server Success', {
        distinct_id: contact
      });
      
      res.status(200).json({ success: true, message: "" });
    } catch (error) {
      // Track error
      mixpanel.track('Contact Form Server Error', {
        distinct_id: contact || 'unknown',
        error: String(error)
      });
      
      res.status(500).json({ success: false, message: "Failed to send mail" });
    }
  } else {
    res.status(404).json({ success: false, message: "Not found" });
  }
}
