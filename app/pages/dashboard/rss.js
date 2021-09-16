import DashboardLayout from "../../layouts/dashboard-layout";
import RSS from "../../modules/Feeds/RSS";
import {useRouter} from "next/router";
import {useAuth0} from "@auth0/auth0-react";
import {Instagram} from "react-content-loader";

export default function Dashboard() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading)
        return <Instagram />;
    if (!isAuthenticated)
        router.push("/auth");
    return (
        <DashboardLayout>
            <RSS />
        </DashboardLayout>
    )
}
