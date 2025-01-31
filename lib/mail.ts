import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const host = process.env.WEB_HOST;
  const confirmLink = `${host}/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Please confirm your email address',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email address</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const host = process.env.WEB_HOST;
  const resetLink = `${host}/new-password?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Do not share this link with anyone.</p>`,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  console.log('email: token', token);
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Your two-factor authentication code:',
    html: `Your two-factor authentication code is: <strong>${token}</strong>`,
  });
};
