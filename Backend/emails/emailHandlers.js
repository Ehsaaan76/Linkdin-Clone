import { mailtrapClient, sender, recipient } from '../config/Mailtrap.js';
import { createWelcomeEmailTemplate } from './emailTemplates.js';

export const sendWelcomeEmail = async(email, name, profileUrl) => {

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Linkedin-clone",
            html: createWelcomeEmailTemplate(name, profileUrl),
            category: "Welcome"
        });

        console.log("Welcome Email sent Successfully", response);
        
    } catch (error) {
        console.log("Welcome Email Sending Failed" + error);
        
    }

};

export const sendCommentNotificationEmail = async(
    recipientEMail,
    recipientName,
    commenterName,
    postUrl,
    commentContent
) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "New Comment on Your Post",
            html: createCommentNotificationEmailTemplate(recipientName, commenterName, postUrl, commentContent),
            category: "commentNotification"
        });

        console.log("Comment Notification Email sent successfully: ", response);
        
    } catch (error) {
        console.log("Error in sendCommentNotificationEmail: ", error);
    }
}