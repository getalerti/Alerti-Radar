import DashboardLayout from "../../layouts/dashboard-layout";
import NewSource from "../../modules/Feeds/NewSource";
import {useEffect} from "react";

export default () => {
    return (
        <DashboardLayout>
            <NewSource />
        </DashboardLayout>
    )
}