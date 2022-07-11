import { useState, useEffect, useContext } from "react";
import Modal from "../layout/Modal"
import { DataContext } from "../context";
import { getNftInfo } from "../utils";

function ImageWithFallback({ fallback, src, ...props }) {
    const [imgSrc, setImgSrc] = useState(src);
    const onError = () => setImgSrc(fallback);
  
    return <img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />;
}

const ModalNftDetail = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const { 
        data:{ currentChild, currentParent, collectionId, graphData, showModalNft },
        fn: { setShowModalNft }	 
	} = useContext(DataContext);

    let current = currentChild || currentParent || null;

    if (graphData === null || current === null) {
        return <></>
    }
    
    const owner = "5F9GP5q3X8CPaHEHbffYURdDz6T1q6uEs1EHiysg9ek8DGWV";
    const token = graphData.nodes.find(t => t.id === current);
    const { tokenId, parentId, name, type, category, image, color } = token;
    const properties = { tokenId, name, type, category, color, image };
    const img = image.indexOf('http') === -1 ? `https://${image}` : image;
    
	return (
		<Modal
            show={showModalNft}
            handleShow={setShowModalNft}
			activator={({ handleShow }) => (<></>)}
		>
			<div className="bg-darkmode pt-4 pb-8 px-8 rounded-md text-white">
				<h4 className=" text-lg mb-6">NFT Details</h4>
                <div className="flex">
                    <div className="">
                        <img src={img} className="modalpic rounded-lg mr-5" />
                    </div>
                    <div className="w-2/3 sm:w-4/5">
                        <div className="mb-2">Name: <span className="text-gray-400">{name}</span></div>
                        <div className="mb-2">Collection ID: <span className="text-gray-400">{collectionId}</span></div>
                        <div className="mb-2">Owner: <pre className="codeblock">{owner}</pre></div>
                        <div>Properties</div>
                        <code>
                            <pre className="codeblock">
                                {JSON.stringify(properties, null, 4)}
                            </pre>
                        </code>
                    </div>                    
                </div>
			</div>
		</Modal>
	)
}

export default ModalNftDetail