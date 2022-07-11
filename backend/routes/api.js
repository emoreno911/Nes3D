const express = require('express');
const { 
    requestNftInfo,
    requestAccountBalance,
    requestNftThree,
    nestNftToken
} = require('../services/unique');

const router = express.Router();

router.post('/getAccountBalance', async (request, response) => {
	const { address } = request.body;
    const result = await requestAccountBalance(address);
    response.json({address, ...result});
});

router.post('/getNftInfo', async (request, response) => {
	const { collectionId, tokenId } = request.body;
    const result = await requestNftInfo(collectionId, tokenId);
    response.json({...result});
});

router.post('/getNftThree', async (request, response) => {
	const { collectionId } = request.body;
    const result = await requestNftThree(collectionId);
    response.json({collectionId, ...result});
});

router.post('/nestToken', async (request, response) => {
	const { collectionId, tokenId, newParentId, oldParentId } = request.body;
    const result = await nestNftToken(collectionId, tokenId, newParentId, oldParentId);
    response.json({...result});
});

module.exports = router