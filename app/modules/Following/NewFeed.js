import styles from "../../modules/Following/style.module.scss";
import {FaPlus, FaWindowClose} from "react-icons/fa";
import {addRemoveFeed} from "../../store/actions";
import {connect} from "react-redux";
import {useState} from "react";
import {isNotEmpty} from "../../utils";
import useTranslation from "../../i18n";

const NewFeed = ({ addRemoveFeed, close }) => {
    const t = useTranslation();
    const [error, setError] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        setError("");
        const name = e.target.name.value;
        const url = e.target.url.value;
        const type = e.target.type.value;
        if (isNotEmpty(name) && isNotEmpty(url) && (type === "podcast" || type === "rss") ) {
            addRemoveFeed({name, url, type}, true)
            close();
        } else {
            setError(t("invalid_inputs"));
        }
    }
    return (
        <form className={styles.following__new_item} onSubmit={submitHandler}>
            <h4>Add new feed <FaWindowClose onClick={close} /></h4>
            { error !== "" && <div className={styles.following__new_item_error}>
                {error}
            </div> }
            <input type={"text"} name={"name"} id={"name"} placeholder={"Name"} />
            <input type={"url"}  name={"url"} id={"url"} placeholder={"URL"} />
            <div className={styles.following__new_item__types}>
                <div>
                    <input type={"radio"} checked={true} value={"rss"} name={"type"} id={"type_rss"} />
                    {t('rss')}
                </div>
                <div>
                    <input type={"radio"} value={"podcast"} name={"type"} id={"type_podcast"} />
                    {t('podcast')}
                </div>
            </div>
            <div className={styles.following__new_item__btns}>
                <button className={styles.btn}>
                    <FaPlus />
                </button>
            </div>
        </form>
    )
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = {
    addRemoveFeed
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewFeed);