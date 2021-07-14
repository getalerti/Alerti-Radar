const bcrypt = require('bcrypt');
const rssByTopic = require('./../config/rssByTopic');
const podcastByTopic = require('./../config/podcastsByTopics');
const Feed = require('./../entities/Feed');
module.exports = class UserDto {
    constructor({ id, email, name, username, password, jwt, feeds, listTopics, changePassword, savedItems }) {
        this._id = id;
        this.email = email;
        this.name = name;
        this.username = username;
        this.password = password;
        this.url = "";
        this.feeds = feeds || [];
        this.interests = listTopics || [];
        this.changePassword = changePassword === true;
        this.savedItems = savedItems || [];
        this.jwt = jwt;
    }
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    get sanitizedUser() {
        const getCleanUser = {...this, password: ""}
        delete getCleanUser.password;
        delete getCleanUser.interests;
        return getCleanUser;
    }
    get sanitizedUserToUpdate() {
        const sanitizedUser = {...this}
        delete sanitizedUser._id;
        return sanitizedUser;
    }
    async validatePassword(myPlaintextPassword) {
        return await bcrypt.compare(myPlaintextPassword, this.password);
    }
    interestsToFeeds() {
        this.interests.map(item => {
            if (rssByTopic[item]) {
                rssByTopic[item].map(feed => {
                    this.addFeed(new Feed(feed.name, feed.url, ""))
                })
            }
            if (podcastByTopic[item]) {
                podcastByTopic[item].map(feed => {
                    this.addFeed(new Feed(feed.name, feed.url, "", "podcast"))
                })
            }
        })
    }
    saveItem(item) {
        if (!this.savedItems) {
            this.savedItems = [];
        }
        this.savedItems.push(item)
    }
    removeItem(item) {
        this.savedItems = this.savedItems.filter(_item => _item.id !== item.id)
    }
    addFeed(feed) {
        if (!this.feeds) {
            this.feeds = [];
        }
        if (this.feeds.indexOf(f => f.url === feed.url) >= 0) {
            return;
        }
        this.feeds.push(feed)
    }
    removeFeed(idFeed) {
        this.feeds = this.feeds.filter(feed => feed.id !== idFeed );
    }
}