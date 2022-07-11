import { Link } from "react-router-dom";

function Header() {
    return (
        <ul className="w-full fixed top-0 left-0 p-5 z-10">
            <li className="inline-block">
                <Link to="/">
                    <h3 className="text-4xl font-bold">Nes<span className="text-blue-unique">3D</span></h3>
                </Link>
            </li>
            <li className="inline-block">
                <span className="block pl-3">Game Bundle Demo</span>
            </li>
        </ul>
    )
}

export default Header;