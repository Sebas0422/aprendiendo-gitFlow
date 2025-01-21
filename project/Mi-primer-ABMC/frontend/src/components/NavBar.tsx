import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <Link to="/">Usuarios</Link>
            <Link to="/cuentas">Cuentas</Link>
        </nav>
    )
}

export default NavBar