import styles from "./style.module.scss";
import {FaBookmark, FaThList} from 'react-icons/fa';
import { BulletList } from 'react-content-loader'
import {useEffect, useState} from "react";
import useTranslation from "../../helpers/i18n";
import FollowingItem from "../../components/Following/Item";
import {loadFollwings} from "../../store/actions";
import {connect} from "react-redux";
import Link from "next/link";
import Folders from "../Folders";

const Following =({loadFollwings, followings}) => {
    const [expand, setExpand] = useState(false);
    const t = useTranslation()
    useEffect(() => {
        loadFollwings();
    }, []);
    const getList = () => {
        if(!followings)
            return null;
        return followings.filter(item => !item.folder || item.folder === "").map((item, index) => {
            return <FollowingItem key={index} item={item} draggable={true} />
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
            {
                (followings && followings.length) && (
                    <span className={styles.show_more} onClick={() => setExpand(!expand)}>
                        Show {!expand ? "more" : "less"}
                    </span>
                )
            }

            <Folders />
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
