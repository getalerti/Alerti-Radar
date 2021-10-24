import {useEffect, useState} from "react";
import styles from './index.module.scss';
import Login from "../modules/Auth/Login";
import Signup from "../modules/Auth/Signup";
import ResetPassword from "../modules/Auth/ResetPassword";
import Topics from "../modules/Auth/Topics";
import consts from "../helpers/consts";
import Sso from "../components/Sso/Sso";

export default function Home() {
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
            { mode === "topics" && <Topics setNext={setMode} /> }
            { mode === "login" && <Login setMode={setMode} /> }
            { mode === "signup" && <Signup setMode={setMode} /> }
            { mode === "reset" && <ResetPassword setMode={setMode} /> }
            { mode !== "topics" && <Sso /> }

        </div>
    )
}