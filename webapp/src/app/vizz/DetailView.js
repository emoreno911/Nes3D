import { useContext, useState } from 'react';
import ScrollContainer from './ScrollContainer';
import { DataContext } from '../context';

function ImageWithFallback({ fallback, src, ...props }) {
    const [imgSrc, setImgSrc] = useState(src);
    const onError = () => setImgSrc(fallback);
  
    return <img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />;
}

function Item({data, current, onClick}) {
    const { id, name, type, category, image } = data;
    const img = image.indexOf('http') === -1 ? `https://${image}` : image;
    const selected = current === id ? "item-selected" : "";
    return (
        <div className={`w-1/4 mb-5 cursor-pointer ${selected}`} onClick={onClick}>
            <p className='text-center mb-3'>{name}</p>
            <div className="p-3">
                <ImageWithFallback 
                    src={img}
                    fallback="/no-image.png"
                    className="w-full"
                />
            </div>
        </div>
    )
}

function DetailView() {
    const { 
        data:{ graphData, currentParent, currentChild },
        fn: { setCurrentChild, updateNftImage, setShowModalNft }
    } = useContext(DataContext);

    if (currentParent === null) {
        return (
            <div className="text-center text-xl font-bold pt-10 text-gray-500">
                No Item Selected
            </div>
        )       
    }

    const parent = graphData.nodes.find(n => n.id === currentParent);
    const children = graphData.links.filter(l => l.source.id === currentParent);
    const items = children.map(l => graphData.nodes.find(n => n.id === l.target.id));

    const handleImageSelected = (id, type) => {
            setCurrentChild(id);
    }

    return (
        <>
            <div className="flex justify-between border-b-2">
                <h4 className="text-3xl border-b-0">{parent.name}</h4>
                {/* <button className="bg-green-500 font-semibold py-1 px-5" onClick={() => updateNftImage(3)}>TEST</button> */}
                <button className="bg-blue-unique font-semibold py-1 px-5" onClick={() => setShowModalNft(true)}>Details</button>
            </div>
            <ScrollContainer style={{height: 'calc(100vh - 120px)'}}>
                <div className='w-full flex flex-wrap py-5'>
                    {
                        items.map(n => 
                            <Item 
                                key={n.id} 
                                data={n} 
                                current={currentChild}
                                onClick={() => handleImageSelected(n.id, n.type)} 
                            />
                        )
                    }
                </div>
            </ScrollContainer>
        </>
    )
}

export default DetailView