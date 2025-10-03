'use server';

import { z } from "zod";
import fs from "fs";
import path from "path";
import { sendEmail } from "@/lib/email";

const contactSchema  = z.object({
    name: z.string().min(3).max(50),
    email: z.email().max(255),
    phone: z.string().min(6).max(20).optional().nullable(),
    subject: z.string().min(3).max(255),
    message: z.string().min(15).max(500),
});


export const sendContactEmail = async (formData: FormData) => {

    try {
        const data = Object.fromEntries(formData);
        const parsedData = contactSchema.safeParse(data);

        if (!parsedData.success) {
            console.log(parsedData.error);
            return {
                ok: false,
                message: parsedData.error.issues[0].message
            };
        }

        // load html template
        const templatePath = path.resolve(
            process.cwd(),
            'src/lib/templates/emails/contact-form.html'
        );
        let html = fs.readFileSync(templatePath, 'utf-8');

        const date = new Date().toLocaleString();

        const {subject, name, phone, email, message} = parsedData.data;

        // replace values
        html = html
            .replace("{{name}}", name)
            .replace("{{email}}", email)
            .replace("{{phone}}", phone || '')
            .replace("{{date}}", date)
            .replace("{{message}}", message.replace(/\n/g, '<br/>'));

        // send email to admin
       await sendEmail({
            to: process.env.ADMIN_EMAIL!,
            subject: subject,
            html
        });       

        return {
            ok: true,
            message: 'Mensaje enviado correctamente'
        }
    } catch (error) {
        console.log(`Error sending contact email: ${error}`);

        // validate zod error
        if (error instanceof z.ZodError) {
            return {
                ok: false,
                message: error.issues[0].message
            }
        }

        return {
            ok: false,
            message: 'Ocurrió un error al enviar el correo'
        }
    }
}