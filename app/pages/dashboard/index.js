import Feeds from "../../modules/Feeds";
import DashboardLayout from "../../layouts/dashboard-layout";
import {useAuth0} from "@auth0/auth0-react";
import {Instagram} from "react-content-loader";
import {useRouter} from "next/router";

export default function Dashboard() {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading)
        return <div><Instagram /></div>;
    if (!isAuthenticated)
        router.push("/auth");


    return (
        <DashboardLayout>
            <Feeds/>
        </DashboardLayout>
  )
}
