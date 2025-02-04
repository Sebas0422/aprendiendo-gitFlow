import { FastifyRequest, FastifyReply } from "fastify";
import { Cuenta } from "../models/Cuenta";
import { CuentaDto } from "../dtos/cuentaDto";

export const getCuentas = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const cuentas = await Cuenta.find().populate('usuarioId');
        reply.send(cuentas);
    } catch (error) {
        reply.code(500).send({ error: 'Error al obtener cuentas', message: error });
    }
}

export const getCuentasSearch = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { search } = req.query as { search: string };
        if (!search) {
            return reply.code(400).send({ error: "El parámetro 'search' es requerido." });
        }
        const regexQuery = new RegExp(search, "i");
        const cuentas = await Cuenta.aggregate([
            {
                $addFields: {
                    montoStr: { $toString: "$monto" }
                },
            },
            {
                $match: {
                    $or: [
                        { cuenta: regexQuery },
                        { nombre: regexQuery },
                        { montoStr: regexQuery }
                    ]
                }
            }
        ]);
        reply.send(cuentas);
    } catch (error) {
        reply.code(400).send({ error: 'Error al buscar cuentas', message: error });
    }
}

export const getCuentasByUsuarioId = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const cuentas = await Cuenta.find({ usuarioId: req.params.id }).populate('usuarioId');
        reply.send(cuentas);
    } catch (error) {
        reply.code(500).send({ error: 'Error al obtener cuentas', message: error });
    }
}

export const createCuenta = async (req: FastifyRequest<{ Body: CuentaDto }>, reply: FastifyReply) => {
    try {
        const { cuenta, nombre, monto } = req.body;
        const newCuenta = new Cuenta({
            cuenta,
            nombre,
            monto,
            usuarioId: req.body.usuarioId
        });
        await newCuenta.save();
        reply.code(201).send(newCuenta);
    } catch (error) {
        reply.code(500).send({ error: 'Error al crear cuenta', message: error });
    }
}

export const getCuenta = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const cuenta = await Cuenta.findById(req.params.id);
        if (!cuenta) {
            reply.code(404).send({ error: 'Cuenta no encontrada' });
        } else {
            reply.send(cuenta);
        }
    } catch (error) {
        reply.code(500).send({ error: 'Error al obtener la cuenta', message: error });
    }
}

export const updateCuenta = async (req: FastifyRequest<{ Body: CuentaDto, Params: { id: string } }>, reply: FastifyReply) => {
    const { cuenta, nombre, monto } = req.body;
    try {
        await Cuenta.findByIdAndUpdate(req.params.id, {
            cuenta,
            nombre,
            monto,
            usuarioId: req.body.usuarioId
        });
        reply.send(req.body);
    } catch (error) {
        reply.code(500).send({ error: 'Error al actualizar la cuenta', message: error });
    }
}

export const deleteCuenta = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        await Cuenta.findByIdAndDelete(req.params.id);
        reply.send({ message: 'Cuenta eliminada' });
    } catch (error) {
        reply.code(500).send({ error: 'Error al eliminar la cuenta', message: error });
    }
}