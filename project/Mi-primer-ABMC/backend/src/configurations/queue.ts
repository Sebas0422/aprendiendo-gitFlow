import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import nodemailer from 'nodemailer';
import { QueueEventsEmail, QueueNames } from '../types/Queue.enum';

const connection = new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const emailQueue = new Queue(QueueNames.EMAIL_QUEUE, { connection });

export const emailWorker = new Worker(
    QueueNames.EMAIL_QUEUE,
    async (job) => {
        const { email, message } = job.data;

        if (!email || !message) {
            throw new Error('Falta el email o el mensaje');
        }

        if (QueueEventsEmail.SEND_WELCOME_EMAIL === job.name) {
            try {
                await transporter.sendMail({
                    from: `"Mi Aplicación" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: 'Bienvenido a nuestra plataforma',
                    text: message,
                    html: `<p>${message}</p>`,
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Error al enviar el correo: ${error.message}`);
                }
            }
        }
    },
    { connection }
);