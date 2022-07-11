const { UniqueHelper } = require('../lib/unique');
const { Logger } = require('../lib/logger');
const { getNftTreeArray } = require('../lib/utils');

require('dotenv').config();

const operatorAddress = process.env.OPERATOR_ADDRESS;
const operatorSeed = process.env.OPERATOR_SEED;
const wsEndPoint = "wss://ws-rc.unique.network";

async function requestAccountBalance(addr) {
    const uniqueHelper = new UniqueHelper(new Logger());
    await uniqueHelper.connect(wsEndPoint);

    const balance = await uniqueHelper.getSubstrateAccountBalance(addr);
    console.log(`Balance for ${addr} is: ${balance}`);

    return {
        balance: balance.toString()
    }
}

async function requestNftInfo(collectionId, tokenId) {
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

module.exports = {
    requestNftInfo,
    requestAccountBalance,
    requestNftThree,
    nestNftToken
}