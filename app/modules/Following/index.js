import styles from "./style.module.scss";
import {FaBookmark, FaThList} from 'react-icons/fa';
import { BulletList } from 'react-content-loader'
import {useEffect, useState} from "react";
import useTranslation from "../../helpers/i18n";
import Item from "../../components/Following/Item";
import {loadFollwings} from "../../store/actions";
import {connect} from "react-redux";
import Link from "next/link";
import Folders from "../Folders";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Following =({loadFollwings, followings}) => {
    const [expand, setExpand] = useState(false);
    const t = useTranslation()
    useEffect(() => {
        loadFollwings();
    }, []);
    const getList = () => {
        if(!followings)
            return null;
        return followings.map((item, index) => {
            return <Item key={index} item={item} />
        })
    }
    return (
        <>
        <div className={styles.following}>
            <Link href={"/dashboard/all"}>
                <div className={styles.nav_link}>
                    <FaThList title={t('all')} /> {t('all')}
                </div>
            </Link>
                <Link href={"/dashboard/saved"}>
                    <div className={styles.nav_link}>
                        <FaBookmark title={t('saved')} /> {t('saved')}
                    </div>
                </Link>
            <h4  className={styles.following__title}>{t('feeds')}
            </h4>
            <DndProvider backend={HTML5Backend}>
            <div className={styles.following__items} data-expand={expand}>
                { !followings && (
                    <>
                        <BulletList />
                        <BulletList />
                        <BulletList />
                    </>
                )}
                {
                    getList()
                }
            </div>
            <span className={styles.show_more} onClick={() => setExpand(!expand)}>
                Show {!expand ? "more" : "less"}
            </span>
            <Folders />
            </DndProvider>

        </div>

            </>
    )
}


const mapStateToProps = state => ({
    followings: state.followings,
});

const mapDispatchToProps = {
    loadFollwings
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Following);
