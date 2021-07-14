const Mustache = require('mustache');
const template = require('./emails-templates/reset-password-template');
module.exports = (name, newPassword) => {
    return Mustache.render(template, {
        name, newPassword
    });
}
