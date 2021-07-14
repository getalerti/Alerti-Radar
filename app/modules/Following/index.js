import styles from "./style.module.scss";
import { FaPlus } from 'react-icons/fa';
import { BulletList } from 'react-content-loader'
import {useEffect, useState} from "react";
import {fetchAPI} from "../../utils";
import useTranslation from "./../../i18n";
import Item from "../../components/Following/Item";
import NewFeed from "./NewFeed";
import {loadFollwings} from "../../store/actions";
import {connect} from "react-redux";

const Following =({loadFollwings, followings}) => {
    const [openNewFeed, setOpenNewFeed] = useState(false);
    const t = useTranslation()
    useEffect(() => {
        loadFollwings();
    }, []);
    const getList = () => {
        if(!followings)
            return null;
        return followings.map((item) => {
            return <Item item={item} />
        })
    }
    return (
        <>
            <div className={styles.following__new_item__popup} data-show={openNewFeed}>
                <NewFeed close={() => { setOpenNewFeed(false) }} />
            </div>
        <div className={styles.following}>

            <h4  className={styles.following__title}>{t('leeds')}
                <FaPlus className={styles.btn} onClick={() => {setOpenNewFeed(!openNewFeed)}} />
            </h4>
            <div className={styles.following__items}>
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
