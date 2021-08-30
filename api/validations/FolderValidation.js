const { checkSchema } = require('express-validator');
module.exports =  checkSchema({
    name: {
        isLength: {
            options: { min: 1 },
        }
    }
});