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
    const [data, setData] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const { 
        data:{ currentChild, currentParent, collectionId, graphData, showModalNft },
        fn: { setShowModalNft }	 
	} = useContext(DataContext);

    let current = true;

    useEffect(() => {
        if (showModalNft) {
            getNftData();
        }
    }, [showModalNft])

    const getNftData = async () => {
        setIsProcessing(true);
        const tokenId = currentChild || currentParent;
        const { tokenInfo } = await getNftInfo({ collectionId, tokenId });
        
        if (!tokenInfo) {
            setIsProcessing(false);
            return;
        }

        const props = {};
        tokenInfo.properties.forEach(({key, value}) => {
            props[key] = value;
        });

        const data = {
            owner: JSON.stringify(tokenInfo.owner),
            properties: props,
            name: props.name,
            image: props.image.indexOf('http') === -1 ? `https://${props.image}` : props.image
        }

        setData(data);
        setIsProcessing(false);        
    }

    
    if (graphData === null || current === null) {
        return <div>no item</div>
    }
    
	return (
		<Modal
            show={showModalNft}
            handleShow={setShowModalNft}
			activator={({ handleShow }) => (<></>)}
		>
			{
                isProcessing ?
                (
                    <div className="bg-darkmode pt-4 pb-8 px-8 rounded-md text-white text-center">
                        <h4 className="text-sm mt-10 mb-6">Getting NFT data...</h4>
                    </div>
                ) :
                (
                    <div className="bg-darkmode pt-4 pb-8 px-8 rounded-md text-white">
                        <h4 className=" text-lg mb-6">NFT Details</h4>
                        <div className="flex">
                            <div className="">
                                {/* <img src={data.image} className="modalpic rounded-lg mr-5" /> */}
                                <ImageWithFallback 
                                    src={data.image}
                                    fallback="/no-image.png"
                                    className="modalpic rounded-lg mr-5"
                                />
                            </div>
                            <div className="w-2/3 sm:w-4/5">
                                <div className="mb-2">Name: <span className="text-gray-400">{data.name}</span></div>
                                <div className="mb-2">Collection ID: <span className="text-gray-400">{collectionId}</span></div>
                                <div className="mb-2">Owner: <pre className="codeblock">{data.owner}</pre></div>
                                <div>Properties</div>
                                <code>
                                    <pre className="codeblock">
                                        {JSON.stringify(data.properties, null, 4)}
                                    </pre>
                                </code>
                            </div>                    
                        </div>
                    </div>
                )
            }
		</Modal>
	)
}

export default ModalNftDetail