import styles from "../../modules/Following/style.module.scss";
import Image from "../Images";
import {FaEllipsisV} from "react-icons/fa";
import { useDrag } from 'react-dnd'

export default ({item}) => {
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: item.id,
        item
    }))
    return collected.isDragging ? (
        <div ref={dragPreview} />
    ) : (
        <div  className={styles.following__item} ref={dragPreview}>
            <FaEllipsisV />
            <div className={styles.following__item__img}>
                <Image src={item.image} />
            </div>
            <div>
                <h5 className={styles.following__item__title}>{item.name}</h5>
            </div>
        </div>
    )
}