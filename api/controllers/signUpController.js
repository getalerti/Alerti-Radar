const { validationResult } = require('express-validator');
const elasticSearchClient = require('./../config/db');
const UserDto = require('../entities/UserDto');
const { generateAccessToken } = require('../utils')
const { genID, USER_COLLECTION_PREF_ID } = require('../utils');
module.exports =  async (req, res) => {
    try {
        validationResult(req).throw();
        const userDto = new UserDto(req.body);
        await userDto.hashPassword();
        const id = genID(USER_COLLECTION_PREF_ID);
        userDto.jwt = generateAccessToken(id);

        const queryByUsername = {
            index: 'users',
            q: `username:${userDto.username}`
        }
        const queryByEmail = {
            index: 'users',
            q: `email:"${userDto.email}"`
        }
        const resByUsername = await elasticSearchClient.search(queryByUsername);
        const resByEmail= await elasticSearchClient.search(queryByEmail);
        if ((resByUsername && resByUsername.hits && resByUsername.hits.hits && resByUsername.hits.hits.length == 0)
            &&
            (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length == 0)) {
            userDto.interestsToFeeds();
            const addQuery = {
                index: "users",
                id,
                body: {
                    ...userDto
                }
            }
            await elasticSearchClient.index(addQuery);
            return res.json({
                ...userDto.sanitizedUser
            });

        }
        return res.status(409).json({
            error: "USER_ALREADY_EXISTS"
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({error: "invalid_inputs"});
    }
}