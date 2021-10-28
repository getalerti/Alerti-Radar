const { validationResult }      = require('express-validator');
const elasticSearchClient       = require('./../helpers/db');
const Account                   = require('../classes/Account');
const { generateAccessToken }   = require('../helpers/utils');
const {
    AccountNotFound,
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
        const { email, password } = req.body;
        const queryByAccountname = {
            index: 'accounts',
            q: `email:${email}`
        }
        const resByEmail = await elasticSearchClient.search(queryByAccountname);
        if (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length > 0) {
            const account = new Account(resByEmail.hits.hits[0]._source);
            account._id = resByEmail.hits.hits[0]._id;
            account.jwt = generateAccessToken(account._id);
            if (!account.password && account.sub) {
                return defaultResponse(
                    res,
                    false,
                    AccountNotFound,
                    null,
                    AccountNotFound.code);
            }
            const isPasswordValid = await account.validatePassword(password);
            if (isPasswordValid) {
                return defaultResponse(
                    res,
                    true,
                    null,
                    { ...account.sanitizedAccount},
                    200
                );
            }
        }
        return defaultResponse(res, false, AccountNotFound, null, AccountNotFound.code);
    } catch (err) {
        return defaultResponse(res, false, TechnicalError, err, TechnicalError.code);
    }
}