import TwitterLogin from "react-twitter-login";
import {addTwitterAccount} from "../service/API";

export default ({handleSuccess = () => {}}) => {
    const authHandler = (err, data) => {
        if (data) {
            const {oauth_token, screen_name} = data;
            const params = {
                twitter_account: {
                    twitter_id:screen_name,
                    token:oauth_token,
                    cached_avatar_at:""
                }
            }
            addTwitterAccount(params)
            .then(addOrUpdateFacebookAccountResponse => {
                return addOrUpdateFacebookAccountResponse.json()
            }).then(addOrUpdateFacebookAccountResponse => {
                console.log({addOrUpdateFacebookAccountResponse})
            }).catch(addOrUpdateFacebookAccountError => {
                console.log({addOrUpdateFacebookAccountError})
            }).finally(() => { handleSuccess() })
        }
    };
    return (
        <TwitterLogin
            authCallback={authHandler}
            consumerKey={process.env.TWITTER_API_KEY}
            consumerSecret={process.env.TWITTER_API_SECRET}
        />
    )
}