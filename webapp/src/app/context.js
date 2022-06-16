import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const DataContextProvider = (props) => { 
    const [status, setStatus] = useState('');

    const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	const data = {
		status
	}

	const fn = {
		isMobile
	}

	return (
		<DataContext.Provider value={{ data, fn }}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataContextProvider;