import styles from "./style.module.scss";
import {addRemoveFeed} from "../../store/actions";
import {connect} from "react-redux";
import {useState} from "react";
import {validateNewSourceForm, sanitizeUrl} from "../../helpers/utils";
import useTranslation from "../../helpers/i18n";
import FeedSources from "../../components/Feed/FeedSources";

const NewSource = ({ addRemoveFeed }) => {
    const t = useTranslation();
    const [error, setError] = useState("");
    const submitHandler = (e) => {
        console.log("ddd")
        e.preventDefault();
        setError("");
        if (!e.target.source_url)
            return;
        let url = e.target.source_url.value;
        const type = e.target.source_type.value;
        url = sanitizeUrl(url)
        if (validateNewSourceForm(type, url)) {
            addRemoveFeed({type, data: url}, true)
            e.target.source_url.value = "";
            e.target.source_type.value = "";
        } else {
            setError(t("invalid_inputs"));
        }
    }
    return (
        <form className={styles.following__new_item} onSubmit={submitHandler}>

            { error !== "" && <div className={styles.following__new_item_error}>
                {error}
            </div> }
            <FeedSources />
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
)(NewSource);