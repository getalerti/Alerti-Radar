import styles from "../../modules/Following/style.module.scss";
import Image from "../Images";
import {FaEllipsisV} from "react-icons/fa";
import {useEffect} from "react";

export default ({item, draggable}) => {
    const {id, url} = item
    const onDragItem = (ev) => {
        ev.dataTransfer.setData("item", JSON.stringify({id, url}))
    }
    return (
        <div draggable={draggable} onDragStart={onDragItem} className={styles.following__item}>
            { draggable && <FaEllipsisV /> }
            <div className={styles.following__item__img}>
                <Image src={item.image} />
            </div>
            <div>
                <h5 className={styles.following__item__title}>{item.name}</h5>
            </div>
        </div>
    )
}