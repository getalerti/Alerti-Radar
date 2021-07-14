import Link from 'next/link'
import { FaAlgolia, FaHome, FaRss, FaPodcast, FaUserAlt, FaBookmark, FaSignOutAlt } from 'react-icons/fa';
import styles from "./style.module.scss";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    const isActiveLink = (path) => router.pathname === path;
    const logout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("jwt");
            router.push("/auth");
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
                <Link href={"/dashboard/rss"}>
                    <FaRss title={"rss"} className={isActiveLink("/dashboard/rss") ? styles.navbar__item__active : ""} />
                </Link>
                <Link href={"/dashboard/podcasts"}>
                    <FaPodcast title={"podcasts"} className={isActiveLink("/dashboard/podcasts") ? styles.navbar__item__active : ""} />
                </Link>
                <Link href={"/dashboard/saved"}>
                    <FaBookmark title={"saved"} className={isActiveLink("/dashboard/saved") ? styles.navbar__item__active : ""} />
                </Link>
            </div>
            <span className={styles.navbar__logout} onClick={logout}>
                <FaSignOutAlt />
            </span>
            {/*
            TODO: update user data
            <Link href={"#"}>
                <FaUserAlt className={styles.navbar__user} />
            </Link>
            */ }
        </nav>
    )
}