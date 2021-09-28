import "./../styles/reset.css";
import {Provider} from 'react-redux';
import { store } from "../store/store";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
    return (
        <Auth0Provider domain={process.env.AUTH0_ISSUER_BASE_URL}
                       clientId={process.env.AUTH0_CLIENT_ID}
                       redirectUri={process.env.AUTH0_BASE_URL}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Auth0Provider>
    )

}

export default MyApp
