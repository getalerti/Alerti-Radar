const jwt           = require('jsonwebtoken');
const Parser        = require('rss-parser');
const parser        = new Parser();
const fs            = require('fs')
const nodemailer    = require("nodemailer");
const { uuid }      = require('uuidv4');
var jsdom           = require("jsdom");

const USER_COLLECTION_PREF_ID   = "usr";
const FEED_COLLECTION_PREF_ID   = "feed";
const FOLDER_COLLECTION_PREF_ID = "folder";

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.JWT_SECRET);
}
const getImageFromHTML = (html) => {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(`${html}`);
    const image = dom.window.document.querySelector("img");
    let source = image ? image.src : null;
    let type = "img";
    if (!source) {
        let svg = dom.window.document.querySelector("svg");
        type = "svg";
        if (svg && svg.length > 0) {
            source = svg[0].innerHTML;
        } else {
            source = svg ? svg.innerHTML : null;
        }
    }
    if (!source) {
        type = "img";
        source = "https://fakeimg.pl/600x400/282828/eae0d0/?retina=1&text=NO%20IMAGE!";
    }
    return {
        type,
        source
    };

}
const sanitizedFeedItems = (items, type, basedUrl) => {
    return items.map((item) => {
        let {title, creator, pubDate, "content:encoded": content_encoded, link, content, enclosure } = item;
        if (!isURL(link))
            link = new URL(basedUrl).origin + link;
        const _content = content_encoded ? content_encoded : content;
        return {
            id: uuid(),
            title,
            creator,
            date: pubDate,
            type,
            content: _content,
            media: getImageFromHTML(_content),
            link
        };
    })
}
const getFeedItems = async (url, max, type) => {
    try {
        const feed = await parser.parseURL(url);
        if (!feed)
            return [];
        const items = feed.items;
        if (items.length <= max)
            return sanitizedFeedItems(items, type, url);
        return sanitizedFeedItems(items.splice(0, max, url), type);
    } catch (e) {
        console.log({getFeedItemsError: e});
        return [];
    }
}
const getFeedTitle = async (url) => {
    try {
        const feed = await parser.parseURL(url);
        return feed.title || "";
    } catch (e) {
        console.log({url})
        console.log({getFeedTitle: e});
        return "";
    }
}
const mergeFeedArrays = (feeds) => {
    const result = [];
    feeds.forEach((item) => {
        item.content.forEach((_content) => {
            result.push({
                feed_name: item.name,
                ..._content
            })
        })
    })
    return result;
}
const createAccountContent = async (userId, feeds) => {
    const items = feeds.map(({name, url, type}) => {
        return {
            name,
            url,
            type
        }
    });

    let content = [];
    for (let i = 0; i < items.length; i++) {
        content.push({
            name: items[i].name,
            content: await getFeedItems(items[i].url, 15, items[i].type)
        })
    }
    content = mergeFeedArrays(content).sort((a, b) => new Date(b.date) - new Date(a.date));

    await fs.writeFileSync(`./.cache/${userId}`, JSON.stringify({
        content
    }));
}
const randomString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz&_@=$*0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
const sendMail = async (to, subject, text, customSenderEmail = "") => {
    //https://mailtrap.io/
    var transport = nodemailer.createTransport({
        host: process.env.MAIL_TRANSPORT_HOST,
        port: process.env.MAIL_TRANSPORT_PORT,
        auth: {
            user: process.env.MAIL_TRANSPORT_USER,
            pass: process.env.MAIL_TRANSPORT_PASSWORD
        }
    });
    const message = {
        from: customSenderEmail !== "" ? customSenderEmail : process.env.MAIL_SENDER_ADDRESS,
        to,
        subject,
        html: text
    };
    await transport.sendMail(message);
}

const isURL = (string) => {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
const genID = (pref = "") => `${pref === "" ? "" : (pref + "_")}${uuid()}`
module.exports = {
    generateAccessToken,
    createAccountContent,
    randomString,
    sendMail,
    isURL,
    genID,
    getFeedTitle,
    USER_COLLECTION_PREF_ID,
    FEED_COLLECTION_PREF_ID,
    FOLDER_COLLECTION_PREF_ID
}