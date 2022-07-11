import { useState, useEffect, useContext } from "react";
import Modal from "../layout/Modal"

const ModalAbout = () => {
    const [isShow, setIsShow] = useState(false);

    
	return (
		<Modal
            show={isShow}
            handleShow={setIsShow}
			activator={({ handleShow }) => (
                <button 
                    className="block bg-darkmode uppercase font-bold text-lg py-3 w-full"
                    onClick={() => handleShow(true)}
                >
                    About Nes3D
                </button>
            )}
		>
			<div className="bg-darkmode pt-4 pb-8 px-8 rounded-md text-white">
				<h4 className=" text-lg mb-6 font-semibold">About Nes3D</h4>
                <div className="text-sm">
<h5 className="font-semibold mt-5">What is Nested NFT?</h5>
<p>It is the ability of an NFT to contain another NFT. Here the owner does not have to be an external account or smart contract but can be the NFT itself and can be configured with special conditions. </p>

<h5 className="font-semibold mt-5">Functionality examples</h5>
<p>In the area of video games we have a main account (Joe's Account) that represents the father NFT and from it we get game related features such as: Avatar, backpack, weapons, etc. This would be the NFTs children.</p>
<p className="mt-5">In music we visualize it in the purchase of an artist's full album (NFT parent) which in turn brings a package with exclusive content, digital posters, digital concert tickets and other assets (NFT's children).</p>

<h5 className="font-semibold mt-5">What is Nes3D?</h5>
<p>Nes3D is a tool that allows users to visualize and interact with nested NFTs in a comprehensive and easy way</p>


<h5 className="font-semibold mt-5">Who are we?</h5>
<p>We're a small and dynamic team who likes to make cool things for Web2 and Web3. Miss Brightside is the Marketing Strategist, she uses the power of the lightning to put together awesome investigations and content. Her cat thinks she's a God. 
Mr. Robot is the Software Developer, he codes stunning and usable webapps. He trades to make life changing money but has to code to survive his trading. Together they bring projects to life</p>

                                   
                </div>
			</div>
		</Modal>
	)
}

export default ModalAbout