import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav className="bg-green-600 p-4 mb-4 ">
            <Link
                to="/"
                className="text-black-700 font-bold mx-4 hover:text-white"
            >
                Usuarios
            </Link>
            <Link
                to="/cuentas"
                className="text-black-700 font-bold mx-4 hover:text-white"
            >
                Cuentas
            </Link>
        </nav>

    )
}

export default NavBar