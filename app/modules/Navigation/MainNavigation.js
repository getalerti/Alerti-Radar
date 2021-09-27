import Link from 'next/link'
import { FaAlgolia, FaHome, FaRss, FaPodcast, FaBookmark, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import styles from "./style.module.scss";
import consts from "./../../helpers/consts";
import { useRouter } from "next/router";
import {useAuth0} from "@auth0/auth0-react";

export default () => {
    const router = useRouter();
    const { logout } = useAuth0();

    const isActiveLink = (path) => router.pathname === path;
    const handleLogout = () => {
        if (typeof window != "undefined") {
            window.localStorage.removeItem(consts.isAuthenticatedKey);
            window.localStorage.removeItem(consts.isAuthenticatedUser);
            logout({ returnTo: process.env.AUTH0_BASE_URL })
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
                <Link href={"/dashboard/new"}>
                    <FaPlus title={"new"} className={isActiveLink("/dashboard/new") ? styles.navbar__item__active : ""} />
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
            <span className={styles.navbar__logout} onClick={() => { handleLogout()}}>
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