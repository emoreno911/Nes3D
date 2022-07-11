import axios from "axios";

export const appMetadata = {
	name: "Nes3D",
    description: "An interactive visualization for nested NFTs on the UNIQUE Network",
    icon: "https://res.cloudinary.com/dy3hbcg2h/image/upload/v1652131690/dz-logo-black_c86gzb.png"
}

export const backendBaseURL = (window.location.hostname === 'localhost') ? "http://localhost:5000" : process.env.REACT_APP_BACKEND_1;

export const request = async ({url, fname, method = 'GET', data = null, _baseURL = null}) => {
	const instance = axios.create();
	const baseURL = _baseURL || backendBaseURL;
	return instance.request({
		baseURL,
		url,
		method,
		data
	})
	.then(response => response.data)
	.catch(err => {
		const { message, response:{data, status} } = err;
		console.log(`request error in %c ${fname}`, 'font-weight:900');
		console.log(message);
		return { err: true, errmsg: message, ...data };
	})
}

export async function getAccountBalance(address) {
    const response = await request({
        _baseURL: backendBaseURL,
        url: `/getAccountBalance`,
        method: 'POST',
        fname: 'getAccountBalance',
        data: {address},
    });

    return response;
}

export async function getNftInfo(data) {
    const response = await request({
        _baseURL: backendBaseURL,
        url: `/getNftInfo`,
        method: 'POST',
        fname: 'getNftInfo',
        data,
    });

    return response;
}

export async function getNftThree(collectionId) {
    const response = await request({
        _baseURL: backendBaseURL,
        url: `/getNftThree`,
        method: 'POST',
        fname: 'getNftThree',
        data: {collectionId},
    });

    return response;
}

export async function nestNftToken(data) {
    const response = await request({
        _baseURL: (window.location.hostname === 'localhost') ? "http://localhost:5000" : process.env.REACT_APP_BACKEND_2,
        url: `/nestToken`,
        method: 'POST',
        fname: 'nestNftToken',
        data,
    });

    return response;
}