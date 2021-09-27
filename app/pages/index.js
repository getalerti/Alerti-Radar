import { useEffect } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { loadFeeds } from "../store/actions";
import { connect } from 'react-redux';
import { Instagram } from 'react-content-loader';
import { useAuth0 } from "@auth0/auth0-react";

export default () => {
    //const { loginWithRedirect, logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const router = useRouter();
    useEffect(() => {
        if (isAuthenticated)
            loadFeeds();
    }, []);
    if (isLoading)
        return <Instagram />
    if (isAuthenticated) {
        router.push("/dashboard");
    } else {
        router.push("/auth");
    }
}
