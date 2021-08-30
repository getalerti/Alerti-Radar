const elasticSearchClient = require('./../config/db');
const { validationResult } = require('express-validator');
const UserDto = require('../entities/UserDto');
const { genID } = require('../utils');
const FOLDER_PREF = "folder";

const addFolder = async (req, res) => {
    try {
        validationResult(req).throw();
        const userId = req.user;
        const { name } = req.body;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const idFolder = genID(FOLDER_PREF)
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const userDto = new UserDto(user._source)
            userDto.id = userId;
            userDto.addFolder({
                id: idFolder,
                name
            })

            const queryUpdate = {
                index: 'users',
                id: `${userId}`,
                body: {
                    doc: userDto.sanitizedUserToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return res.json({success: true})
        }
        return res.status(404).json({error: 'technical error'})
    } catch (e) {
        console.log({error: e});
        return res.status(403).json({error: 'invalid data'})
    }

}

const getFolders = async (req, res) => {
    try {
        const userId = req.user;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const items = user._source.folders || [];
            return res.status(200).json(items)
        }
    } catch (e) {
        console.log(e)
        return res.status(403).json({error: 'invalid data', e})
    }
}
module.exports = {
    addFolder,
    getFolders
}