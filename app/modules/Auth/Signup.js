import useTranslation from "../../helpers/i18n";
import styles from "./style.module.scss"
import {useState} from "react";
import {fetchAPI, isEmail, isNotEmpty, isPassword} from "../../helpers/utils";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import Topics from "./Topics";
import _topics from "../../helpers/topics"

export default ({ setMode }) => {
    const t = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [next, setNext] = useState(false);
    const [topics, setTopics] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const fullname = e.target.fullname.value;
        const username = e.target.username.value;
        const listTopics = _topics.filter((_,index) => topics.indexOf(index) >= 0).map(top => top.name.toLocaleLowerCase());
        console.log(listTopics)
        if (!isEmail(email)) {
            setError(t("invalid_email"));
            setLoading(false);
            return;
        }
        if (!isPassword(password)) {
            setError(t("invalid_password"));
            setLoading(false);
            return;
        }
        if (!isNotEmpty(fullname)) {
            setError(t("invalid_inputs"));
            setLoading(false);
            return;
        }
        if (!isNotEmpty(username)) {
            setError(t("invalid_inputs"));
            setLoading(false);
            return;
        }
        const response = await fetchAPI("/auth/signup", "POST", {email, password, username, name: fullname, listTopics});
        if (response && response.error)
            setError(t(response.error))
        if (response && response.jwt) {
            dispatch({type: "AUTH", jwt: response.jwt})
            router.push("/")
        }
        setLoading(false);
    }
    return (
        <div className={styles.slider_container}>
            <div className={styles.slider} style={{ left: next ? "-100%" : "0" }}>
                <div className={styles.slider__item}><Topics setNext={setNext} setTopics={setTopics} /></div>
                <div className={styles.slider__item}><form action="" className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles["title-1"]}>
                        {t("signup-title")}
                    </h2>
                    <p className={styles.description}>
                        {
                            t("signin-description")
                        }
                    </p>
                    <div className={styles["form-group"]}>
                        <label htmlFor="fullname">{t("login-name")}</label>
                        <input name={"fullname"} required id={"fullname"} className={styles.input} type={"text"} />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="username">{t("login-username")}</label>
                        <input name={"username"} required id={"username"} className={styles.input} type={"text"} />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">{t("login-email")}</label>
                        <input name={"email"} required id={"email"} className={styles.input} type={"email"} />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="password">{t("login-password")}</label>
                        <input name={"password"} required id={"password"} className={styles.input} type={"password"} />
                    </div>
                    <button className={styles.btn} disabled={loading} type={"submit"}>{t("login-btn")}</button>
                    {
                        error !== "" && (
                            <p className={styles.errors}>
                                { error }
                            </p>
                        )
                    }
                    <div className={styles["form__bottom-links"]}>
                        <span onClick={() => { setMode("login") }}>{t("signin-title")}</span>
                        <span onClick={() => { setMode("reset") }}>{t("reset-password-title")}</span>
                    </div>
                </form></div>
            </div>
        </div>
    )
}
