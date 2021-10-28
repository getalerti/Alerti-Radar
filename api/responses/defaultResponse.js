const logger               = require('../helpers/logger');

module.exports = (res, success, error, data, code = 500) => {
    if (success) {
        logger.info("test")
        return res.status(code).json({
            success,
            data
        })
    }
    if (data)
        logger.error(data);
    return res.status(code).json({
        success,
        error
    })
}