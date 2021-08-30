import getMonitorTypes from "../../parameters/MonitorTypeAuthorization";
import styles from "./style.module.scss";
import MonitorType from "../../components/MonitorType";
import {useContext, useState} from "react";
import {Context} from "../../context";

export default ({details}) => {
    const [selectedType, setSelectedType] = useState(null);
    const monitorTypes = getMonitorTypes(details.alertType);
    const {dispatch} = useContext(Context);
    const onChangeType = (newType) => {
        setSelectedType(newType);
        dispatch({type: "CHANGE", name: "monitorType", value: newType });
    }
    return (
        <div className={styles.monitorTypes}>
            {
                monitorTypes.map(mType => {
                    return (
                        <MonitorType
                            active={selectedType === mType}
                            name={mType}
                            onClick={() => { onChangeType(mType) }}
                        />
                    )
                })
            }
        </div>
    )
}