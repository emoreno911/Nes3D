import React, { useRef, useState, useEffect } from 'react';
import ScrollContainer from './ScrollContainer';

function renderLink(str) {
	const isLink = str.startsWith('http');
	if (isLink)
		return <p className="infolink"><a href={str} target="_blank">Ver Articulo</a></p>
	else
		return <p>{str}</p>
}

function renderImage(src) {
	const style = { width: '100%' }
	return <img src={src} style={style} />
}

function Modal({ node, closeModal }) {
	const { id, name, title, type, texto, url, img } = node ? node : {};
	const [height, setHeight] = useState('auto');
	const refModal = useRef();

	// set a static height based on content for infomodal
	useEffect(() => {
		const compStyle = window.getComputedStyle(refModal.current);
		const mHeight = compStyle.getPropertyValue('height');
		if (parseInt(mHeight.replace('px')) > 400)
			setHeight(h => '350px');
		else
			setHeight(h => 'auto');
	}, [refModal])

	return (
		<div className="infomodal" style={{height: height}}>
			<div className="close" onClick={() => closeModal(id)}>X</div>
			<div ref={refModal} style={{height: '100%'}}>
				<b>{title}</b>
				<ScrollContainer style={{height: 'calc(100% - 30px)'}}>
					{ img && renderImage(img) }
					{ texto && renderLink(texto) }
					{ url && renderLink(url) }
				</ScrollContainer>
			</div>
		</div>
	);
}

export default Modal