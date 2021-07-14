const jwt = require('jsonwebtoken');
const Parser = require('rss-parser');
const parser = new Parser();
const fs = require('fs');
const nodemailer = require("nodemailer");
const { uuid } = require('uuidv4');

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.JWT_SECRET);
}
const sanitizedFeedItems = (items, type, basedUrl) => {
    return items.map((item) => {
        let {title, creator, pubDate, "content:encoded": content_encoded, link, content, enclosure } = item;
        if (!isURL(link))
            link = new URL(basedUrl).origin + link
        return {
            id: uuid(),
            title,
            creator,
            date: pubDate,
            type,
            content: content_encoded ? content_encoded : content,
            media: enclosure,
            link
        };
    })
}
const getFeedItems = async (url, max, type) => {
    try {
        const feed = await parser.parseURL(url);
        const items = feed.items;
        if (items.length <= max)
            return sanitizedFeedItems(items, type, url);
        return sanitizedFeedItems(items.splice(0, max, url), type);
    } catch (e) {
        console.log({getFeedItemsError: e});
        return [];
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
const createUserContent = async (userId, feeds) => {
    const rssItems = feeds.filter(feed => feed.type === "rss").map(feed => {
        return {
            name: feed.name,
            url: feed.url
        }
    });
    const podcastsItems = feeds.filter(feed => feed.type === "podcast").map(feed => {
        return {
            name: feed.name,
            url: feed.url
        }
    });

    let rssContent = [];
    let podcastsContent = [];
    for (let i = 0; i < rssItems.length; i++) {
        rssContent.push({
            name: rssItems[i].name,
            content: await getFeedItems(rssItems[i].url, 15, "rss")
        })
    }
    for (let i = 0; i < podcastsItems.length; i++) {
        podcastsContent.push({
            name: podcastsItems[i].name,
            content: await getFeedItems(podcastsItems[i].url, 15, "podcast")
        })
    }
    podcastsContent = mergeFeedArrays(podcastsContent).sort((a, b) => new Date(b.date) - new Date(a.date));
    rssContent = mergeFeedArrays(rssContent).sort((a, b) => new Date(b.date) - new Date(a.date));

    await fs.writeFileSync(`./.cache/${userId}`, JSON.stringify({
        podcasts: podcastsContent,
        rss: rssContent
    }));
}
function randomString(length) {
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
module.exports = {
    generateAccessToken,
    createUserContent,
    randomString,
    sendMail,
    isURL
}