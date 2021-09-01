import styles from "./../styles/commun.module.scss"
import { BsFillTrashFill } from "react-icons/bs";
import {useEffect, useState} from "react";
import useTranslation from "./../../i18n";

export default ({placeholder, defaultItems = [], onChange, description = "", invalid = false}) => {
    const t = useTranslation();
    const [items, setItems] = useState(defaultItems)
    const [newItem, setNewItem] = useState("");
    const typingHandler = (e, blur = false) => {
        if (e.keyCode === 13 || blur) {
            if (items.indexOf(newItem) !== -1 || newItem === "") {
                setNewItem("");
                e.preventDefault();
                return;
            }
            setItems([...items, newItem])
            setNewItem("");
            e.preventDefault();
        }
    }
    useEffect(() => {
        if (onChange) {
            onChange(items);
        }
    }, [items])
    return (
        <div className={styles.list_keyword_input}>
            <div className={styles.list_keywords_items}>
                {
                    items.map(item => {
                        return (
                            <span key={item} className={"input-list-item"}>
                                <BsFillTrashFill onClick={() => {
                                    setItems(items.filter(_item => _item !== item))
                                }} />
                                {item}
                            </span>
                        )
                    })
                }
            </div>
            <input type={"text"}
                   placeholder={placeholder}
                   data-valid={!invalid}
                   value={newItem}
                   onChange={(e) => { setNewItem(e.target.value) }}
                   onKeyUp={typingHandler}
                   onBlur={(e) => { typingHandler(e, true) }}  />
            <span className={styles.list_keyword_input_info}>
                {t('hit_enter_keywords')}
                { description !== "" && <><br />{description}</> }
            </span>
        </div>
    )
}