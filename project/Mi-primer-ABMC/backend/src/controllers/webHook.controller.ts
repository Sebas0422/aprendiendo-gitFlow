import { FastifyReply, FastifyRequest } from "fastify";
import { UsuarioDto } from "../dtos/usuarioDto";
import { WebHookEvents } from "../types/WebHook.enum";

export const sendWebhookAuditUser = async (
    req: FastifyRequest<{ Body: { data: UsuarioDto, event: WebHookEvents } }>,
    reply: FastifyReply
) => {
    try {
        const { data, event } = req.body;
        if (!data || !event) {
            return reply.code(400).send({ error: "Los parámetros 'data' y 'event' son requeridos." });
        }
        reply.code(201).send({ message: `Evento ${event} para el usuario ${data.nombre} ${data.apellido} auditado.` });
    } catch (error) {
        reply.code(400).send({ error: 'Error al enviar el evento de auditoría', message: error });
    }
};