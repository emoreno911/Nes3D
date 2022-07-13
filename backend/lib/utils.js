const getNftTreeArray = async (parentToken, uniqueHelper) => {
    let threeArray = [];
    const r = await buildNftTreeArray(threeArray, parentToken, uniqueHelper);
    const result = threeArray.map(({ tokenId, parentId, properties }) => {
        const obj = {};
        properties.forEach(p => {
            const [k, v] = p.split(':');
            obj[k] = v;
        })
        return { tokenId, parentId, properties: obj }
    })

    threeArray = [];
    return result;
}

const buildNftTreeArray = async (threeArray, token, uniqueHelper, parentId = null) => {
    const collectionId = token.collectionId;

    const tokenAddress = uniqueHelper.util.getNestingTokenAddress(
        collectionId,
        token.tokenId
    );

    const children = (await uniqueHelper.getCollectionTokensByAddress(
        collectionId, { Ethereum: tokenAddress }
    )).map(childId => uniqueHelper.getCollectionTokenObject(collectionId, childId));
   
    const tokenId = token.tokenId;

    const tokenNodes = await Promise.all(
        children.map(async (childToken) => await buildNftTreeArray(threeArray, childToken, uniqueHelper, tokenId))
    );

    const propertyNodes = 
        (await token.getData()).properties.map(property => `${property.key}:${property.value}`);

    const obj = { tokenId, parentId, properties: propertyNodes };
    threeArray.push(obj);

    return true;
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

module.exports = {
    renderNftTreeImpl,
    getNftTreeArray
}