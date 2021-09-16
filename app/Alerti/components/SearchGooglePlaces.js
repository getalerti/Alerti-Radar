import styles from "./../styles/commun.module.scss"
import {useEffect, useState} from "react";
import { HiOutlinePlusCircle, HiOutlineTrash, HiOutlineSearch } from "react-icons/hi";
import AlertiIcons from "./AlertiIcons";
import GooglePlacesInput from "./GooglePlacesInput";

export default ({ iconName="", values = [], onchange = () => {}, placeholder = "" }) => {
    const [items, setItems] = useState(values);
    const [newItem, setNewItem] = useState(null);

    const addItem = () => {
        if (newItem) {
            setItems([...items, newItem])
        }
        clearNewItem();
    }
    const clearNewItem = () => {
        setNewItem(null);
    }
    const removeItem = (index) => {
        setItems(items.filter((_, _index) => _index !== index));
        clearNewItem();
    }
    useEffect(() => {
        onchange(items);
        console.log(items)
    }, [items])
    return (
        <div className={styles.searchItemsInput}>
            {
                items.map((item, index) => (
                    <div key={index}>
                        <AlertiIcons name={iconName} />
                        <div className={styles.iconInput}>
                            <HiOutlineSearch />
                            <input value={item.description} disabled />
                        </div>
                        <HiOutlineTrash onClick={() => removeItem(index)} />
                    </div>
                ))
            }
            <div>
                <AlertiIcons name={iconName} />
                <div className={styles.iconInput}>
                    <HiOutlineSearch />
                    <GooglePlacesInput placeholder={placeholder} onChange={(item) => { setNewItem(item); console.log({item}) }} />
                </div>
                <HiOutlinePlusCircle onClick={addItem} />

            </div>
        </div>
    )
}