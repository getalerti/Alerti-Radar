const jwt = require('jsonwebtoken');
const { UnauthorizedUser } = require("./../errors/UserError")
module.exports = authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
        return res.status(UnauthorizedUser.code).json(UnauthorizedUser);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(UnauthorizedUser.code).json(UnauthorizedUser);
        req.user = user
        next()
    })
}

