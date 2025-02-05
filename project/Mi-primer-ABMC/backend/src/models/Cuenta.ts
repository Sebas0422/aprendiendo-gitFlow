import { Schema, model, Types } from 'mongoose';

const cuentaSchema = new Schema({
  cuenta: { type: String, required: true },
  nombre: { type: String, required: true },
  monto: { type: Number, required: true },
  usuarioId: { type: Types.ObjectId, ref: 'Usuario', required: true }, // Relación con Usuario
}, {
  timestamps: true,
});

cuentaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    return returnedObject;
  }
});

export const Cuenta = model('Cuenta', cuentaSchema);