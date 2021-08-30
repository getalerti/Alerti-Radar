import styles from "./style.module.scss";
import Navigation from "../modules/Navigation/MainNavigation";
import Viewer from "../modules/Viewer";
import Toasts from "../modules/Toasts";
import LeftNavigation from "../modules/Navigation/LeftNavigation";

export default ({ children }) => {
    return (
        <div className={styles.container}>
            <Navigation />
            <LeftNavigation />
            { children }
            <Viewer />
            <Toasts />
        </div>
  )
}
