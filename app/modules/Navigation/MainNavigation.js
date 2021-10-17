import Link from 'next/link'
import { FaAlgolia, FaHome, FaRss, FaPodcast, FaBookmark, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import styles from "./style.module.scss";
import consts from "./../../helpers/consts";
import { useRouter } from "next/router";

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
                <FaAlgolia className={styles.navbar__logo} />
            </Link>
            <div className={styles.navbar__items}>
                <Link href={"/"}>
                    <FaHome className={isActiveLink("/dashboard") ? styles.navbar__item__active : ""} />
                </Link>
                <Link href={"/dashboard"}>
                    <FaPlus title={"new"} className={isActiveLink("/dashboard/new") ? styles.navbar__item__active : ""} />
                </Link>
                <Link href={"/dashboard/saved"}>
                    <FaBookmark title={"saved"} className={isActiveLink("/dashboard/saved") ? styles.navbar__item__active : ""} />
                </Link>
            </div>
            <span className={styles.navbar__logout} onClick={() => { handleLogout()}}>
                <FaSignOutAlt />
            </span>
        </nav>
    )
}