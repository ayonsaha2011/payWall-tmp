import { Injectable } from "@tsed/di";
import nodemailer from "nodemailer";
import nunjucks from "nunjucks";
import path from "path";

@Injectable()
export class EmailService {
    private transporter;
    constructor() {
        if (process.env.MAIL_SENDER_AUTH_EMAIL_ID && process.env.MAIL_SENDER_AUTH_EMAIL_PASSWORD) {
            this.transporter = nodemailer.createTransport({
                host: process.env.MAIL_SENDER_HOST,
                port: parseInt(process.env.MAIL_SENDER_PORT || "587"),
                secure: Boolean(process.env.MAIL_SENDER_SECURE),
                auth: {
                    user: process.env.MAIL_SENDER_AUTH_EMAIL_ID,
                    pass: process.env.MAIL_SENDER_AUTH_EMAIL_PASSWORD,
                },
            });
        } else {
            // throw new Error("Email credentials not found");
        }
    }

    async sendEmail(to: string, subject: string, text: string) {
        if (!this.transporter) {
            throw new Error("Email credentials not found");
        }
        const mailOptions = {
            from: process.env.MAIL_SENDER_EMAIL_FROM,
            to,
            subject,
            text,
        };
        return this.transporter.sendMail(mailOptions);
    }

    async sendEmailWithHtml(to: string, subject: string, html: string) {
        if (!this.transporter) {
            throw new Error("Email credentials not found");
        }
        const mailOptions = {
            from: process.env.MAIL_SENDER_EMAIL_FROM,
            to,
            subject,
            html,
        };
        return this.transporter.sendMail(mailOptions);
    }

    async sendEmailWithNunjucksTemplate(to: string, subject: string, template: string, data: any) {
        if (!this.transporter) {
            throw new Error("Email credentials not found");
        }
        template = path.join(__dirname, '..', '..', 'views/emailTemplates', template);
        console.log("template -", template);
        const mailOptions = {
            from: process.env.MAIL_SENDER_EMAIL_FROM,
            to,
            subject,
            html: nunjucks.render(template, data)
        };
        return this.transporter.sendMail(mailOptions);
    }

    async welcomeEmail(to: string, user: any) {
        return this.sendEmailWithNunjucksTemplate(to, 'Welcome to the app', 'WelcomeMail.njk', user);
    }

    async resetPasswordEmail(to: string, name: string, resetLink: string) {
        return this.sendEmailWithNunjucksTemplate(to, 'Reset Password', 'ResetPassword.njk', { name, resetLink });
    }


}
