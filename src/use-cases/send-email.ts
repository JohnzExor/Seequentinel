import { EmailTemplate } from "@/components/email-templates/report-response";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const ReportResponse = async () => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["jimenojohnzyll@gmail.com"],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    throw new Error("Error sending email");
  }

  return data;
};
