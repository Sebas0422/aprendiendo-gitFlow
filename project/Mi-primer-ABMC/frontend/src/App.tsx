import UsuarioCard from './components/UsuarioCard';
import UsuarioForm from './components/UsuarioForm';
import { TextInput, Box, Button, Modal, useOpenClose } from '@palmetto/palmetto-components';
import { UsuarioDTO } from './dto/usuarioDto';
import { useSearch } from './hooks/useSearch';
import { useUsuariosSearch } from './hooks/useUsuarios';
import { useDebouncedGetUsuarios } from './hooks/useDebounce';

export default function App() {
  const { search, updateSearch } = useSearch()
  const { usuarios, getUsuarios, loading, removeUsuarioLocal } = useUsuariosSearch({ search });
  const { isOpen: isModalOpen, handleOpen: openModal, handleClose: closeModal } = useOpenClose();

  const debouncedGetUsuarios = useDebouncedGetUsuarios(getUsuarios);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetUsuarios(newSearch)
  }

  const renderLoading = () => <p>Cargando usuarios...</p>;
  //const renderError = () => <p>Error: {error}</p>;

  const renderContent = () => {
    const usuario: UsuarioDTO = {
      id: "",
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      edad: 0
    }
    return (
      <>
        <Box gap="lg" direction="row" wrap>
          <TextInput
            id="user-search"
            value={search}
            label="Buscar usuario"
            onChange={handleChange}
            autoFocus
          />
          <Button onClick={openModal}>Crear Usuario</Button>
        </Box>
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
        <UsuarioCard usuarios={usuarios} onRemoveUsuario={removeUsuarioLocal} />
      </>
    )
  };

  return (
    <>
      {loading && renderLoading()}
      {!loading && renderContent()}
    </>
  );
}
