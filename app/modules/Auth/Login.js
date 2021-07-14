import useTranslation from "../../i18n";
import styles from "./style.module.scss"
import {useState} from "react";
import {fetchAPI, isEmail, isPassword} from "../../utils";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

export default ({ setMode }) => {
    const t = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
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
        const response = await fetchAPI("/auth/signin", "POST", {email, password});
        if (response && response.error)
            setError(t(response.error))
        if (response && response.jwt) {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("jwt", response.jwt)
                router.push("/dashboard")
            }
        }
        setLoading(false);
    }
    return (
        <form action="" className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles["title-1"]}>
                {t("signin-title")}
            </h2>
            <p className={styles.description}>
                {
                    t("signin-description")
                }
            </p>
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
                <span onClick={() => { setMode("signup") }}>{t("signup-title")}</span>
                <span onClick={() => { setMode("reset") }}>{t("reset-password-title")}</span>
            </div>
        </form>
    )
}
