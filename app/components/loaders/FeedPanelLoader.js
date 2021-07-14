import styles from "../../modules/Feeds/style.module.scss";
import { BulletList } from 'react-content-loader';

export default () => (
    <div className={styles.feed__items}>
        <div className={styles.feed__item}>
            <BulletList />
        </div>
    </div>
)