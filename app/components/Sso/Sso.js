import styles from "./style.module.scss"
import useTranslation from "../../helpers/i18n";
import {useEffect, useState} from "react";
import auth0Icon from "./../../images/auth0.svg";
import {auth} from "../../store/actions";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {buildAuth0Params, fetchAuth0API, initAuth0} from "../../helpers/utils";
import consts from "../../helpers/consts";

const Sso = ({ auth, user_status }) => {
    const t = useTranslation();
    const [waiting, setWaiting] = useState(false);
    const router = useRouter();
    const loginWithRedirect = () => {
        try {
            const url = initAuth0();
            window.location.href = url;
        } catch (e) {
            alert("Error Auth0 config");
            console.log({initAuth0Exception: e})
        }
    }
    useEffect(() => {
        const auth0Params = buildAuth0Params(router.asPath)
        if (auth0Params) {
            setWaiting(true)
            fetchAuth0API(auth0Params)
                .then((response) => {
                    let listTopics = [];
                    if (typeof window !== "undefined") {
                        listTopics = window.localStorage.getItem(consts.userSelectedTopics);
                        listTopics = JSON.parse(listTopics);
                    }
                    auth({...response, listTopics});
                })
                .catch((err) => {
                    alert("Error Auth0 response");
                   console.log({authError: err})
                })
                .finally(() => {
                setWaiting(false)
            })
        }
    }, [])
    useEffect(() => {
        if (user_status === "authorized") {
            router.push("/dashboard")
        }
    }, [user_status])
    return (
        <div className={styles.sso_container}>
            <button disabled={waiting} onClick={loginWithRedirect} disabled={user_status === "pending" || waiting}>
                { !waiting ? t('login_with') : t('processing_data')  }
                <img src={auth0Icon} />
            </button>
        </div>
    )
}


const mapStateToProps = state => ({
    user_status : state.user_status
});

const mapDispatchToProps = {
    auth
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sso);