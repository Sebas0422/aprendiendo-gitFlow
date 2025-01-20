import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { getUsuarios, createUsuario, getUsuario, updateUsuario, deleteUsuario, getUsuarioSearch } from '../controllers/usuario.controller'

const usuarioRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', getUsuarios)
  fastify.get('/search', getUsuarioSearch)
  fastify.post('/', createUsuario)
  fastify.get('/:id', getUsuario)
  fastify.put('/:id', updateUsuario)
  fastify.delete('/:id', deleteUsuario)
};

export default usuarioRoutes;