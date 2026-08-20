const nodeMailer = require('nodemailer');      //importing nodemailer module to send email

const sendEmail = async (to, subject, text) => {    //function to send email using nodemailer
    try {
        const transporter = nodeMailer.createTransport({         //creating a transporter object to send email
            service: 'gmail',                               //using gmail as the email service
            auth: {                                       //authentication for the email service
                user: process.env.EMAIL_USER,             //email id of the sender
                pass: process.env.EMAIL_PASS              //password of the sender email id
            }
        });
        const mailOptions = {                           //mail options to be sent to the user
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);         //sending the email to the user
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
module.exports = sendEmail;