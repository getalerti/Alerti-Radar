import styles from "./../styles/commun.module.scss"
import useTranslation from "../../helpers/i18n";
import {useEffect, useState} from "react";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi";
import AlertiIcons from "./AlertiIcons";
import {isURL} from "../../helpers/utils";

export default ({ values = [], iconName="", type = null, onchange = () => {}, title="", placeholder = "" }) => {
    const t = useTranslation();
    const [error, setError] = useState(null);
    const [items, setItems] = useState(values);
    const [newItem, setNewItem] = useState(null);
    
    const validation = () => {
        setError(null);
        if (!isURL(newItem)) return false;
        const url = new URL(newItem);
        switch (type) {
            case "opinion_assurances": return url.host.indexOf("opinion-assurances.fr") !== -1;
            case "trip_advisor":       return url.host.indexOf("tripadvisor.com") !== -1;
            case "booking":            return url.host.indexOf("booking.com") !== -1;
            case "expedia":            return url.host.indexOf("expedia.com") !== -1;
            case "agoda":              return url.host.indexOf("agoda.com") !== -1;
            case "trustpilot":         return url.host.indexOf("trustpilot.com") !== -1;
            case "google_places":      return url.host.indexOf("google.com") !== -1;
        }
        return true;
    }
    
    const addItem = () => {
        if (!validation()) {
            setError(t('invalid_input2'));
            return;
        }
        setItems([...items, newItem])
        setNewItem(null);
    }
    const clearNewItem = () => {
        setNewItem(null);
    }
    const removeItem = (index) => {
        setItems(items.filter((_, _index) => _index !== index));
        setNewItem(null);
    }
    useEffect(() => {
        onchange(items);
    }, [items])
    return (
        <div className={styles.urlItemsInput}>
            <p>{title}</p>
            {
                items.map((item, index) => (
                    <div key={index}>
                        <AlertiIcons name={iconName} />
                        <div className={styles.iconInput}>
                            <input value={item} disabled />
                        </div>
                        <HiOutlineTrash onClick={() => removeItem(index)} />
                    </div>
                ))
            }
            <div>
                <AlertiIcons name={iconName} />
                <div className={styles.iconInput}>
                    <input placeholder={placeholder} onChange={(e) => { setNewItem(e.target.value) }} />
                </div>
                <HiOutlinePlusCircle onClick={addItem} />

            </div>
            {error && <div className={styles.fieldError}>{error}</div>}
        </div>
    )
}