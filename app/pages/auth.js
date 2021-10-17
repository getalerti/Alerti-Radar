import {useEffect, useState} from "react";
import styles from './index.module.scss';
import Login from "../modules/Auth/Login";
import Signup from "../modules/Auth/Signup";
import ResetPassword from "../modules/Auth/ResetPassword";
import Topics from "../modules/Auth/Topics";
import consts from "../helpers/consts";
import Sso from "../components/Sso/Sso";
import {Auth0Provider} from "@auth0/auth0-react";

export default function Home() {
    const auth_mode = process.env.AUTH_MODE;
    const [_, setTopics] = useState([]);
    const [mode, setMode] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isUserSelectTopics = window.localStorage.getItem(consts.userSelectedTopics)
            if (!isUserSelectTopics) {
                setMode("topics");
            } else {
                setMode("login")
            }
        }
    }, [])
    return (
        <div  className={styles.auth_container}>
            { mode === "topics" && <Topics setTopics={setTopics} setNext={setMode} /> }
            { mode === "login" && <Login setMode={setMode} /> }
            { mode === "signup" && <Signup setMode={setMode} /> }
            { mode === "reset" && <ResetPassword setMode={setMode} /> }
            {
                mode !== "topics" && (
                    <Auth0Provider domain={process.env.AUTH0_ISSUER_BASE_URL}
                                   clientId={process.env.AUTH0_CLIENT_ID}
                                   redirectUri={process.env.AUTH0_BASE_URL}>
                        <Sso />
                    </Auth0Provider>
                )
            }
        </div>
    )
}