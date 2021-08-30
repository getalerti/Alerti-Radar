import styles from "./style.module.scss";
import { useRouter } from "next/router";
import Following from "../Following";
import useTranslation from "./../../i18n";

export default () => {
    const router = useRouter();
    const t = useTranslation()
    const isActiveLink = (path) => router.pathname === path;
    return (
        <nav className={styles.left_navbar}>
            <Following />
        </nav>
    )
}