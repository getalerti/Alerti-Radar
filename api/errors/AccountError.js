InvalidAccountData = {
    type : "InvalidAccountData",
    code : 400,
    error : "Invalid user fields"
}
AccountAlreadyExists = {
    type : "AccountAlreadyExists",
    code : 400,
    error : "The user is already exists"
}
AccountNotFound = {
    type : "AccountNotFound",
    code : 400,
    error : "The user is not found"
}
UnauthorizedAccount = {
    type : "UnauthorizedAccount",
    code : 401,
    error : "The user is unauthorized"
}

module.exports = {
    InvalidAccountData,
    AccountAlreadyExists,
    AccountNotFound,
    UnauthorizedAccount
}