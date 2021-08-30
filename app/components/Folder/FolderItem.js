import styles from "./folders.module.scss"
import { FaFolderOpen, FaFolder } from 'react-icons/fa';
import {useState} from "react";

export default ({ name, index, items = [] }) => {
    const [open, setOpen] = useState(index === 0);
    return (
        <div className={styles.folder}>
            <div className={styles.folder__name} onClick={() => { setOpen(!open) }}>
                { (open) ? <FaFolderOpen /> : <FaFolder /> }
                <span>{ name }</span>
            </div>
            <div className={styles.folder__items} data-open={open}>
                {
                    items.map(item => {
                        return <p><img src={item.img} />{item.name}</p>
                    })
                }
            </div>
        </div>
    )
}