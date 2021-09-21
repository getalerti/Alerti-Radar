import styles from "./style.module.scss";
import {connect} from "react-redux";
import { FaWindowClose, FaFacebookSquare, FaLinkedin, FaTwitterSquare, FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { viewItem, saveItem} from "../../store/actions";
import ReactAudioPlayer from 'react-audio-player';
import {getSMShareUrl} from "../../helpers/utils";
import {useState} from "react";

const Viewer =({ item_viewer, viewItem, saveItem }) => {
    const [saved, isSaved] = useState(item_viewer && item_viewer.saved ? true : false);
    const sharePost = (social) => {
        if (typeof window !== "undefined") {
            window.open(getSMShareUrl(social, item_viewer.link), '_blank');
        }
    }
    if (!item_viewer)
        return <></>;
    console.log(item_viewer)
    return (
        <div className={styles.viewer}>
            <div className={styles.viewer__header}>
               <span className={styles.viewer__header__close} onClick={() => {viewItem(null)}}>
                   <FaWindowClose />
               </span>
               <div className={styles.viewer__header__share}>
                   <span>Share:</span>
                   <FaFacebookSquare onClick={() => { sharePost("facebook") }} />
                   <FaLinkedin onClick={() => { sharePost("linkedin") }} />
                   <FaTwitterSquare onClick={() => { sharePost("twitter") }} />
                   {
                       !saved && <FaRegBookmark onClick={() => { saveItem(item_viewer); isSaved(true) }} />
                   }
                   {
                       saved && <FaBookmark onClick={() => {
                           // TODO : remove saved Item
                           isSaved(false)
                       }} />
                   }
               </div>
            </div>
            <div className={styles.viewer__body}>
                <h2 className={styles.viewer__body__title}>
                    {item_viewer.title}
                </h2>
                <div className={styles.viewer__body__content}>
                    {
                        (item_viewer.content && item_viewer.content !== "") && <div  dangerouslySetInnerHTML={{__html: item_viewer.content}}></div>
                    }{
                        (item_viewer.media) && (
                            <ReactAudioPlayer
                                src={item_viewer.media.url}
                                autoPlay
                                controls
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    item_viewer: state.item_viewer,
});
const mapDispatchToProps = {
    viewItem,
    saveItem
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Viewer);