import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASS },
});
export const sendResetEmail = async ({ to, resetUrl }) => {
  await transporter.sendMail({
    from: `"Village Digital" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: "Password Reset Request",
    html: `<p>Click to reset password: <a href="${resetUrl}">${resetUrl}</a></p><p>Expires in 15 minutes.</p>`,
  });
};
export const sendWelcomeEmail = async ({ to, name }) => {
  await transporter.sendMail({
    from: `"Village Digital" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: "Welcome to Village Digital Platform",
    html: `<h2>Welcome, ${name}!</h2><p>Your account has been created successfully.</p>`,
  });
};
