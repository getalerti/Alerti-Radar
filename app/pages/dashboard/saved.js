import DashboardLayout from "../../layouts/dashboard-layout";
import Saved from "../../modules/Feeds/Saved";
import {useRouter} from "next/router";
import {useAuth0} from "@auth0/auth0-react";
import {Instagram} from "react-content-loader";

export default () => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading)
        return <Instagram />;
    if (!isAuthenticated)
        router.push("/auth");
    return (
        <DashboardLayout>
            <Saved />
        </DashboardLayout>
    )
}
