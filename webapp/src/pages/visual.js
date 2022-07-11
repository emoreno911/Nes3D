import { useParams } from "react-router-dom";
import Header from "../app/layout/Header";
import NestedGraph from "../app/vizz/NestedGraph";
import DetailView from "../app/vizz/DetailView";
import Loader from "../app/vizz/Loader";
import ModalNftDetail from "../app/vizz/ModalNftDetail";

function Visual() {
    const { tokenId } = useParams();
    
    return (
        <div className="h-screen">
            <Header />
            <div className="w-full flex flex-wrap">
                <div className="w-full md:w-4/6 relative pt-20 px-3">
                    <NestedGraph />
                </div>
                <div className="w-full md:w-2/6 overflow-hidden" style={{height: "calc(100vh - 25px)"}}>
                    <div className="pt-10 pb-5 pl-8 pr-3">
                        <h3 className="text-lg mb-3">Elements View</h3>
                        <DetailView />
                    </div>
                </div>
            </div>
            <Loader />
            <ModalNftDetail />
        </div>
    )
}

export default Visual;