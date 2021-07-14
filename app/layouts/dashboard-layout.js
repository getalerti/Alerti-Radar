import styles from "./style.module.scss";
import Following from "../modules/Following";
import Navigation from "../modules/Navigation";
import Viewer from "../modules/Viewer";
import Toasts from "../modules/Toasts";

export default ({ children }) => {
    return (
        <div className={styles.container}>
            <Navigation />
            { children }
            <Following />
            <Viewer />
            <Toasts />
        </div>
  )
}
