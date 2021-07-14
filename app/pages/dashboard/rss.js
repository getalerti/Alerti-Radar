import DashboardLayout from "../../layouts/dashboard-layout";
import RSS from "../../modules/Feeds/RSS";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <RSS />
        </DashboardLayout>
    )
}
