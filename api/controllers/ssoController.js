const { validationResult } = require('express-validator');
const elasticSearchClient = require('./../config/db');
const UserDto = require('../entities/UserDto');
const { generateAccessToken, genID, USER_COLLECTION_PREF_ID } = require('../utils');
const { TechnicalError } = require('../errors/TechnicalError');

module.exports =  async (req, res) => {
    try {
        validationResult(req).throw();
        let { email, name, picture, sub, listTopics } = req.body;
        sub = sub.replace("|", "_")
        const queryByUsername = {
            index: 'users',
            q: `email:"${email}"`
        }
        const resByEmail = await elasticSearchClient.search(queryByUsername);
        if (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length > 0) {
            const userDto = new UserDto(resByEmail.hits.hits[0]._source);
            userDto.sub = sub;
            userDto.picture = picture;
            if (userDto.feeds.length == 0) {
                userDto.interests = listTopics;
                userDto.interestsToFeeds();
            }
            userDto.name = name;
            userDto._id = resByEmail.hits.hits[0]._id;
            userDto.jwt = generateAccessToken(JSON.stringify({ id: userDto._id, email, sub }));
            const queryUpdate = {
                index: 'users',
                id: `${userDto._id}`,
                body: {
                    doc: userDto.sanitizedUserToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return res.json({
                ...userDto.sanitizedUser
            });
        } else {
            const userDto = new UserDto({ email, name, picture, sub });
            const id = genID(USER_COLLECTION_PREF_ID);
            if (userDto.feeds.length === 0) {
                userDto.interests = listTopics;
                userDto.interestsToFeeds();
            }
            userDto.jwt = generateAccessToken(JSON.stringify({ id, email, sub }));
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
    } catch (err) {
        console.log(err);
        return res.status(TechnicalError.code).json(TechnicalError);
    }
}