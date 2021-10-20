module.exports = (res, success, error, data, code = 500) => {
    if (success) {
        return res.status(code).json({
            success,
            data
        })
    }
    return res.status(code).json({
        success,
        error
    })
}