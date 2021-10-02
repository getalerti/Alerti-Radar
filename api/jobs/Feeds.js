const elasticSearchClient = require('./../config/db');
const { createUserContent } = require("./../utils")
export const generateFeeds = async () => {
    try {
        let userId = req.user;
        if (userId.sub) {
            userId = userId.id;
        }
        const queryByID = {
            index: 'users',
        }
        const users = await elasticSearchClient.search(queryByID);
        const usersResult = users && users.hits && users.hits.hits && users.hits.hits.length ? users.hits.hits : [];
        for (let i = 0; i < usersResult.length; i++) {
            const user = usersResult[i];
            const userId = user._id;
            await createUserContent(userId, user.feeds);
        }
    } catch (e) {
        console.log({ jobGenerateFeeds: e })
    }
}