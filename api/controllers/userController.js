const elasticSearchClient = require('./../config/db');
const UserDto = require('../entities/UserDto');
const { randomString, sendMail } = require('../utils');
const resetPasswordEmail = require('./../emails/resetPassword');

const resetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        if (!email)
            return res.status(402).json({error: 'invalid data'})
        const queryByEmail = {
            index: 'users',
            q: `email:"${email}"`
        }
        const user = await elasticSearchClient.search(queryByEmail);
        if(user && user.hits && user.hits.hits && user.hits.hits.length > 0) {
            const userId = user.hits.hits[0]._id;
            const userDto = new UserDto(user.hits.hits[0]._source);
            userDto.changePassword = true;
            const newPassword = randomString(10);
            userDto.password = newPassword;
            await userDto.hashPassword();
            const message = resetPasswordEmail(userDto.name, newPassword);
            await sendMail(userDto.email, "Alerti Radar - New password", message)
            const queryUpdate = {
                index: 'users',
                id: `${userId}`,
                body: {
                    doc: userDto.sanitizedUserToUpdate
                }
            }
            await elasticSearchClient.update(queryUpdate);
            return res.status(200).json({success: true});
        }
        return res.status(402).json({error: 'invalid data'})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: 'technical error'})
    }

}
const updateUser = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email, username, changePassword, password } = req.body
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const userDto = new UserDto(user._source);
            if (email !== userDto.email) {
                const queryByEmail = {
                    index: 'users',
                    q: `email:"${user.email}"`
                }
                const resByEmail= await elasticSearchClient.search(queryByEmail);
                if (resByEmail && resByEmail.hits && resByEmail.hits.hits && resByEmail.hits.hits.length > 0) {
                    res.status(409).json({
                        error: "A resource already exists with that username or email."
                    });
                }
            }
            if (username !== userDto.username) {
                const queryByUsername = {
                    index: 'users',
                    q: `username:${user.username}`
                }
                const resByUsername = await elasticSearchClient.search(queryByUsername);
                if (resByUsername && resByUsername.hits && resByUsername.hits.hits && resByUsername.hits.hits.length > 0) {
                    res.status(409).json({
                        error: "A resource already exists with that username or email."
                    });
                }
            }
            userDto.changePassword = false;
            userDto.name = name;
            userDto.username = username;
            userDto.email = email;
            if(changePassword) {
                userDto.password = password;
                await userDto.hashPassword();
            }
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
        return res.status(402).json({error: 'invalid data'})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: 'technical error'})
    }
}
const removeUser = (req, res) => {
    res.json({
        success: true
    })
}

module.exports = {
    resetPassword,
    updateUser,
    removeUser
}