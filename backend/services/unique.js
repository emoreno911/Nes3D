const { UniqueHelper } = require('../lib/unique');
const { Logger } = require('../lib/logger');
const { getNftTreeArray } = require('../lib/utils');
const { composeAndUpload } = require('./upload');

require('dotenv').config();

const operatorAddress = process.env.OPERATOR_ADDRESS;
const operatorSeed = process.env.OPERATOR_SEED;
const wsEndPoint = "wss://ws-rc.unique.network";

async function requestAccountBalance(addr) {
    try {
        const uniqueHelper = new UniqueHelper(new Logger());
        await uniqueHelper.connect(wsEndPoint);

        const balance = await uniqueHelper.getSubstrateAccountBalance(addr);
        console.log(`Balance for ${addr} is: ${balance}`);

        return {
            balance: balance.toString()
        }
    } catch (error) {
        console.log(error);
        return { balance: "req error" }
    }
}

async function requestNftInfo(collectionId, tokenId) {
    try {
        const uniqueHelper = new UniqueHelper(new Logger());
        await uniqueHelper.connect(wsEndPoint);

        const int = (n) => parseInt(n);
        const cid = int(collectionId);
        const tid = int(tokenId);
        const token = uniqueHelper.getCollectionTokenObject(cid, tid);
        const tokenInfo = await token.getData();

        return {
            tokenInfo
        }
    } catch (error) {
        console.log(error);
        return { tokenInfo: null }
    }
}

async function requestNftThree(collectionId) {
    try {
        const uniqueHelper = new UniqueHelper(new Logger());
        await uniqueHelper.connect(wsEndPoint);

        const cid = parseInt(collectionId);
        const parentToken = uniqueHelper.getCollectionTokenObject(cid, 1);
        const tokens = await getNftTreeArray(parentToken, uniqueHelper);

        return {
            tokens
        }
    } catch (error) {
        console.log(error);
        return { tokens: null }
    }
}

async function nestNftToken(collectionId, tokenId, newParentId, oldParentId) {
    const int = (n) => parseInt(n);
    const cid = int(collectionId);
    const tid = int(tokenId);
    const npid = int(newParentId);
    const opid = int(oldParentId);

    try {
        const uniqueHelper = new UniqueHelper(new Logger());
        await uniqueHelper.connect(wsEndPoint);

        const user = uniqueHelper.util.fromSeed(operatorSeed);
        const token = uniqueHelper.getCollectionTokenObject(cid, tid);
        const oldParent = uniqueHelper.getCollectionTokenObject(cid, opid);
        const newParent = uniqueHelper.getCollectionTokenObject(cid, npid);
        
        await uniqueHelper.unnestCollectionToken(
            user,
            token,
            oldParent,
            { Substrate: user.address }
        );

        await uniqueHelper.nestCollectionToken(
            user,
            token,
            newParent
        );

        return { code: 200, err: false };
    } catch (error) {
        console.log({error});
        return { code: 500, err: true };
    }
}

async function updateParentImage(childrenImgs) {   
    const images = JSON.parse(childrenImgs);
    const url = await composeAndUpload(images);

    if (url === null)
        return { code: 202, success: false };
    else
        return { code: 200, success: true, url };
}

async function setNftImage(collectionId, tokenId, props) {
    const uniqueHelper = new UniqueHelper(new Logger());
    await uniqueHelper.connect(wsEndPoint);

    const user = uniqueHelper.util.fromSeed(operatorSeed);

    try {
        await uniqueHelper.setNFTTokenProperties(
            user,
            collectionId,
            tokenId,
            props
        );
    
        console.log(`updated token properties: cid=${collectionId} tid=${tokenId}`);
        
        return true;
    } catch (err) {
        console.error(error);
        return false;
    }
}


module.exports = {
    requestNftInfo,
    updateParentImage,
    requestAccountBalance,    
    requestNftThree,
    nestNftToken
}