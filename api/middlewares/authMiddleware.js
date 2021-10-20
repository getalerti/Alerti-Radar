const jwt = require('jsonwebtoken');
const { UnauthorizedAccount } = require("./../errors/AccountError")
module.exports = authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
        return res.status(UnauthorizedAccount.code).json(UnauthorizedAccount);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(UnauthorizedAccount.code).json(UnauthorizedAccount);
        if (typeof user.sub === "string" && user.sub) {
            req.user = user.id
        } else {
            req.user = user
        }
        next()
    })
}

