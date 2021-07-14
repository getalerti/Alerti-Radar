const router = require('express').Router();
const authenticateToken = require('./middlewares/authMiddleware');
const userValidation = require('./validations/UserValidation');
const authValidation = require('./validations/AuthValidation');
const userFeedValidation = require('./validations/UserFeedValidation');
const userFeedItemValidation = require('./validations/UserFeedItemValidation');
const signUpController = require('./controllers/signUpController');
const signInController = require('./controllers/signInController');
const { addRemoveFeed, generateFeeds, getFeeds, getSavedItems, following, saveFeedItem, deleteSavedFeedItem} = require('./controllers/userFeedController');
const { resetPassword, updateUser, removeUser} = require('./controllers/userController');

// User
router.post('/auth/signup',userValidation, signUpController )
router.post('/auth/signin',authValidation, signInController )
router.post('/user/reset-password', resetPassword)
router.put('/user',[authenticateToken, userValidation], updateUser)
router.delete('/user',authenticateToken, removeUser)

// Feeds
router.post('/user/feeds',[authenticateToken, userFeedValidation], addRemoveFeed );
router.post('/user/saved',[authenticateToken, userFeedItemValidation], saveFeedItem );
router.delete('/user/saved',[authenticateToken, userFeedItemValidation], deleteSavedFeedItem );
router.get('/user/saved',authenticateToken, getSavedItems );
router.get('/user/feeds',authenticateToken, getFeeds );
router.get('/user/generate-feeds',authenticateToken, generateFeeds );
router.get('/user/following',authenticateToken, following );


module.exports = router;
