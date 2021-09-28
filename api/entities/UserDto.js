const bcrypt = require('bcrypt');
const rssByTopic = require('./../config/rssByTopic');
const podcastByTopic = require('./../config/podcastsByTopics');
const Feed = require('./../entities/Feed');
module.exports = class UserDto {
    constructor({ id, email, name, username, password, jwt, feeds, listTopics, changePassword, savedItems, folders, picture, sub }) {
        this._id = id;
        this.email = email;
        this.picture = picture || null;
        this.sub = sub || null;
        this.name = name;
        this.username = username || null;
        this.password = password || null;
        this.url = "";
        this.feeds = feeds || [];
        this.interests = listTopics || [];
        this.changePassword = changePassword === true;
        this.savedItems = savedItems || [];
        this.jwt = jwt;
        this.folders = folders || [];
    }
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    get sanitizedUser() {
        const getCleanUser = {...this, password: ""}
        delete getCleanUser.password;
        delete getCleanUser.sub;
        delete getCleanUser.interests;
        delete getCleanUser._id;
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
        if(this.feeds.length > 0)
            return;
        this.interests.forEach(item => {
            let rssKey = "";
            rssKey = Object.keys(rssByTopic);
            rssKey = rssKey[item] || null;
            if (rssKey && rssByTopic[rssKey]) {
                rssByTopic[rssKey].map(feed => {
                    this.addFeed(new Feed(feed.name, feed.url, ""))
                })
            }

            let podcastKey = "";
            podcastKey = Object.keys(podcastByTopic);
            podcastKey = podcastKey[item] || null;
            if (podcastKey && podcastByTopic[podcastKey]) {
                podcastByTopic[podcastKey].map(feed => {
                    this.addFeed(new Feed(feed.name, feed.url, "", "podcast"))
                })
            }
        })
        console.log(this.feeds)

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
    addFolder(folder) {
        this.folders.push(folder)
    }
    removeFeed(idFeed) {
        this.feeds = this.feeds.filter(feed => feed.id !== idFeed );
    }
}