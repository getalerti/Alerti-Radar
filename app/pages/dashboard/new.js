import DashboardLayout from "../../layouts/dashboard-layout";
import NewSource from "../../modules/Feeds/NewSource";
import {connect} from "react-redux";
import {useRouter} from "next/router";

const New = ({user_status}) => {
    const router = useRouter();
    if (user_status === "unauthorized") {
        router.push("/auth");
        return <></>
    }
    return (
        <DashboardLayout>
            <NewSource />
        </DashboardLayout>
    )
}


const mapStateToProps = state => ({
    user_status: state.user_status
});
export default connect(
    mapStateToProps
)(New);