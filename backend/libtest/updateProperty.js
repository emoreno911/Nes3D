const { UniqueHelper } = require('../lib/unique');
const { Logger } = require('../lib/logger');

require('dotenv').config();

const wsEndPoint = "wss://ws-rc.unique.network";

const main = async () => {
    const uniqueHelper = new UniqueHelper(new Logger());
    await uniqueHelper.connect(wsEndPoint);

    const user = uniqueHelper.util.fromSeed(process.env.OPERATOR_SEED);
    const collectionId = 1219;
    const tokenId = 1;

    await uniqueHelper.setNFTTokenProperties(
        user,
        collectionId,
        tokenId,
        [
            {
                key: 'image',
                value: "newimagehere"
            },
        ]
    );

    console.log(`
        updated token properties: ${await getTokenPropertiesStr(collectionId, tokenId, uniqueHelper)}
    `);
}

const getTokenPropertiesStr = async (cid, tid, uniqueHelper) => {
    const token = uniqueHelper.getCollectionTokenObject(cid, tid);
    const tokenData = await token.getData();
    const properties = tokenData.properties;

    return JSON.stringify(properties, null, 4);
}

main()