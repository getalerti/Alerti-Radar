import styles from "./style.module.scss";
import { loadFolders } from "../../store/actions";
import {connect} from "react-redux";
import {useEffect} from "react";
import useTranslation from "../../helpers/i18n";
import FeedsLoader from "../../components/loaders/FeedsLoader";
import NewFolder from "./NewFolder";
import ListFolders from "../../components/Folder/ListFolders";

const Folders =({ folders, loadFolders }) => {
    const t = useTranslation();
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
            <ListFolders folders={folders} />
            <NewFolder />
        </div>
    )
}

const mapStateToProps = state => ({
    folders: state.folders,
});

const mapDispatchToProps = {
    loadFolders
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Folders);
