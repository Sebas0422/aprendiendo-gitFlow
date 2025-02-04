import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
});

export const emailQueue = new Queue('emailQueue', { connection });

export const emailWorker = new Worker('emailQueue', async (job) => {
    const { email, message } = job.data;
    console.log(`Enviando correo a ${email} con el mensaje: ${message}`);
}, { connection });