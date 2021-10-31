import Link from 'next/link'
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import styles from "./style.module.scss";
import consts from "./../../helpers/consts";
import { useRouter } from "next/router";
import logo from "./../../images/logo-alerti.png";
import ChatwootLogo from "../../images/chatwoot";
import { IoMdAnalytics } from "react-icons/io";

export default () => {
    const router = useRouter();

    const isActiveLink = (path) => router.pathname === path;
    const handleLogout = () => {
        if (typeof window != "undefined") {
            window.localStorage.removeItem(consts.isAuthenticatedKey);
            window.localStorage.removeItem(consts.isAuthenticatedUser);
            router.push("/auth")
        }
    }
    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <img src={logo} className={styles.navbar__logo} />
            </Link>
            <div className={styles.navbar__items}>
                <Link href={"/"}>
                    <FaHome className={isActiveLink("/dashboard") ? styles.navbar__item__active : ""} />
                </Link>
                <Link href={"#"}>
                    <ChatwootLogo />
                </Link>
                <Link href={"#"}>
                    <IoMdAnalytics />
                </Link>
            </div>
            <div  className={styles.navbar__items}>
                <span className={styles.navbar__logout} onClick={() => { handleLogout()}}>
                    <FaSignOutAlt />
                </span>
                <span className={styles.app__version}>
                    v{process.env.APP_VERSION || "1.0"}
                </span>
            </div>
        </nav>
    )
}