import styles from "./../styles/commun.module.scss"
import { BsFillTrashFill } from "react-icons/bs";
import {useEffect, useState} from "react";
import useTranslation from "./../../i18n";
import {isNotEmpty, isURL} from "../../utils";

export default ({placeholder, defaultItems = [], onChange, rules = [], description = "", invalid = false}) => {
    const t = useTranslation();
    const [error, setError] = useState(null)
    const [items, setItems] = useState(defaultItems)
    const [newItem, setNewItem] = useState("");

    const checkRule = (item) => {
        if (rules.length > 0) {
            for (var i = 0; i < rules.length; i++) {
                const rule = rules[i];
                switch (rule) {
                    case "url":
                        return isURL(item);
                        break;
                    case "tld":
                        return item.indexOf(' ') === -1 && item.length > 2 && item[0] === ".";
                        break;
                    case "twitter":
                        return item.indexOf(' ') === -1 && item.length > 1 && item.length < 16;
                        break;
                }
            }
        }
        return true;
    }
    const validateNewItem = () => {
        let valid = true;
        if (items.indexOf(newItem) !== -1 || newItem === "")
            valid = false;
        if (!checkRule(newItem))
            valid = false;
        if (valid)
            setNewItem("");
        return valid;
    }

    const typingHandler = (e, blur = false) => {
        setError(null);
        if (isNotEmpty(newItem) && (e.keyCode === 13 || blur)) {
            if (!validateNewItem()) {
                setError(t('invalid_input2'))
                return;
            }
            setItems([...items, newItem])
            e.preventDefault();
        }
    }
    useEffect(() => {
        if (onChange) {
            onChange(items);
        }
    }, [items])
    return (
        <>
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
            {error && <div className={styles.fieldError}>{ error }</div>}
        </>
    )
}