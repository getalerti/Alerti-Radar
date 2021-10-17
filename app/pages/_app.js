import "./../styles/reset.css";
import {Provider} from 'react-redux';
import { store } from "../store/store";

function MyApp({ Component, pageProps }) {
    const auth_mode = process.env.AUTH_MODE;
    if (auth_mode === "SSO") {
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )

}

export default MyApp
