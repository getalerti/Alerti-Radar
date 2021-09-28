import {useEffect, useState} from "react";
import styles from './index.module.scss';
import Login from "../modules/Auth/Login";
import Signup from "../modules/Auth/Signup";
import ResetPassword from "../modules/Auth/ResetPassword";
import {useRouter} from "next/router";
import {useAuth0} from "@auth0/auth0-react";
import Topics from "../modules/Auth/Topics";
import consts from "../helpers/consts";

export default function Home() {
    const router = useRouter();
    const { loginWithRedirect } = useAuth0();
    const auth_mode = process.env.AUTH_MODE;
    const [topics, setTopics] = useState([]);
    const [mode, setMode] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isUserSelectTopics = window.localStorage.getItem(consts.isUserSelectTopics)
            if (auth_mode === "SSO" && !isUserSelectTopics) {
                setMode("topics");
            } else {
                setMode("signin")
            }
            if (mode !== "" && mode !== "topics" && auth_mode === "SSO") {
                loginWithRedirect()
            }
        }
    }, [mode])
    return (
        <div  className={styles.container}>
            { mode === "topics" && <Topics setTopics={setTopics} setNext={setMode} /> }
            { mode === "login" && <Login setMode={setMode} /> }
            { mode === "signup" && <Signup setMode={setMode} /> }
            { mode === "reset" && <ResetPassword setMode={setMode} /> }
        </div>
    )
}