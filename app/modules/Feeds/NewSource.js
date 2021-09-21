import styles from "./style.module.scss";
import {addRemoveFeed} from "../../store/actions";
import {connect} from "react-redux";
import {useState} from "react";
import {validateNewSourceForm} from "../../helpers/utils";
import useTranslation from "../../helpers/i18n";
import FeedSources from "../../components/Feed/FeedSources";

const NewSource = ({ addRemoveFeed }) => {
    const t = useTranslation();
    const [error, setError] = useState("");
    const [source, setSource] = useState(null);
    const submitHandler = (e) => {
        e.preventDefault();
        setError("");
        if (!e.target.source_data)
            return;
        const data = e.target.source_data.value;
        const type = e.target.source_type.value;
        if (validateNewSourceForm(type, data)) {
            addRemoveFeed({type, data}, true)
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