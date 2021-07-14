const { checkSchema } = require('express-validator');
module.exports =  checkSchema({
    email: {
        isEmail: true
    },
    name: {
        isLength: {
            options: { min: 3 },
        }
    },
    username: {
        isLength: {
            options: { min: 3 },
        }
    },
    password: {
        isLength: {
            options: { min: 5 },
        }
    }
});