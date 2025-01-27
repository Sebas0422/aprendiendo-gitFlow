import NavBar from './components/Shared/NavBar';
import { Route, Routes } from 'react-router-dom';
import Usuario from './components/User/Usuario';
import Cuenta from './components/Cuenta/Cuenta';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Usuario />} />
        <Route path='/cuentas' element={<Cuenta />} />
      </Routes>
    </>
  )
}
