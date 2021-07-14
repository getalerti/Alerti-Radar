const { checkSchema } = require('express-validator');
module.exports =  checkSchema({
    email: {
        isEmail: true
    },
    password: {
        isLength: {
            options: { min: 5 },
        }
    }
});