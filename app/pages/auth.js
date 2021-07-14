import { useState } from "react";
import styles from './index.module.scss';
import Login from "../modules/Auth/Login";
import Signup from "../modules/Auth/Signup";
import ResetPassword from "../modules/Auth/ResetPassword";

export default function Home() {
    const [mode, setMode] = useState("login");
    return (
        <div  className={styles.container}>
            { mode === "login" && <Login setMode={setMode} /> }
            { mode === "signup" && <Signup setMode={setMode} /> }
            { mode === "reset" && <ResetPassword setMode={setMode} /> }
        </div>
    )
}