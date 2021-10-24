const router                    = require('express').Router();
const authenticateToken         = require('./middlewares/authMiddleware');
const userValidation            = require('./validations/AccountValidation');
const authValidation            = require('./validations/AuthValidation');
const ssoValidation             = require('./validations/SsoValidation');
const userFeedValidation        = require('./validations/AccountFeedValidation');
const userFeedItemValidation    = require('./validations/AccountFeedItemValidation');
const folderValidation          = require('./validations/FolderValidation');
const signUpController          = require('./controllers/signUpController');
const signInController          = require('./controllers/signInController');
const ssoController             = require('./controllers/ssoController');
const {
    addRemoveFeed,
    generateFeeds,
    getFeeds,
    getSavedItems,
    following,
    saveFeedItem,
    deleteSavedFeedItem,
    updateFeedFolder
}                               = require('./controllers/userFeedController');
const {
    resetPassword,
    updateAccount,
    removeAccount
}                               = require('./controllers/userController');
const {
    addFolder,
    getFolders
}                               = require('./controllers/foldersController');

// Account
router.post('/auth/signup',userValidation, signUpController )
router.post('/auth/signin',authValidation, signInController )
router.post('/auth/sso',ssoValidation, ssoController )
router.post('/reset-password', resetPassword)
router.put('/user',[authenticateToken, userValidation], updateAccount)
router.delete('/user',authenticateToken, removeAccount)

// Feeds
router.post('/feeds',[authenticateToken, userFeedValidation], addRemoveFeed );
router.put('/feeds/folder',authenticateToken, updateFeedFolder );
router.post('/saved',[authenticateToken, userFeedItemValidation], saveFeedItem );
router.delete('/saved',[authenticateToken, userFeedItemValidation], deleteSavedFeedItem );
router.get('/saved',authenticateToken, getSavedItems );
router.get('/feeds',authenticateToken, getFeeds );
router.get('/generate-feeds',authenticateToken, generateFeeds );
router.get('/following',authenticateToken, following );

// folders
router.get('/folders',[authenticateToken, folderValidation], getFolders );
router.post('/folders',[authenticateToken, folderValidation], addFolder );


module.exports = router;
