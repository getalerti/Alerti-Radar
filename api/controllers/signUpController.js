const { validationResult }      = require('express-validator');
const elasticSearchClient       = require('./../helpers/db');
const Account                   = require('../classes/Account');
const { generateAccessToken }   = require('../helpers/utils')
const {
    genID,
    USER_COLLECTION_PREF_ID
}                               = require('../helpers/utils');
const {
    AccountAlreadyExists,
    InvalidAccountData
}                               = require('../errors/AccountError');
const { TechnicalError }        = require('../errors/TechnicalError');
const defaultResponse           = require('../responses/defaultResponse');

module.exports =  async (req, res) => {
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
    try {
        const account = new Account(req.body);
        await account.hashPassword();
        const id = genID(USER_COLLECTION_PREF_ID);
        account.jwt = generateAccessToken(id);

        const queryByAccountname = {
            index: 'accounts',
            q: `username:${account.username}`
        }
        const queryByEmail = {
            index: 'accounts',
            q: `email:"${account.email}"`
        }
        const resByAccountname = await elasticSearchClient.search(queryByAccountname);
        const resByEmail= await elasticSearchClient.search(queryByEmail);
        if ((resByAccountname && resByAccountname.hits && resByAccountname.hits.hits && resByAccountname.hits.hits.length == 0)
            &&
            (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length == 0)) {
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
        return defaultResponse(
            res,
            false,
            AccountAlreadyExists,
            null,
            AccountAlreadyExists.code
        );
    } catch (err) {
        console.log(err);
        return defaultResponse(
            res,
            false,
            TechnicalError,
            null,
            TechnicalError.code
        );
    }
}