import { useEffect } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { loadFeeds } from "../store/actions";
import { connect } from 'react-redux';
import { Instagram } from 'react-content-loader';

function Home({ loading, user_status, loadFeeds}) {
    const router = useRouter();
    useEffect(() => {
        loadFeeds();
    }, []);
    if (user_status === "unauthorized")
        router.push("/auth");
    if (user_status === "authorized")
        router.push("/dashboard");
    return (
        <div className={styles.container}>
            {
                loading && <Instagram />
            }
        </div>
  )
}

const mapStateToProps = state => ({
    feeds: state.feeds,
    loading: state.loading,
    user_status: state.user_status,
});

const mapDispatchToProps = {
    loadFeeds
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
