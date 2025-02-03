import Fastify from 'fastify';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import usuarioRoutes from './routes/usuario';
import cuentaRoutes from './routes/cuenta';
import fs from 'fs';
import path from 'path';

export const app = Fastify({
    https: {
        key: fs.readFileSync(path.join(__dirname, '../private-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../certificate.pem')),
    }
});

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(formbody);

app.get('/', async () => {
    return { message: 'Welcome to my application' };
});

app.register(usuarioRoutes, { prefix: '/api/usuarios' });
app.register(cuentaRoutes, { prefix: '/api/cuentas' });

app.decorate('port', process.env.PORT ? Number(process.env.PORT) : 4000);

export const getTestServer = async () => {
    await app.ready();
    return app.server;
};