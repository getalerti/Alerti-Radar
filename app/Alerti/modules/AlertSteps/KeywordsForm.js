import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "./../../../i18n";
import ListInput from "../../components/ListInput";
import {useEffect, useState} from "react";
import { BsFillTrashFill } from "react-icons/bs";

export default ({ index, onChangeHandler = () => {}, onRemoveHandler, isFirst }) => {
    if (index === -1)
        return <></>;
    const [includedKeywords, setIncludedKeywords] = useState([]);
    const [includedKeywordsError, setIncludedKeywordsError] = useState(null);

    const [plusKeywords, setPlusKeywords] = useState([]);
    const [plusKeywordsError, setPlusKeywordsError] = useState(null);

    const [excludedKeywords, setExcludedKeywords] = useState([]);
    const [excludedKeywordsError, setExcludedKeywordsError] = useState(null);

    const getIncludedKeywords = (keywords) => {
        setIncludedKeywords(keywords);
        setIncludedKeywordsError(null);
    };
    const getPlusKeywords = (keywords) => {
        setPlusKeywords(keywords);
        setPlusKeywordsError(null);
    };
    const getExcludedKeywords = (keywords) => {
        setExcludedKeywords(keywords);
        setExcludedKeywordsError(null);
    };
    useEffect(() => {
        const requestParams = {includedKeywords, excludedKeywords, plusKeywords};
        onChangeHandler(index, requestParams);
    }, [includedKeywords, excludedKeywords, plusKeywords])
    const t = useTranslation();
    return (
        <>
            <div className={styles.keywords}>
                {!isFirst && <span onClick={onRemoveHandler}><BsFillTrashFill /></span> }
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"keywords"} />
                    <h3>{t('included_keywords')}</h3>
                    <ListInput
                        invalid={includedKeywordsError !== null}
                        onChange={getIncludedKeywords}
                    />
                    { includedKeywordsError && <div className={communStyles.fieldError}>{includedKeywordsError}</div> }
                    <span className={communStyles.blocSeparator}>{t('plus')}</span>
                    <ListInput
                        invalid={plusKeywordsError !== null}
                        onChange={getPlusKeywords}
                    />
                    { plusKeywordsError && <div className={communStyles.fieldError}>{plusKeywordsError}</div> }

                </div>
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"keywords"} />
                    <h3>{t('excluded_keywords')}</h3>
                    <ListInput
                        invalid={includedKeywordsError !== null}
                        onChange={getExcludedKeywords}
                    />
                    { excludedKeywordsError && <div className={communStyles.fieldError}>{excludedKeywordsError}</div> }
                </div>
            </div>
        </>
    );
}