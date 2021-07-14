const { validationResult } = require('express-validator');
const elasticSearchClient = require('./../config/db');
const UserDto = require('../entities/UserDto');
const Feed = require('../entities/Feed');
const { createUserContent } = require('../utils');
const fs = require('fs');

const addRemoveFeed = async (req, res) => {
    try {
        validationResult(req).throw();
        const userId = req.user;
        const { name, url, type, action } = req.body;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const userDto = new UserDto(user._source)
            userDto.id = userId;
            userDto.feeds = user._source.feeds;
            if (action) {
                userDto.addFeed(new Feed(name, url, "", type === "podcast" ? "podcast" : "rss"));
            }
            if (!action && req.body.idFeed) {
                userDto.removeFeed(req.body.idFeed)
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
        return res.status(404).json({error: 'technical error'})
    } catch (e) {
        console.log({error: e});
        return res.status(403).json({error: 'invalid data'})
    }

}

// generate feeds content for a user
const generateFeeds = async (req, res) => {
    try {
        const userId = req.user;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            await createUserContent(userId, user._source.feeds);
            res.json({
                success: true
            })
        }
    } catch (e) {
        console.log({ generateFeedsError: e })
        res.status(403).json({error: 'invalid data'})
    }
}

// get feeds content for a user
const getFeeds = async (req, res) => {
    try {
        const userId = req.user;
        const fileExists = await fs.existsSync(`./.cache/${userId}`);
        if (fileExists) {
            const feed = await fs.readFileSync(`./.cache/${userId}`);
            return res.status(200).json(JSON.parse(feed))
        } else {
            const queryByID = {
                index: 'users',
                id: `${userId}`
            }
            const user = await elasticSearchClient.get(queryByID);
            if (user && user._source) {
                await createUserContent(userId, user._source.feeds);
                const feed = await fs.readFileSync(`./.cache/${userId}`);
                return res.status(200).json(JSON.parse(feed))
            }
        }
    } catch (e) {
        console.log({getFeeds: e})
        return res.status(403).json({error: 'invalid data'})
    }
}
const getSavedItems = async (req, res) => {
    try {
        const userId = req.user;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const items = user._source.savedItems || [];
            return res.status(200).json(items)
        }
    } catch (e) {
        console.log(e)
        return res.status(403).json({error: 'invalid data'})
    }
}
const saveFeedItem = async (req, res) => {
    try {
        validationResult(req).throw();
        const userId = req.user;
        const { item } = req.body;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const userDto = new UserDto(user._source)
            userDto.id = userId;
            userDto.saveItem({...item, saved: true})

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
const deleteSavedFeedItem = async (req, res) => {
    try {
        validationResult(req).throw();
        const userId = req.user;
        const { item } = req.body;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            const userDto = new UserDto(user._source)
            userDto.id = userId;
            userDto.removeItem(item)

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
const following = async (req, res) => {
    try {
        const userId = req.user;
        const queryByID = {
            index: 'users',
            id: `${userId}`
        }
        const user = await elasticSearchClient.get(queryByID);
        if (user && user._source) {
            res.json({
                success: true,
                data: user._source.feeds
            })
        }
    } catch (e) {
        console.log({error: e})
        res.status(403).json({error: 'invalid data'})
    }
}

module.exports =  {
    addRemoveFeed,
    generateFeeds,
    getFeeds,
    following,
    saveFeedItem,
    getSavedItems,
    deleteSavedFeedItem
}