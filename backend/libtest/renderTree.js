const { getUsage } = require('../lib/cli');
const { UniqueHelper } = require('../lib/unique');
const { Logger } = require('../lib/logger');

var archy = require('archy');

const wsEndPoint = "wss://ws-rc.unique.network";

// This playground demonstrates how can you render an NFT tree with properties
const main = async () => { 
    const uniqueHelper = new UniqueHelper(new Logger());
    await uniqueHelper.connect(wsEndPoint);

    let parentToken = uniqueHelper.getCollectionTokenObject(1220, 1);

    let rendered = await renderNftTree(parentToken, uniqueHelper);
    console.log(rendered);
}

const renderNftTree = async (token, uniqueHelper) => {
    return archy(await renderNftTreeImpl(token, uniqueHelper));
}

const renderNftTreeImpl = async (token, uniqueHelper) => {
    const collectionId = token.collectionId;

    const tokenAddress = uniqueHelper.util.getNestingTokenAddress(
        collectionId,
        token.tokenId
    );

    const children = (await uniqueHelper.getCollectionTokensByAddress(
        collectionId, { Ethereum: tokenAddress }
    )).map(childId => uniqueHelper.getCollectionTokenObject(collectionId, childId));

    const tokenLabel = `<token: collection=${collectionId}, id=${token.tokenId}>`;

    const tokenNodes = await Promise.all(
        children.map(async (childToken) => await renderNftTreeImpl(childToken, uniqueHelper))
    );

    const propertyNodes = (await token.getData()).properties
        .map(property => `${property.key}: ${property.value}`);

    const nodes = propertyNodes.concat(tokenNodes);

    if (nodes.length === 0) {
        return tokenLabel;
    } else {
        return {
            label: tokenLabel,
            nodes
        };
    }
}

// run script
main();