const elasticSearchClient   = require('./../helpers/db');
const { validationResult }  = require('express-validator');
const Account               = require('../classes/Account');
const {
    genID,
    FOLDER_COLLECTION_PREF_ID
}                           = require('../helpers/utils');
const { TechnicalError }    = require('../errors/TechnicalError');
const { InvalidFolderData } = require('../errors/FolderError');
const defaultResponse       = require('../responses/defaultResponse');

const addFolder = async (req, res) => {
    try {
        validationResult(req).throw();
    } catch (_) {
        return defaultResponse(res, false, InvalidFolderData, null, InvalidFolderData.code);
    }
    try {
        let userId = req.user;
        const { name } = req.body;
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const idFolder = genID(FOLDER_COLLECTION_PREF_ID)
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const account = new Account(user._source)
            account.id = userId;
            account.addFolder({
                id: idFolder,
                name
            })

            const queryUpdate = {
                index: 'accounts',
                id: `${userId}`,
                body: {
                    doc: account.sanitizedAccountToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return defaultResponse(res, true, null, [], 200);
        }
        return defaultResponse(res, false, TechnicalError, null, TechnicalError.code);
    } catch (e) {
        console.log({error: e});
        return defaultResponse(res, false, TechnicalError, null, TechnicalError.code);
    }

}

const getFolders = async (req, res) => {
    try {
        let userId = req.user;
        console.log({userId})
        const queryByID = {
            index: 'accounts',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const items = user._source.folders || [];
            return defaultResponse(res, true, null, items, 200);
        }
    } catch (e) {
        console.log({getFolders: e})
        return defaultResponse(res, false, TechnicalError, null, TechnicalError.code);

    }
}
module.exports = {
    addFolder,
    getFolders
}