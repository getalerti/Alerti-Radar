const { checkSchema } = require('express-validator');
module.exports =  checkSchema({
    type: {
        isLength: {
            options: { min: 3 },
        }
    },
    action: {
        isBoolean: true
    }
});