import { useParams, Link } from "react-router-dom";

function Visual() {
    const { tokenId } = useParams();

    return (
        <div>
            <ul className="mt-4 w-full pl-2 text-blue-500">
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

            <div>
                <h3 className="text-lg my-3 pl-2">
                    {`Visual ${tokenId ? "with TokenId" : "without TokenId"}`}
                </h3>
            </div>
        </div>
    )
}

export default Visual;