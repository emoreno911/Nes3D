import { Link } from "react-router-dom";

function Header() {
    return (
        <ul className="mt-4 w-full pl-2">
            <li className="inline-block">
                <Link to="/">
                    <span className="block font-semibold pr-4 h-12">Home</span>
                </Link>
            </li>
            <li className="inline-block">
                <Link to="/visual">
                    <span className="block font-semibold pr-4 h-12">Viz</span>
                </Link>
            </li>
        </ul>
    )
}

export default Header;