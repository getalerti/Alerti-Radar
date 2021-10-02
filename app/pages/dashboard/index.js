import Feeds from "../../modules/Feeds";
import DashboardLayout from "../../layouts/dashboard-layout";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import consts from "../../helpers/consts";
import {auth} from "../../store/actions";
import {connect} from "react-redux";
import All from "../../modules/Feeds/All";
import {useRouter} from "next/router";

function Dashboard({auth, user_status}) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const router = useRouter();
    useEffect(() => {
        if (typeof window != "undefined") {
            const isAuthenticatedValue = window.localStorage.getItem(consts.isAuthenticatedKey);
            let listTopics = window.localStorage.getItem(consts.userSelectedTopics);
            listTopics = listTopics ? JSON.parse(listTopics) : [];
            if (!isAuthenticatedValue && isAuthenticated && !isLoading) {
                (async function() {
                    const { email, name, picture, sub } = user;
                    await auth({ email, name, picture, sub, listTopics });
                })();
            }
        }
    }, [])
    if (user_status === "unauthorized") {
        router.push("/auth");
        return <></>
    }
    return (
        <DashboardLayout>
            <All />
        </DashboardLayout>
  )
}


const mapStateToProps = state => ({
    user_status: state.user_status
});

const mapDispatchToProps = {
    auth
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);