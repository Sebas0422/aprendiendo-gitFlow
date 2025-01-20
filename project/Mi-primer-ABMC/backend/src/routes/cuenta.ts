import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { getCuentas, createCuenta, getCuenta, getCuentasByUsuarioId, updateCuenta, deleteCuenta } from "../controllers/cuenta.controller";

const cuentaRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.get('/', getCuentas);
    fastify.get('/cuentaUsuarioById/:id', getCuentasByUsuarioId);
    fastify.post('/', createCuenta);
    fastify.get('/:id', getCuenta);
    fastify.put('/:id', updateCuenta);
    fastify.delete('/:id', deleteCuenta);
}

export default cuentaRoutes;