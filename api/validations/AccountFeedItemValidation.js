const { checkSchema } = require('express-validator');
module.exports =  checkSchema({
    item: {
        isObject: {
        }
    }
});