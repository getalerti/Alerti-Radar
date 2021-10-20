const elasticSearchClient       = require('./../helpers/db');
const Account                   = require('../classes/Account');
const {
    randomString,
    sendMail
}                               = require('../helpers/utils');
const resetPasswordEmail        = require('./../emails/resetPassword');
const {
    AccountNotFound,
    AccountAlreadyExists
}                               = require('../errors/AccountError');
const { TechnicalError }        = require('../errors/TechnicalError');
const defaultResponse           = require('../responses/defaultResponse');

const resetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        if (!email)
            return res.status(402).json({error: 'invalid data'})
        const queryByEmail = {
            index: 'accounts',
            q: `email:"${email}"`
        }
        const user = await elasticSearchClient.search(queryByEmail);
        if(user && user.hits && user.hits.hits && user.hits.hits.length > 0) {
            const userId = user.hits.hits[0]._id;
            const account = new Account(user.hits.hits[0]._source);
            account.changePassword = true;
            const newPassword = randomString(10);
            account.password = newPassword;
            await account.hashPassword();
            const message = resetPasswordEmail(account.name, newPassword);
            await sendMail(account.email, "Alerti Radar - New password", message)
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
            AccountNotFound,
            null,
            AccountNotFound.code
        );
    } catch (e) {
        console.log(e);
        return defaultResponse(
            res,
            false,
            TechnicalError,
            null,
            TechnicalError.code
        );
    }

}
const updateAccount = async (req, res) => {
    try {
        let userId = req.user;
        const { name, email, username, changePassword, password } = req.body
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const account = new Account(user._source);
            if (email !== account.email) {
                const queryByEmail = {
                    index: 'accounts',
                    q: `email:"${user.email}"`
                }
                const resByEmail= await elasticSearchClient.search(queryByEmail);
                if (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length > 0) {
                    return defaultResponse(
                        res,
                        false,
                        AccountAlreadyExists,
                        null,
                        AccountAlreadyExists.code
                    );
                }
            }
            if (username !== account.username) {
                const queryByAccountname = {
                    index: 'accounts',
                    q: `username:${user.username}`
                }
                const resByAccountname = await elasticSearchClient.search(queryByAccountname);
                if (resByAccountname && resByAccountname.hits && resByAccountname.hits.hits && resByAccountname.hits.hits.length > 0) {
                    return defaultResponse(
                        res,
                        false,
                        AccountAlreadyExists,
                        null,
                        AccountAlreadyExists.code
                    );
                }
            }
            account.changePassword = false;
            account.name = name;
            account.username = username;
            account.email = email;
            if(changePassword) {
                account.password = password;
                await account.hashPassword();
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
            AccountNotFound,
            null,
            AccountNotFound.code
        );
    } catch (e) {
        console.log(e);
        return defaultResponse(
            res,
            false,
            TechnicalError,
            null,
            TechnicalError.code
        );
    }
}
const removeAccount = (req, res) => {
    // TODO
    res.json({
        success: true
    })
}

module.exports = {
    resetPassword,
    updateAccount,
    removeAccount
}