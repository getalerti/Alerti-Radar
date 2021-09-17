import DashboardLayout from "../../layouts/dashboard-layout";
import NewSource from "../../modules/Feeds/NewSource";
import {useAuth0} from "@auth0/auth0-react";
import {Instagram} from "react-content-loader";
import {useRouter} from "next/router";

export default () => {
    /*
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading)
        return <Instagram />;
    if (!isAuthenticated)
        router.push("/auth");
*/
    return (
        <DashboardLayout>
            <NewSource />
        </DashboardLayout>
    )
}