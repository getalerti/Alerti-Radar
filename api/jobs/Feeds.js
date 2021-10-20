const elasticSearchClient = require('./../helpers/db');
const { createAccountContent } = require("./../helpers/utils")
const generateFeeds = async () => {
    try {
        const queryByID = {
            index: 'accounts',
        }
        const accounts = await elasticSearchClient.search(queryByID);
        const accountsResult = accounts && accounts.hits && accounts.hits.hits && accounts.hits.hits.length ? accounts.hits.hits : [];
        for (let i = 0; i < accountsResult.length; i++) {
            const account = accountsResult[i];
            const accountId = account._id;
            await createAccountContent(accountId, account.feeds);
        }
    } catch (e) {
        console.log({ jobGenerateFeeds: e })
    }
}
module.exports = {
    generateFeeds
}