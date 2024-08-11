import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetPasswordEmail = async (
  email: string,
  resetUrl: string
) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="text-align: center; color: #4CAF50;">Password Reset Request</h2>
        <p>Hi,</p>
        <p>You requested a password reset for your Calendly account.</p>
        <p>Please click the link below to set a new password:</p>
        <p style="text-align: center;">
          <a href="${resetUrl}" target="_blank" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p>This link is valid only for 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thanks,</p>
        <p>The Calendly Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
