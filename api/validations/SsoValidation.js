const { checkSchema } = require('express-validator');
module.exports =  checkSchema({
    email: {
        isEmail: true
    },
    sub: {
        isLength: {
            options: { min: 5 },
        }
    }
});