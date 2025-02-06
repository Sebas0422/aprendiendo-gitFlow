import { sendWebhookAuditUser } from "../controllers/webHook.controller";
import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const webHookRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post('/', sendWebhookAuditUser)
};

export default webHookRoutes;