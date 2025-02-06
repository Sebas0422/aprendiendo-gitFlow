import { UsuarioDto } from "../dtos/usuarioDto";
import { WebHookEvents } from "../types/WebHook.enum";

//const api = process.env.WEBHOOK_API || 'https://localhost:4000/api/webhook';
export const sendWebhookAuditUser = async (data: UsuarioDto, event: WebHookEvents) => {
    try {
        console.log("Antes de fetch a webhook");
        await fetch("https://localhost:4000/api/webhook", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, event }),
        })
        console.log("Después de fetch a webhook");
    }
    catch (error) {
        console.log("error");
        if (error instanceof Error) throw (`Error al enviar el evento de auditoría: ${error.message}`);
    }
};