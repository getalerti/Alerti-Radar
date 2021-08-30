import styles from "./folders.module.scss"
import FolderItem from "./FolderItem";

export default ({ folders }) => {
    return (
        <div className={styles.folders}>
            {
                folders.map((folder, index) => {
                    return <FolderItem name={folder.name} index={index} />;
                })
            }
        </div>
    )
}