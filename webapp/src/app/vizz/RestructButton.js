import { useContext, useEffect } from 'react';
import { DataContext } from '../context';

const nodeColors = {
    "CHEST": "#ffc107",
    "HELMET": "#ec407a",
    "LEGS": "#ff5722",
    "SHOES": "#9c27b0",
    "SWORD": "#2196f3" ,  
    "AVATAR": "#00ff00" , 
    "STORE": "#00ff00",
    "ACCOUNT": "#ffff00"   
}

const MoveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
)

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
)

function RestructButton() {
    const { 
        data:{ graphData, currentChild, isChangeNode },
        fn: { setIsChangeNode }
    } = useContext(DataContext);

    let isItem = false;
    
    if (graphData && currentChild) {
        isItem = graphData.nodes.find(n => n.id === currentChild).type === "ITEM";
    }

    return (
        <div className="change-node-text"> 
        {
            isChangeNode && (
                <button 
                    className="bg-blue-500 bg-opacity-30 uppercase font-semibold text-sm py-2 px-5 flex items-center rounded-sm"
                >
                    <InfoIcon /> 
                    <span className="ml-2">Now select a new parent</span>
                </button>
            )
        }
        {
            isItem && !isChangeNode && (
                <button 
                    className="bg-blue-unique uppercase font-bold text-sm py-2 px-5 flex items-center rounded-sm"
                    onClick={() => setIsChangeNode(true)}
                >
                    <MoveIcon /> 
                    <span className="ml-2">Move Selected Item</span>
                </button>
            )
        }
            <div className="mt-3">
                {
                    Object.keys(nodeColors).map(k => (
                        <div key={k} className="flex items-center mb-2">
                            <div className="w-4 h-4 mr-2 rounded-sm" style={{background: nodeColors[k]}}></div>
                            <span className="text-sm">{k}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RestructButton