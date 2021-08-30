import styles from "../../modules/Following/style.module.scss";
import Image from "../Images";

export default ({item}) => <div  className={styles.following__item}>
    <div className={styles.following__item__img}>
        <Image src={item.image} />
    </div>
    <div>
        <h5 className={styles.following__item__title}>{item.name}</h5>
    </div>
</div>