const { getUsage } = require('../lib/cli');
const { UniqueHelper } = require('../lib/unique');
const { Logger } = require('../lib/logger');
const { getData } = require('./data');

require('dotenv').config();

const wsEndPoint = "wss://ws-rc.unique.network";

// creates a demo collection on unique network
const main = async () => {
    const uniqueHelper = new UniqueHelper(new Logger());
    await uniqueHelper.connect(wsEndPoint);

    const user = uniqueHelper.util.fromSeed(process.env.OPERATOR_SEED);

    // Add grandchildren into children
    const items = getData();
    collectionId = 1221;
    const childAddr = [
        uniqueHelper.util.getNestingTokenAddress(collectionId, 2),
        uniqueHelper.util.getNestingTokenAddress(collectionId, 3),
        uniqueHelper.util.getNestingTokenAddress(collectionId, 4)
    ];
    
    // chest
    await mintSampleToken(user, setTokenOwner(childAddr, items[4]), collectionId, formatMetadata(items[4]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[5]), collectionId, formatMetadata(items[5]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[6]), collectionId, formatMetadata(items[6]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[7]), collectionId, formatMetadata(items[7]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[8]), collectionId, formatMetadata(items[8]), uniqueHelper);

    // helmet
    await mintSampleToken(user, setTokenOwner(childAddr, items[9]), collectionId, formatMetadata(items[9]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[10]), collectionId, formatMetadata(items[10]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[11]), collectionId, formatMetadata(items[11]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[12]), collectionId, formatMetadata(items[12]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[13]), collectionId, formatMetadata(items[13]), uniqueHelper);

    //legs
    await mintSampleToken(user, setTokenOwner(childAddr, items[14]), collectionId, formatMetadata(items[14]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[15]), collectionId, formatMetadata(items[15]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[16]), collectionId, formatMetadata(items[16]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[17]), collectionId, formatMetadata(items[17]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[18]), collectionId, formatMetadata(items[18]), uniqueHelper);

    // shoes
    await mintSampleToken(user, setTokenOwner(childAddr, items[19]), collectionId, formatMetadata(items[19]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[20]), collectionId, formatMetadata(items[20]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[21]), collectionId, formatMetadata(items[21]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[22]), collectionId, formatMetadata(items[22]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[23]), collectionId, formatMetadata(items[23]), uniqueHelper);

    // sword
    await mintSampleToken(user, setTokenOwner(childAddr, items[24]), collectionId, formatMetadata(items[24]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[25]), collectionId, formatMetadata(items[25]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[26]), collectionId, formatMetadata(items[26]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[27]), collectionId, formatMetadata(items[27]), uniqueHelper);
    await mintSampleToken(user, setTokenOwner(childAddr, items[28]), collectionId, formatMetadata(items[28]), uniqueHelper);

    console.log('Done!')
}

const mintSampleToken = async (signer, owner, collectionId, properties, uniqueHelper) => {
    const token = await uniqueHelper.mintNFTToken(signer, {
        collectionId,
        owner,
        properties,
    });

    console.log(`Token #${token.tokenId} is created in collection #${collectionId}`);

    return token;
}

const formatMetadata = (item) => {
    return Object.keys(item).map(k => ({
        key: k,
        value: item[k]
    }))
}

// for grandchildren, armor 2 goes to Warrior1 and armor 4 goes to Warrior2
const setTokenOwner = (childAddr, item) => {
    const ownerAddr = 
        item.name.indexOf('2') !== -1 ? childAddr[1] : 
        item.name.indexOf('4') !== -1 ? childAddr[2] : childAddr[0];

    return {
        Ethereum: ownerAddr
    }
}

// run script
main();