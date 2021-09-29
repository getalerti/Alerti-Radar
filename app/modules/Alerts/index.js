import styles from "./style.module.scss";
import {connect} from "react-redux";
import { loadAlerts, loadAlert} from "../../store/actions";
import { BulletList } from 'react-content-loader';
import {useEffect, useRef, useState} from "react";

const Alerts =({ alerts, alert_items, loadAlerts, loadAlert }) => {
    if (!(process.env.ALERTI_API_URL && process.env.ALERTI_API_TOKEN))
        return <></>;
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const alertContentRef = useRef(null);
    useEffect(() => {
        if (!alerts)
            loadAlerts();
        if (!alert_items && alerts && alerts.length > 0) {
            loadAlert(alerts[0].id)
            setSelectedAlert(alerts[0].id)
        }
        if (alertContentRef) {
            alertContentRef.current.addEventListener('scroll', handleAlertContentScroll);
        }
    }, [alerts]);
    const handleAlertContentScroll = () => {
        const loadContent = alertContentRef.current.scrollTop  + alertContentRef.current.offsetHeight === alertContentRef.current.scrollHeight;
        setCurrentPage(currentPage + 1)
        // TODO
    }
    const loadAlertContent = (id) => {
        loadAlert(id)
        setSelectedAlert(id)
    }
    const openAlertLink = (link) => {
        if (typeof window !== "undefined") {
            window.open(link, '_blank');
        }
    }
    return (
        <div className={styles.alerts}>
            <h1>Alerts</h1>
            <div className={styles.alerts__list}>
                { !alerts && <BulletList /> }
                {
                    alerts && alerts.map((alert ,index) => (
                        <div key={index}
                             data-selected={selectedAlert === alert.id}
                             onClick={() => {loadAlertContent(alert.id)}}>{alert.name}</div>
                    ))
                }
            </div>
            <div className={styles.alerts__content__items} id={"dddd"} ref={alertContentRef}>
                { !alert_items && <BulletList /> }
                {
                    alert_items && alert_items.entries.map((item ,index) => (
                        <div key={index} onClick={() => { openAlertLink(item.link) }}>
                            <span>{item.author_name}</span>
                            <p dangerouslySetInnerHTML={{__html: item.teaser}}></p>
                            <span>{item.published_at}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    alerts: state.alerts,
    alert_items: state.alert_items
});
const mapDispatchToProps = {
    loadAlerts,
    loadAlert
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);