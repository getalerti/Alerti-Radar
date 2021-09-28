import { useEffect } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { Instagram } from 'react-content-loader';

export default () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/dashboard")
    }, [])

    return <div className={styles.container}><Instagram /></div>
}
