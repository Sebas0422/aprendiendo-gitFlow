export type CuentaId = string;
export interface CuentaDTO {
    _id?: CuentaId;
    id: CuentaId;
    cuenta: string;
    nombre: string;
    monto: number;
    usuarioId: string;
}