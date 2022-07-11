import { useRef, useContext, useCallback, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import RestructButton from './RestructButton';
import { DataContext } from '../context';

let selectedNodes = new Set();

function NestedGraph() {
    const fgRef = useRef();
    const { 
        data:{ graphData, isChangeNode },
        fn: { setCurrentParent, setCurrentChild, assignNewParent, setIsChangeNode } 
    } = useContext(DataContext);

    useEffect(() => {
        fgRef.current.d3Force('link').distance(link => link.source === 0 ? 70 : 30 );
    }, [])

    useEffect(() => {
        if (isChangeNode) 
            setCamera();
    }, [isChangeNode])

	const handleClick = useCallback((node, evt) => {

        if (node.type === "ITEM") {
            const untoggle = selectedNodes.has(node.id) && selectedNodes.size === 1;
            selectedNodes.clear();
            !untoggle && selectedNodes.add(node.id);
            
            setCurrentParent(node.parentId);
            setCurrentChild(node.id);
        }
        else {
            const untoggle = selectedNodes.has(node.id) && selectedNodes.size === 1;
            selectedNodes.clear();
            !untoggle && selectedNodes.add(node.id);
            setCurrentParent(node.id)
            setCurrentChild(null)
        }

        fgRef.current.refresh()
        console.log(node)

	}, [fgRef]);

    const handleChange = async (node, evt) => {
        if (node.type === "ITEM" || node.type === "ACCOUNT") {
            console.log("invalid node");
            setIsChangeNode(false);
            return;
        }

        await assignNewParent(node.id);
        fgRef.current.refresh();
        setIsChangeNode(false);
        return;
    }

    const setCamera = () => {
        // Aim at node from outside it
        const node = graphData.nodes.find(n => n.id === 1);
		const distance = 300;
		const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

		fgRef.current.cameraPosition(
			{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
			node, // lookAt ({ x, y, z })
			3000  // ms transition duration
		);
    }

    const disabledNodes = (node) => isChangeNode && (node.type === 'ITEM' || node.type === 'ACCOUNT');

    return (
        <div className="relative">
            <RestructButton />
            <ForceGraph3D 
                ref={fgRef}
                graphData={graphData}
                dagMode={"td"}
                dagLevelDistance={30}
                nodeVal={3.6}
                d3VelocityDecay={0.3}
                nodeLabel="name"
                nodeColor={node => selectedNodes.has(node.id) ? '#ffffff' : disabledNodes(node) ? '#888' : node.color}
                backgroundColor="#040e26"
                onNodeClick={isChangeNode ? handleChange : handleClick}
                width={window.innerWidth*0.66}
                height={window.innerHeight - 100}
            />
        </div>
    )
}

function InitGraph() {
    const { 
        data:{ graphData }
    } = useContext(DataContext);

    if (graphData === null) {
        return (
            <div className="text-center text-xl font-bold pt-10 text-gray-500">
                ...
            </div>
        )
    }

    return <NestedGraph />
}

export default InitGraph