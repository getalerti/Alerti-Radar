import DashboardLayout from "../../layouts/dashboard-layout";
import Podcasts from "../../modules/Feeds/Podcasts";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <Podcasts />
        </DashboardLayout>
    )
}
