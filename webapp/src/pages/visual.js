import { useParams } from "react-router-dom";
import Header from "../app/layout/Header";

function Visual() {
    const { tokenId } = useParams();

    return (
        <div>
            <Header />

            <div>
                <h3 className="text-lg my-3 pl-2">
                    {`Visual ${tokenId ? "with TokenId" : "without TokenId"}`}
                </h3>
            </div>
        </div>
    )
}

export default Visual;