const { validationResult } = require('express-validator');
const elasticSearchClient = require('./../config/db');
const UserDto = require('../entities/UserDto');
const { generateAccessToken } = require('../utils');
const { UserNotFound, InvalidUserData } = require('../errors/UserError');
const { TechnicalError } = require('../errors/TechnicalError');

module.exports =  async (req, res) => {
    try {
        validationResult(req).throw();
    } catch (_) {
        return res.status(InvalidUserData.code).json(InvalidUserData);
    }
    try {
        const { email, password } = req.body;
        const queryByUsername = {
            index: 'users',
            q: `email:${email}`
        }
        const resByEmail = await elasticSearchClient.search(queryByUsername);
        if (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length > 0) {
            const userDto = new UserDto(resByEmail.hits.hits[0]._source);
            userDto._id = resByEmail.hits.hits[0]._id;
            userDto.jwt = generateAccessToken(userDto._id);
            const isPasswordValid = await userDto.validatePassword(password);
            if (isPasswordValid) {
                return res.json({
                    ...userDto.sanitizedUser
                });
            }
        }
        return res.status(UserNotFound.code).json(UserNotFound);
    } catch (err) {
        console.log(err);
        return res.status(TechnicalError.code).json(TechnicalError);
    }
}