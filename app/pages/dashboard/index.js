import Feeds from "../../modules/Feeds";
import DashboardLayout from "../../layouts/dashboard-layout";
import {useAuth0} from "@auth0/auth0-react";
import {Instagram} from "react-content-loader";
import {useRouter} from "next/router";
import {useEffect} from "react";
import consts from "../../helpers/consts";
import {auth} from "../../store/actions";
import {connect} from "react-redux";

function Dashboard({auth}) {
    const router = useRouter();
    const { isAuthenticated, isLoading, user } = useAuth0();
    useEffect(() => {
        if (typeof window != "undefined") {
            const isAuthenticatedValue = window.localStorage.getItem(consts.isAuthenticatedKey);
            if (!isAuthenticatedValue && isAuthenticated) {
                (async function() {
                    const { email, name, picture, sub } = user;
                    await auth({ email, name, picture, sub });
                })();
            }
        }
    }, [isAuthenticated, isLoading])
    return (
        <DashboardLayout>
            <Feeds/>
        </DashboardLayout>
  )
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {
    auth
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);