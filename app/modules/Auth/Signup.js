import useTranslation from "../../helpers/i18n";
import styles from "./style.module.scss"
import {useEffect, useState} from "react";
import {isEmail, isNotEmpty, isPassword} from "../../helpers/utils";
import {connect} from "react-redux";
import Topics from "./Topics";
import {auth} from "../../store/actions";
import consts from "../../helpers/consts";
import {useRouter} from "next/router";

const Signup = ({ setMode, auth, user_status, api_error }) => {
    const t = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    useEffect(() => {
        setError(api_error);
    }, [api_error]);
    useEffect(() => {
        if (user_status === "authorized") {
            router.push("/dashboard")
        }
    }, [user_status])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const fullname = e.target.fullname.value;
        const username = e.target.username.value;
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
        let listTopics = [];
        if (typeof window !== "undefined") {
            listTopics = window.localStorage.getItem(consts.userSelectedTopics);
            listTopics = JSON.parse(listTopics);
        }
        auth({email, password, username, name: fullname, listTopics}, "signup");

        setLoading(false);
    }
    return (
        <div className={styles.slider_container}>
            <div className={styles.slider}>
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

const mapStateToProps = state => ({
    user_status : state.user_status,
    api_error : state.error
});

const mapDispatchToProps = {
    auth
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);