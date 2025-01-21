import { FastifyRequest, FastifyReply } from 'fastify'
import { Usuario } from '../models/Usuario'
import { UsuarioDto } from '../dtos/usuarioDto'

export async function getUsuarios(req: FastifyRequest, reply: FastifyReply) {
    try {
        const usuarios = await Usuario.find()
        reply.send(usuarios)
    } catch (error) {
        console.log(error)
        reply.code(400).send({ error: 'Error al obtener usuarios' })
    }
};

export const getUsuarioSearch = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { search } = req.query as { search: string }

        if (!search) {
            return reply.status(400).send({ error: "El parámetro 'search' es requerido." })
        }

        const regexQuery = new RegExp(search, "i")
        const usuarios = await Usuario.aggregate([
            {
                $addFields: { edadStr: { $toString: "$edad" } },
            },
            {
                $match: {
                    $or: [
                        { nombre: regexQuery },
                        { apellido: regexQuery },
                        { edadStr: regexQuery },
                        { telefono: regexQuery },
                        { correo: regexQuery },
                    ],
                },
            },
        ]);

        reply.status(200).send(usuarios)
    } catch (error) {
        console.error(error)
        reply.status(400).send({ error: "Error al buscar usuarios." })
    }
};
/*
export const getUsuarioSearch = async (
    req: FastifyRequest<{ Querystring: { search: string } }>,
    reply: FastifyReply
) => {
    try {
        const { search } = req.query

        const usuarios = await Usuario.find({
            $or: [
                { nombre: { $regex: search, $options: 'i' } },
                { apellido: { $regex: search, $options: 'i' } },
            ],
        })

        if (usuarios.length === 0) {
            return reply.send({ error: 'No se encontraron usuarios' })
        }

        return reply.send(usuarios)
    } catch (error) {
        console.error('Error al buscar usuario:', error)
        return reply.code(500).send({ error: 'Error al obtener el usuario' })
    }
};
*/
export const createUsuario = async (req: FastifyRequest<{ Body: UsuarioDto }>, reply: FastifyReply) => {
    try {
        const { nombre, apellido, edad, telefono, correo } = req.body
        const newUsuario = new Usuario({
            nombre,
            apellido,
            edad,
            telefono,
            correo
        })
        await newUsuario.save()
        reply.status(201).send(newUsuario)
    } catch (error) {
        reply.code(400).send({ error: 'Error al crear usuario', message: error })
    }
}


export const getUsuario = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        if (!usuario) {
            reply.code(404).send({ error: 'Usuario no encontrado' })
        } else {
            reply.send(usuario)
        }
    } catch (error) {
        console.log(error)
        reply.code(400).send({ error: 'Error al obtener el usuario' })
    }
};

export const updateUsuario = async (req: FastifyRequest<{ Body: UsuarioDto, Params: { id: string } }>, reply: FastifyReply) => {
    const { nombre, apellido, edad, telefono, correo } = req.body
    try {
        await Usuario.findByIdAndUpdate(req.params.id, {
            nombre,
            apellido,
            edad,
            telefono,
            correo
        })
        reply.code(201).send({ message: 'Usuario actualizado', Usuario: req.body })
    } catch (error) {
        console.log(error)
    }

}

export const deleteUsuario = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id)
        reply.code(204).send({ message: 'Usuario eliminado' })
    } catch (error) {
        console.log(error)
    }
}
