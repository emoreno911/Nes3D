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
    const parentOwner = user.address;

    // Create new collection
    const collection = await createSampleCollection(
        user,
        [
            {
                key: 'name',
                permission: { mutable: false, collectionAdmin: true, tokenOwner: false }
            },
            {
                key: 'image',
                permission: { mutable: true, collectionAdmin: true, tokenOwner: false }
            },
            {
                key: 'type',
                permission: { mutable: false, collectionAdmin: true, tokenOwner: false }
            },
            {
                key: 'category',
                permission: { mutable: false, collectionAdmin: true, tokenOwner: false }
            },
            {
                key: 'color',
                permission: { mutable: true, collectionAdmin: true, tokenOwner: false }
            }
        ],
        uniqueHelper
    );

    // base data for a new collection
    const tokensMetadata = getData();
    const collectionId = collection.collectionId;

    const parentToken = await mintSampleToken(
        user, 
        parentOwner, 
        collectionId,
        formatMetadata(tokensMetadata[0]),
        uniqueHelper
    );

    const parentTokenAddress = uniqueHelper.util.getNestingTokenAddress(
        collectionId,
        parentToken.tokenId
    );

    // Add children into parentToken
    const ownerAddr = {Ethereum: parentTokenAddress};
    const children = [
        await mintSampleToken(user, ownerAddr, collectionId, formatMetadata(tokensMetadata[1]), uniqueHelper),
        await mintSampleToken(user, ownerAddr, collectionId, formatMetadata(tokensMetadata[2]), uniqueHelper),
        await mintSampleToken(user, ownerAddr, collectionId, formatMetadata(tokensMetadata[3]), uniqueHelper)
    ];

    console.log('Done!')
}

const createSampleCollection = async (signer, tokenPropertyPermissions, uniqueHelper) => {
    let collectionInfo = {
        name: 'nes3d-example',
        description: 'A collection to test token nesting in Nes3D',
        tokenPrefix: 'NESD',

        // We need to enable nesting. It is disabled by default.
        permissions: {
            nesting: {
                tokenOwner: true
            }
        },

        tokenPropertyPermissions,
    };

    const collection = await uniqueHelper.mintNFTCollection(signer, collectionInfo);
    console.log(`collection #${collection.collectionId} is created`);

    return collection;
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

// run script
main();