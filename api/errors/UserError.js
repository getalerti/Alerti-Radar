InvalidUserData = {
    type : "InvalidUserData",
    code : 400,
    error : "Invalid user fields"
}
UserAlreadyExists = {
    type : "UserAlreadyExists",
    code : 400,
    error : "The user is already exists"
}
UserNotFound = {
    type : "UserNotFound",
    code : 400,
    error : "The user is not found"
}
UnauthorizedUser = {
    type : "UnauthorizedUser",
    code : 401,
    error : "The user is unauthorized"
}

module.exports = {
    InvalidUserData,
    UserAlreadyExists,
    UserNotFound,
    UnauthorizedUser
}