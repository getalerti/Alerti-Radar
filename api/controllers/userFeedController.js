const { validationResult }      = require('express-validator');
const elasticSearchClient       = require('./../helpers/db');
const Account                   = require('../classes/Account');
const Feed                      = require('../classes/Feed');
const {
    createAccountContent,
    getFeedTitle
}                               = require('../helpers/utils');
const fs                        = require('fs');
const { TechnicalError }        = require('../errors/TechnicalError');
const { InvalidAccountData }    = require('../errors/AccountError');
const defaultResponse           = require('../responses/defaultResponse');

const checkValidation = (req, res) => {
    try {
        validationResult(req).throw();
    } catch (_) {
        defaultResponse(
            res,
            false,
            InvalidAccountData,
            null,
            InvalidAccountData.code
        );
    }
}
const addRemoveFeed = async (req, res) => {
    try {
        checkValidation(req, res);
        let userId = req.user;
        const { type, data, action } = req.body;
        const name = await getFeedTitle(data);
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const account = new Account(user._source)
            account.id = userId;
            account.feeds = user._source.feeds;
            if (action) {
                account.addFeed(new Feed(name, data, "", type === "podcast" ? "podcast" : "rss"));
            }
            if (!action && req.body.idFeed) {
                account.removeFeed(req.body.idFeed)
            }

            const queryUpdate = {
                index: 'accounts',
                id: `${userId}`,
                body: {
                    doc: account.sanitizedAccountToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return defaultResponse(
                res,
                true,
                null,
                [],
                200
            );
        }
        return defaultResponse(
            res,
            false,
            TechnicalError,
            null,
            TechnicalError.code
        );
    } catch (e) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }

}

const updateFeedFolder = async (req, res) => {
    try {
        checkValidation(req, res);
        let userId = req.user;
        const { feedId, folderId } = req.body;
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const account = new Account(user._source)
            account.id = userId;
            account.feeds = user._source.feeds;
            account.changeFeedFolder(feedId, folderId);

            const queryUpdate = {
                index: 'accounts',
                id: `${userId}`,
                body: {
                    doc: account.sanitizedAccountToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return defaultResponse(
                res,
                true,
                null,
                [],
                200
            );
        }
        return defaultResponse(
            res,
            false,
            TechnicalError,
            null,
            TechnicalError.code
        );
    } catch (e) {
        console.log({error: e});
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }
}

// generate feeds content for a user
const generateFeeds = async (req, res) => {
    try {
        checkValidation(req, res);
        let userId = req.user;
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            await createAccountContent(userId, user._source.feeds);
            return defaultResponse(
                res,
                true,
                null,
                [],
                200
            );
        }
    } catch (e) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }
}

// get feeds content for a user
const getFeeds = async (req, res) => {
    checkValidation(req, res);
    try {
        let userId = req.user;
        const fileExists = await fs.existsSync(`./.cache/${userId}`);
        if (fileExists) {
            const feed = await fs.readFileSync(`./.cache/${userId}`);
            return defaultResponse(
                res,
                true,
                null,
                JSON.parse(feed),
                200
            );
        } else {
            const queryByID = {
                index: 'accounts',
                id: `${userId}`
            }
            const user = await elasticSearchClient.get(queryByID);
            if (user && user._source) {
                await createAccountContent(userId, user._source.feeds);
                const feed = await fs.readFileSync(`./.cache/${userId}`);
                return defaultResponse(
                    res,
                    true,
                    null,
                    feed,
                    200
                );
            }
        }
    } catch (e) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }
}
const getSavedItems = async (req, res) => {
    checkValidation(req, res);
    try {
        let userId = req.user;
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const items = user._source.savedItems || [];
            return defaultResponse(
                res,
                true,
                null,
                [],
                200
            );
        }
    } catch (e) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }
}
const saveFeedItem = async (req, res) => {
    checkValidation(req, res);
    try {
        let userId = req.user;
        const { item } = req.body;
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const account = new Account(user._source)
            account.id = userId;
            account.saveItem({...item, saved: true})

            const queryUpdate = {
                index: 'accounts',
                id: `${userId}`,
                body: {
                    doc: account.sanitizedAccountToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return defaultResponse(
                res,
                true,
                null,
                [],
                200
            );
        }
        return defaultResponse(
            res,
            false,
            TechnicalError,
            null,
            TechnicalError.code
        );
    } catch (e) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }
}
const deleteSavedFeedItem = async (req, res) => {
    checkValidation(req, res);
    try {
        let userId = req.user;
        const { item } = req.body;
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const account = new Account(user._source)
            account.id = userId;
            account.removeItem(item)

            const queryUpdate = {
                index: 'accounts',
                id: `${userId}`,
                body: {
                    doc: account.sanitizedAccountToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return defaultResponse(
                res,
                true,
                null,
                [],
                200
            );
        }
        return defaultResponse(
            res,
            false,
            TechnicalError,
            null,
            TechnicalError.code
        );
    } catch (e) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }
}
const following = async (req, res) => {
    checkValidation(req, res);
    try {
        let userId = req.user;
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            return defaultResponse(
                res,
                true,
                null,
                user._source.feeds,
                200
            );
        }
    } catch (e) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            e,
            TechnicalError.code
        );
    }
}

module.exports =  {
    addRemoveFeed,
    generateFeeds,
    getFeeds,
    following,
    saveFeedItem,
    getSavedItems,
    deleteSavedFeedItem,
    updateFeedFolder
}