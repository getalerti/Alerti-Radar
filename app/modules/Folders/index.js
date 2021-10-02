import styles from "./style.module.scss";
import { loadFolders, updateFeedFolder } from "../../store/actions";
import {connect} from "react-redux";
import {useEffect} from "react";
import FeedsLoader from "../../components/loaders/FeedsLoader";
import NewFolder from "./NewFolder";
import FolderItem from "../../components/Folder/FolderItem";

const Folders =({ folders, loadFolders, updateFeedFolder, followings }) => {
    // const title = <h4 className={styles.title}>{t('folders')}</h4>
    const title = ""
    useEffect(() => {
        if (!folders) {
            loadFolders()
        }
    }, [folders]);
    if (!folders)
        return <div className={styles.folders}> {title} <FeedsLoader /> </div>

        return (
        <div className={styles.folders}>
            {title}
            <div className={styles.folders_list}>
                {
                    folders.map((folder, index) => {
                        return <FolderItem
                            updateFeedFolder={updateFeedFolder}
                            key={index}
                            items={followings ? followings.filter(feed => feed.folder === folder.id) : []}
                            folder={folder}
                            index={index} />;
                    })
                }
            </div>
            <NewFolder />
        </div>
    )
}

const mapStateToProps = state => ({
    followings: state.followings,
    folders: state.folders,
});

const mapDispatchToProps = {
    loadFolders,
    updateFeedFolder
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Folders);
