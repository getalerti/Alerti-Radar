import "./../styles/reset.css";
import {Provider} from 'react-redux';
import { store } from "../store/store";

export default ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )

}
