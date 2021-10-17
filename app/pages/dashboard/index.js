import DashboardLayout from "../../layouts/dashboard-layout";
import {connect} from "react-redux";
import All from "../../modules/Feeds/All";
import {useRouter} from "next/router";

function Dashboard({user_status}) {
    const router = useRouter();
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
export default connect(
    mapStateToProps
)(Dashboard);