import Fastify from 'fastify';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import usuarioRoutes from './routes/usuario';
import cuentaRoutes from './routes/cuenta';
export const app = Fastify();

app.register(cors);
app.register(formbody);

app.get('/', async () => {
    return { message: 'Welcome to my application' };
});

app.register(usuarioRoutes, { prefix: '/api/usuarios'});
app.register(cuentaRoutes, { prefix: '/api/cuentas'});

app.decorate('port', process.env.PORT ? Number(process.env.PORT) : 4000);