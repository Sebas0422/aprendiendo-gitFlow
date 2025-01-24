import { Box, Button, FormikTextInput } from '@palmetto/palmetto-components';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { UsuarioDTO } from '../../types/User';
import { useCreateUsuario } from '../../hooks/useUsuarios';

type FormValues = {
    nombre: string;
    apellido: string;
    edad: string;
    email: string;
    telefono: string;
};

interface UserFormProps {
    usuario: UsuarioDTO;
}

const validateForm = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {};
    const edad = parseInt(values.edad, 10);

    if (!values.nombre) errors.nombre = 'El nombre es requerido';
    if (!values.apellido) errors.apellido = 'El apellido es requerido';
    if (!values.email) errors.email = 'El email es requerido';
    if (!values.telefono) errors.telefono = 'El telefono es requerido';

    if (!values.edad) {
        errors.edad = 'La edad es requerida';
    } else if (isNaN(edad) || edad <= 0) {
        errors.edad = 'La edad debe ser un número mayor a 0';
    }
    return errors;
};

export default function UsuarioForm({ usuario }: UserFormProps) {
    const { create } = useCreateUsuario();

    const initialFormValues: FormValues = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        edad: usuario.edad.toString(),
        email: usuario.correo,
        telefono: usuario.telefono,
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm }: FormikHelpers<FormValues>
    ) => {
        const { nombre, apellido, edad, email, telefono } = values;

        const newUsuario: UsuarioDTO = {
            id: "",
            nombre,
            apellido,
            edad: parseInt(edad, 10),
            correo: email,
            telefono,
        };

        try {
            await create(newUsuario);
            resetForm();
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box margin="lg auto">
            <Formik
                initialValues={initialFormValues}
                validate={validateForm}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box gap="lg">
                            {(['nombre', 'apellido', 'edad', 'email', 'telefono'] as Array<keyof FormValues>).map((field) => (
                                <Field
                                    key={field}
                                    type={field === 'email' ? 'email' : 'text'}
                                    label={`Ingrese su ${field}:`}
                                    name={field}
                                    id={field}
                                    component={FormikTextInput}
                                />
                            ))}
                            <Button
                                type="submit"
                                className="m-bottom-md"
                                isLoading={isSubmitting}
                            >
                                Crear Usuario
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
