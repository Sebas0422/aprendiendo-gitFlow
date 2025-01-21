import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { getCuentas, createCuenta, getCuenta, getCuentasSearch, getCuentasByUsuarioId, updateCuenta, deleteCuenta } from "../controllers/cuenta.controller";

const cuentaRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.get('/', getCuentas);
    fastify.get('/search', getCuentasSearch);
    fastify.get('/cuentaUsuarioById/:id', getCuentasByUsuarioId);
    fastify.post('/', createCuenta);
    fastify.get('/:id', getCuenta);
    fastify.put('/:id', updateCuenta);
    fastify.delete('/:id', deleteCuenta);
}

export default cuentaRoutes;