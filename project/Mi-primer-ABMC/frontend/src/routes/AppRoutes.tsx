import { Route, Routes } from 'react-router-dom';
import Usuario from '../components/User/Usuario';
import Cuenta from '../components/Cuenta/Cuenta';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Usuario />} />
            <Route path='/cuentas' element={<Cuenta />} />
        </Routes>
    )
}

export default AppRouter;