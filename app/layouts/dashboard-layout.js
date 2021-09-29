import styles from "./style.module.scss";
import Navigation from "../modules/Navigation/MainNavigation";
import Viewer from "../modules/Viewer";
import Toasts from "../modules/Toasts";
import LeftNavigation from "../modules/Navigation/LeftNavigation";
import Alerts from "../modules/Alerts";

export default ({ children }) => {
    return (
        <div className={styles.container}>
            <Navigation />
            <LeftNavigation />
            { children }
            <Alerts />
            <Viewer />
            <Toasts />
        </div>
  )
}
