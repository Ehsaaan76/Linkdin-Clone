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

