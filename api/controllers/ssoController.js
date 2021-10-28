const { validationResult }      = require('express-validator');
const elasticSearchClient       = require('./../helpers/db');
const Account                   = require('../classes/Account');
const {
    generateAccessToken,
    genID,
    USER_COLLECTION_PREF_ID
}                               = require('../helpers/utils');
const { TechnicalError }        = require('../errors/TechnicalError');
const { InvalidAccountData }    = require('../errors/AccountError');
const defaultResponse           = require('../responses/defaultResponse');

module.exports =  async (req, res) => {
    try {
        try {
            validationResult(req).throw();
        } catch (_) {
            return defaultResponse(
                res,
                false,
                InvalidAccountData,
                null,
                InvalidAccountData.code
            );
        }
        let { email, name, picture, sub, listTopics } = req.body;
        sub = sub.replace("|", "_")
        const queryByAccountname = {
            index: 'accounts',
            q: `email:"${email}"`
        }
        const resByEmail = await elasticSearchClient.search(queryByAccountname);
        if (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length > 0) {
            const account = new Account(resByEmail.hits.hits[0]._source);
            account.sub = sub;
            account.picture = picture;
            if (!account.feeds.length || account.feeds.length === 0) {
                account.interests = listTopics;
                account.interestsToFeeds();
            }
            account.name = name;
            account._id = resByEmail.hits.hits[0]._id;
            account.jwt = generateAccessToken(JSON.stringify({ id: account._id, email, sub }));
            const queryUpdate = {
                index: 'accounts',
                id: `${account._id}`,
                body: {
                    doc: account.sanitizedAccountToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return defaultResponse(
                res,
                true,
                null,
                { ...account.sanitizedAccount },
                200
            );
        } else {
            const account = new Account({ email, name, picture, sub });
            const id = genID(USER_COLLECTION_PREF_ID);
            if (account.feeds.length === 0) {
                account.interests = listTopics;
                account.interestsToFeeds();
            }
            account.jwt = generateAccessToken(JSON.stringify({ id, email, sub }));
            account.interestsToFeeds();
            const addQuery = {
                index: "accounts",
                id,
                body: {
                    ...account
                }
            }
            await elasticSearchClient.index(addQuery);
            return defaultResponse(
                res,
                true,
                null,
                { ...account.sanitizedAccount },
                200
            );
        }
    } catch (err) {
        return defaultResponse(
            res,
            false,
            TechnicalError,
            err,
            TechnicalError.code
        );
    }
}