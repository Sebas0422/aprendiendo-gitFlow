// src/fastify.d.ts (o en un directorio types/fastify.d.ts)
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    port: number; // O number si prefieres usar un número
  }
}
