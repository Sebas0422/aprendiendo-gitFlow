import '../css/navBar.css'
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav className='navBar'>
            <Link to="/" className='navBar__item'>Usuarios</Link>
            <Link to="/cuentas" className='navBar__item'>Cuentas</Link>
        </nav>
    )
}

export default NavBar