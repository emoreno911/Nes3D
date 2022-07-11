import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="h-screen max-w-screen-sm mx-auto flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold my-5">Nes<span className="text-blue-unique">3D</span></h1>
                <h2 className="text-lg font-light my-10  uppercase">An interactive visualization for nested NFTs on the UNIQUE Network</h2>

                <Link to="/visual">
                    <span className="block bg-darkmode uppercase font-bold text-lg py-3 mb-3">Game Bundle Demo</span>
                </Link>
                <Link to="/visual/20">
                    <span className="block bg-darkmode uppercase font-bold text-lg py-3">About Nes3D</span>
                </Link>
            </div>
        </div>
    )
}

export default Home;