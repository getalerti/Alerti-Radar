import styles from "./style.module.scss";
import {connect} from "react-redux";
import { loadAlerts, loadAlert} from "../../store/actions";
import { BulletList } from 'react-content-loader';
import {useEffect, useRef, useState} from "react";
import {getSMShareUrl} from "../../helpers/utils";
import {FaTwitterSquare, FaUndo} from "react-icons/fa";
import useTranslation from "../../helpers/i18n";

const Alerts =({ alerts, alert_items, loadAlerts, loadAlert, loading }) => {
    if (!(process.env.ALERTI_API_URL && process.env.ALERTI_API_TOKEN))
        return <></>;
    const t = useTranslation();
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [freez, setFreez] = useState(loading);
    const [alertItems, setAlertItems] = useState(null);
    const [alertsList, setAlertsList] = useState(null);
    const alertContentRef = useRef(null);
    useEffect(() => {
        loadAlerts();
    }, []);
    useEffect(() => {
        setFreez(loading)
    }, [loading]);
    useEffect(() => {
        if (!alerts) {
            return;
        }
        setAlertsList(alerts);
        if (!alert_items && alerts.length > 0) {
            setSelectedAlert(alerts[0].id)
            loadAlert(alerts[0].id)
        }
    }, [alerts]);
    useEffect(() => {
        if (currentPage > 1)
            loadAlert(selectedAlert || alerts[0].id, `&page=${currentPage}`)
    }, [currentPage]);
    useEffect(() => {
        if (currentPage === 1)
            setAlertItems(alert_items || [])
        if (alertItems && currentPage > 1) {
            const _alertItems = alertItems || []
            _alertItems.entries.push(...alert_items.entries)
            setAlertItems(_alertItems)
        }
    }, [alert_items]);
    const init = async () => {
        if (!alerts) {
            await loadAlerts()
        }
    }
    const handleAlertContentScroll = () => {
        const loadContent = alertContentRef.current.scrollTop + alertContentRef.current.offsetHeight === alertContentRef.current.scrollHeight;
        if (loadContent && !freez)
            setCurrentPage(currentPage + 1)
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
    const shareAlertLink = (link) => {
        if (typeof window !== "undefined") {
            window.open(getSMShareUrl("twitter", link), '_blank');
        }
    }
    const filterAlerts = (e) => {
        const value = e.target.value;
        if (!value || value === "")
            setAlertsList(alerts)
        else
            setAlertsList(alerts.filter(alert => alert.name.indexOf(value) !== -1))
    }
    return (
        <div className={styles.alerts}>
            <h1>Alerts<FaUndo onClick={() => { init(true) }} /></h1>
            <div className={styles.alerts__list}>
                { alertsList === null && <BulletList /> }
                {
                    <>
                        {
                            alertsList && <input type={"text"} placeholder={t('search_alert')} onKeyUp={filterAlerts}/>
                        }
                        <div className={styles.alerts__list__content}>
                            {
                                alertsList && alertsList.map((alert ,index) => (
                                    <div key={index}
                                         data-selected={selectedAlert === alert.id}
                                         onClick={() => {loadAlertContent(alert.id)}}>{alert.name}</div>
                                ))
                            }
                        </div>
                    </>
                }
            </div>
            <div className={styles.alerts__content__items} ref={alertContentRef} onScroll={handleAlertContentScroll}>
                { alertItems === null && <BulletList /> }
                {
                    alertItems && alertItems.paging && alertItems.entries.map((item ,index) => (
                        <div key={index}>
                            <FaTwitterSquare className={styles.alerts__content__items__shareIcon} onClick={() => { shareAlertLink(item.link) }} />
                            <span onClick={() => { openAlertLink(item.link) }}>{item.author_name}</span>
                            <p onClick={() => { openAlertLink(item.link) }} dangerouslySetInnerHTML={{__html: item.teaser}}></p>
                            <span onClick={() => { openAlertLink(item.link) }}>{item.published_at}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    alerts: state.alerts,
    alert_items: state.alert_items,
    loading: state.loading
});
const mapDispatchToProps = {
    loadAlerts,
    loadAlert
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);