import useTranslation from "../../helpers/i18n";
import styles from "./style.module.scss"
import {useEffect, useState} from "react";
import {isNotEmpty, isPassword} from "../../helpers/utils";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {auth} from "../../store/actions";

const Login = ({ setMode, auth, user_status, api_error }) => {
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
        if (!isNotEmpty(email)) {
            setError(t("invalid_email"));
            setLoading(false);
            return;
        }
        if (!isPassword(password)) {
            setError(t("invalid_password"));
            setLoading(false);
            return;
        }
        auth({email, password}, "signin");
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
                <label htmlFor="email">{t("login-email")} / {t("login-username")}</label>
                <input name={"email"} required id={"email"} className={styles.input} />
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
)(Login);