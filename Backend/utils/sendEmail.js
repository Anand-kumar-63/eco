import nodemailer from "nodemailer";
// import React from 'react'
const sendemail = async({ email, subject , message }) => {
    try {
        const transaporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })
        const mailOptions = {
            from: `"ShopNest Support" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            html: message,
        };
       const info = await transaporter.sendMail(mailOptions);
       console.log("Email sent", info.messageId);
       return info;
    }
    catch (error) {
       console.error("Email sending failed" , error);
       throw error;
    }
}
export default sendemail;