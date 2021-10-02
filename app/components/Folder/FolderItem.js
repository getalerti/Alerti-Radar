import styles from "./folders.module.scss"
import { FaFolderOpen, FaFolder } from 'react-icons/fa';
import {useState} from "react";
import FollowingItem from "../Following/Item";

export default ({ folder, index, items = [], updateFeedFolder }) => {
    const [open, setOpen] = useState(index === 0);
    const [highlight, setHighlight] = useState(false);
    const {id: folderId, name} = folder;
    const onDropItem = (ev) => {
        ev.preventDefault();
        setHighlight(false);
        const item = ev.dataTransfer.getData("item");
        const { id: feedId, url } = JSON.parse(item)
        updateFeedFolder(feedId, folderId)
    }
    return (
        <div className={styles.folder}
             data-highlight={highlight}
             onDrop={onDropItem}
             onDragOver={(ev) => { setHighlight(true); ev.preventDefault() }}
             onDragLeave={(ev) => { setHighlight(false) }}>
            <div className={styles.folder__name} onClick={() => { setOpen(!open) }}>
                { (open) ? <FaFolderOpen /> : <FaFolder /> }
                <span>{ name }</span>
            </div>
            <div className={styles.folder__items} data-open={open}>
                {
                    items.map((item, index) => {
                        return <FollowingItem key={index} item={item} draggable={false} />
                    })
                }
            </div>
        </div>
    )
}