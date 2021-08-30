import styles from "./style.module.scss";
import {FaPlus} from "react-icons/fa";
import {saveFolder} from "../../store/actions";
import {connect} from "react-redux";
import {useState} from "react";
import {isNotEmpty} from "../../utils";
import useTranslation from "../../i18n";

const NewFolder = ({ saveFolder }) => {
    const t = useTranslation();
    const [error, setError] = useState("");
    const [source, setSource] = useState(null);
    const submitHandler = (e) => {
        e.preventDefault();
        setError("");
        const name = e.target.name.value;
        if (isNotEmpty(name)) {
            saveFolder(name)
        } else {
            setError(t("invalid_inputs"));
        }
    }
    return (
        <form className={styles.new_item} onSubmit={submitHandler}>

            { error !== "" && <div className={styles.new_item_error}>
                {error}
            </div> }
            <input type={"text"} name={"name"} id={"name"} placeholder={t('new_folder_name')} />
            <div className={styles.new_item__btns}>
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
    saveFolder
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewFolder);