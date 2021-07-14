const { checkSchema } = require('express-validator');
module.exports =  checkSchema({
    name: {
        isLength: {
            options: { min: 1 },
        }
    },
    type: {
        isLength: {
            options: { min: 3 },
        }
    },
    url: {
        isURL: true
    },
    action: {
        isBoolean: true
    }
});