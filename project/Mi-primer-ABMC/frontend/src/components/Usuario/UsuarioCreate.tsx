import { useOpenClose, Modal, Button } from "@palmetto/palmetto-components"
import UsuarioForm from "./UsuarioForm"
import { UsuarioDTO } from "../../dto/usuarioDto";

const usuario: UsuarioDTO = {
    id: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    edad: 0
}

export default function UsuarioCreate() {
    const { isOpen: isModalOpen, handleOpen: openModal, handleClose: closeModal } = useOpenClose();
    return (
        <>
            <Button onClick={openModal}>Crear usuario</Button>
            <Modal ariaLabelledBy="modal-title" isOpen={isModalOpen} onDismiss={closeModal}>
                <Modal.Header id="modal-title" title="Crear nuevo usuario" onDismiss={closeModal} />
                <Modal.Body>
                    <UsuarioForm usuario={usuario} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" tone="neutral" onClick={closeModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}