import useTranslation from "../../i18n";
import styles from "./style.module.scss"

export default ({ setMode }) => {
    const tr = useTranslation();
    return (
        <form action="" className={styles.form}>
            <h2 className={styles["title-1"]}>
                {tr("reset-password-title")}
            </h2>
            <p className={styles.description}>
                {
                    tr("signin-description")
                }
            </p>
            <div className={styles["form-group"]}>
                <label htmlFor="email">{tr("login-email")}</label>
                <input className={styles.input} type={"email"} />
            </div>
            <button className={styles.btn} type={"submit"}>{tr("login-btn")}</button>
            <ul className={styles.errors}>
                <li>the password should be more than 6 characters</li>
            </ul>

            <div className={styles["form__bottom-links"]}>
                <span onClick={() => { setMode("login") }}>{tr("signin-title")}</span>
                <span onClick={() => { setMode("signup") }}>{tr("signup-title")}</span>
            </div>
        </form>
    )
}
