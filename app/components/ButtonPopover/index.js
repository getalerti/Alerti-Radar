import styles from "./style.module.scss"
import React, { useState } from 'react'

export default function index({children}) {
    const [showList, setShowList] = useState(false)
    return (
        <div className={styles.popover_btn}>
            <button onClick={() => { setShowList(!showList) }}>+ Ajouter</button>
            <div className={styles.popover_btn__list} data-show={showList} >
                {children}
            </div>
        </div>
    )
}
