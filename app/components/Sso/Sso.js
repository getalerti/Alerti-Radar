import styles from "./style.module.scss"
import useTranslation from "../../helpers/i18n";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import auth0Icon from "./../../images/auth0.svg";
import {auth} from "../../store/actions";
import {connect} from "react-redux";
import consts from "../../helpers/consts";
import {useRouter} from "next/router";

const Sso = ({ auth }) => {
    const t = useTranslation();
    const { loginWithRedirect } = useAuth0();
    const [waiting, setWaiting] = useState(false);
    const { user } = useAuth0()
     const router = useRouter();

    useEffect(() => {
        if (user) {
            setWaiting(true);
            if (typeof window != "undefined") {
                const isAuthenticatedValue = window.localStorage.getItem(consts.isAuthenticatedKey);
                let listTopics = window.localStorage.getItem(consts.userSelectedTopics);
                listTopics = listTopics ? JSON.parse(listTopics) : [];
                (async function() {
                    const { email, name, picture, sub } = user;
                    await auth({ email, name, picture, sub, listTopics });
                    setWaiting(false);
                    router.push("/dashboard");
                })();
            }
        }
    }, [user])
    return (
        <div className={styles.sso_container}>
            <button disabled={waiting} onClick={loginWithRedirect}>
                { !waiting ? t('login_with') : t('processing_data')  }
                <img src={auth0Icon} />
            </button>
        </div>
    )
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    auth
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sso);