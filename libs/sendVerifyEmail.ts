import nodemailer from "nodemailer";

const sendVerificationEmail = async (
  email: string,
  verificationUrl: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="text-align: center; color: #4CAF50;">Email Verification</h2>
        <p>Hi,</p>
        <p>Thank you for signing up with Calendly.</p>
        <p>Please verify your email by clicking the link below:</p>
        <p style="text-align: center;">
          <a href="${verificationUrl}" target="_blank" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Verify Email
          </a>
        </p>
        <p>This link is valid only for 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thanks,</p>
        <p>The Calendly Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email");
  }
};

export default sendVerificationEmail;
