import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  edad: { type: Number, required: true, min: 0 },
  telefono: { type: String, required: true },
  correo: { type: String, required: true, unique: true, lowercase: true, trim: true },
}, {
  timestamps: true,
});

usuarioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    return returnedObject;
  }
});

export const Usuario = model('Usuario', usuarioSchema);