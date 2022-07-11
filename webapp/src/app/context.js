import React, { createContext, useState, useEffect } from 'react';
import {
	getNftThree,
	nestNftToken,
	getAccountBalance
} from './utils';

export const DataContext = createContext();

const DataContextProvider = (props) => { 
	const collectionId = 1219;
	const [graphData, setGraphData] = useState(null);
	const [currentParent, setCurrentParent] = useState(null);
	const [currentChild, setCurrentChild] = useState(null);
	const [isChangeNode, setIsChangeNode] = useState(false);
	const [showModalNft, setShowModalNft] = useState(false);
	const [loaderMessage, setLoaderMessage] = useState(null);
	const [modals, setModals] = useState([]);
    const [status, setStatus] = useState('');

	useEffect(() => {
		getBalance();
		getGraphData();
	}, [])

	const getBalance = async () => {
		const {address, balance} = await getAccountBalance("5F9GP5q3X8CPaHEHbffYURdDz6T1q6uEs1EHiysg9ek8DGWV");
		console.log(`Balance for ${address} is ${balance}`)
	}

	const getGraphData = async () => {
		setLoaderMessage("Getting nested data...");
		const { tokens } = await getNftThree(collectionId);
		const data = formatGraphData(tokens);
		setGraphData(data);
		setLoaderMessage(null);
		console.log(data);
	}

	const assignNewParent = async (newParentId) => {
		if (newParentId === currentParent) {
			return;
		}

		setLoaderMessage("Updating tree structure...");
		const dataUpdated = await nestNftToken({
			collectionId,
			newParentId,
			tokenId: currentChild,
			oldParentId: currentParent
		});
		console.log('done!')

		const data = formatGraphData(dataUpdated.tokens);
		setGraphData(data);
		setLoaderMessage(null);
		return true;
	}

	const formatGraphData = (data) => {
		const nodes = data.map(({ tokenId, parentId, properties }) => ({ id: tokenId, parentId, ...properties }));
		const links = data.filter(t => t.parentId !== null).map(({ tokenId, parentId }) => ({ source: parentId, target: tokenId }));

		return { nodes, links };
	}

	const closeModal = (id) => {
		setModals(modal => {
			const update = modal.filter(m => m.id !== id);
			return update;
		})
	}

    const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	const data = {
		status,
		modals,
		graphData,
		collectionId,
		currentParent,
		currentChild,
		isChangeNode,
		loaderMessage,
		showModalNft
	}

	const fn = {
		isMobile,
		setModals,
		setCurrentChild,
		setCurrentParent,
		setIsChangeNode,
		assignNewParent,
		setLoaderMessage,
		setShowModalNft,
		closeModal
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;