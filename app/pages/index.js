import { useEffect } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { loadFeeds } from "../store/actions";
import { connect } from 'react-redux';
import { Instagram } from 'react-content-loader';
import { useAuth0 } from "@auth0/auth0-react";

function Home({ loading, user_status, loadFeeds}) {
    /*
    const { loginWithRedirect, logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading ...</div>;
    }
    return (
        isAuthenticated ? (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <button onClick={() => logout({ returnTo: process.env.AUTH0_BASE_URL })}>
                    Log Out
                </button>
            </div>
        ) : <button onClick={() => loginWithRedirect()}>Log In</button>
    );
*/
    const router = useRouter();
    useEffect(() => {
        loadFeeds();
    }, []);
    if (!loading) {
        router.push("/dashboard");
    }
    return (
        <div className={styles.container}>
            {
                <Instagram />
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
