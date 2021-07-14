const { uuid } = require('uuidv4');

module.exports = class Feed {
    constructor (name, url, image, type = "rss") {
        this.id = uuid();
        this.name = name;
        this.url = url;
        this.image = image && image !== "" ? image : new URL(url).origin  + "/" + "favicon.ico";
        this.type = type;
    }
}