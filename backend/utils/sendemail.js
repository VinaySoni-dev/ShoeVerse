const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject: subject,
      text: text
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(error.message);
    }

    console.log('Email sent successfully:', data);

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
