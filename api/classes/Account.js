const bcrypt    = require('bcrypt');
const {
    rssTopics,
    podcastsTopics
}               = require('./../helpers/data.js');
const Feed      = require('./../classes/Feed');

module.exports = class Account {
    constructor({ id, email, name, username, password, jwt, feeds = [], listTopics = [], changePassword = false, savedItems = [], folders = [], picture = "", sub = null }) {
        this._id            = id;
        this.email          = email;
        this.password       = password || null;
        this.username       = username || null;
        this.picture        = picture;
        this.sub            = sub;
        this.name           = name;
        this.feeds          = feeds;
        this.interests      = listTopics;
        this.changePassword = changePassword;
        this.savedItems     = savedItems;
        this.jwt            = jwt;
        this.folders        = folders;
    }
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    get sanitizedAccount() {
        const getCleanUser = {...this, password: ""}
        delete getCleanUser.password;
        delete getCleanUser.sub;
        delete getCleanUser.interests;
        delete getCleanUser.feeds;
        delete getCleanUser.folders;
        delete getCleanUser.savedItems;
        delete getCleanUser._id;
        return getCleanUser;
    }
    get sanitizedAccountToUpdate() {
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
        console.log({rssTopics})
        this.interests.forEach(item => {
            let rssKey = "";
            rssKey = Object.keys(rssTopics);
            rssKey = rssKey[item] || null;
            if (rssKey && rssTopics[rssKey]) {
                rssTopics[rssKey].map(feed => {
                    this.addFeed(new Feed(feed.name, feed.url, ""))
                })
            }

            let podcastKey = "";
            podcastKey = Object.keys(podcastsTopics);
            podcastKey = podcastKey[item] || null;
            if (podcastKey && podcastsTopics[podcastKey]) {
                podcastsTopics[podcastKey].map(feed => {
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
        let exist = false;
        if (!this.feeds) {
            this.feeds = [];
        }
        for (let i = 0; i < this.feeds.length; i++) {
            if (this.feeds[i].url === feed.url) {
                exist = true
            }
        }
        if (exist) {
            return;
        }
        this.feeds.push(feed)
    }
    changeFeedFolder(feedId, folderId) {
        for (var i = 0; i < this.feeds.length; i++) {
            if (this.feeds[i].id === feedId) {
                this.feeds[i].folder = folderId;
                return;
            }
        }
    }
    addFolder(folder) {
        this.folders.push(folder)
    }
    removeFeed(idFeed) {
        this.feeds = this.feeds.filter(feed => feed.id !== idFeed );
    }
}