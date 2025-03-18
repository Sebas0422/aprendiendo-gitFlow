import { UsuarioDto } from "../dtos/usuarioDto";
import { WebHookEvents } from "../types/WebHook.enum";

//const api = process.env.WEBHOOK_API || 'https://localhost:4000/api/webhook';
export const sendWebhookAuditUser = async (data: UsuarioDto, event: WebHookEvents) => {
    try {
        await fetch("https://localhost:4000/api/webhook", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, event }),
        })
    }
    catch (error) {
        if (error instanceof Error) throw (`Error al enviar el evento de auditoría: ${error.message}`);
    }
};