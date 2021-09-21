import styles from "./style.module.scss";
import { connect } from 'react-redux';
import {setError, setSuccess} from "../../store/actions";
import Alert from "../../components/Alert";
import { FaTimesCircle } from 'react-icons/fa';
import useTranslation from "../../helpers/i18n";

function Toasts({ error, success, setError, setSuccess, loading }) {
    const t = useTranslation()
    if ((!error || error === "")
        && (!success || success === "")
        && (!loading))
        return <></>;
    const clear = () => {
        setSuccess("");
        setError("");
    }
    return <div className={styles.toast}>
        <FaTimesCircle onClick={clear} />
        {(success && success !== "") && <Alert type={"success"} message={success} /> }
        {(error && error !== "") && <Alert type={"error"} message={error} /> }
        {(loading) && <Alert type={"primary"} message={t('processing_data')} loader={true} /> }
    </div>
}

const mapStateToProps = state => ({
    error: state.error,
    success: state.success,
    loading: state.loading,
});

const mapDispatchToProps = {
    setError,
    setSuccess
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toasts);

