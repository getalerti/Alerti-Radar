import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "../../../helpers/i18n";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";
import StepsValidations from "../../validations/StepsValidations";
import consts from "../../helpers/consts";
import KeywordsForm from "./KeywordsForm";
import { HiOutlinePlusCircle } from "react-icons/hi";

export default () => {
    const {state, dispatch} = useContext(Context);
    const currentStepIndex = state.steps.indexOf(state.activeStep);
    const [keywordsItems, setKeywordsItems] = useState([Date.now()]);
    const [keywords, setKeywords] = useState([0]);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);

    const getName = (e) => {
        setName(e.target.value);
        setNameError(null);
    };
    const sanitizeKeywords = (keywordsList) => keywordsList.filter(_keyword => _keyword && _keyword !== "")
    const buildQuerySettings = () => {
        const alert_query_settings = [];
        keywords.forEach(({includedKeywords, excludedKeywords, plusKeywords}, index) => {
            if (!includedKeywords && !plusKeywords){
                return;
            }
            if (index > 0 && sanitizeKeywords(includedKeywords).length === 0 && sanitizeKeywords(plusKeywords).length === 0){
                return;
            }
            const any_keywords = (index === 0 && sanitizeKeywords(includedKeywords).length === 0) ? [name] : sanitizeKeywords(includedKeywords);
            alert_query_settings.push({
                any_keywords,
                exclude_keywords: sanitizeKeywords(excludedKeywords) || [],
                keywords: sanitizeKeywords(plusKeywords) || [],
            })
        })
        console.log({alert_query_settings})
        dispatch({type: "REQUEST", params: {alert_query_settings}});
    }
    const validate = (keywordItem, requestParams) => {
        const params = {...requestParams};
        if (keywordItem === -1) return;
        const index = keywordsItems.indexOf(keywordItem);
        if (index === -1) return;
        if (params.includedKeywords && params.includedKeywords.length === 0)
            params.includedKeywords = [name];
        const _keywords = [...keywords];
        _keywords[index] = {...params};
        console.log({keywordItem, requestParams})
        setKeywords(_keywords);
    }
    const removeKeyword = (_index) => {
        const _keywordsItems = [...keywordsItems];
        const index = _keywordsItems.indexOf(_index);
        _keywordsItems[index] = -1;
        setKeywordsItems(_keywordsItems);

        const _keywords = [...keywords];
        setKeywords(_keywords.filter((_, ind) => ind !== index));
    }
    const next = () => {
        const validation = StepsValidations(consts.keywords_form, {name});
        if (validation !== true) {
            setNameError(validation.fieldByField('name'));
            return;
        }
        if (state.steps && currentStepIndex >= state.steps.length - 1)
            return;
        buildQuerySettings();
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex+1] });

    }
    const back = () => {
        if (currentStepIndex <= 0)
            return;
        dispatch({type: "CHANGE", name: "activeStep", value: state.steps[currentStepIndex - 1] });
    }
    const t = useTranslation();
    return (
        <>
            <div className={styles.keywords}>
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"name"} />
                    <input type={"text"}
                           value={name}
                           placeholder={t('alert_name') + " *"}
                           onChange={getName}
                           data-valid={nameError === null} />
                    { nameError && <div className={communStyles.fieldError}>{nameError}</div> }
                </div>
            </div>

            {
                keywordsItems.map((index, key) => {
                    if (index === -1)
                        return <></>;
                    return (
                        <>
                            <KeywordsForm index={index}
                                          onRemoveHandler={() => { removeKeyword(index) }}
                                          key={key}
                                          isFirst={key === 0}
                                          onChangeHandler={validate} />
                            {keywordsItems.length > 1 && key < keywordsItems.length - 1 && (
                                <span className={communStyles.blocSeparator}>{t('OR')}</span>
                            ) }
                        </>
                    )
                })
            }
            <span className={communStyles.outlinePrimaryBtn}
                  onClick={() => { setKeywordsItems([...keywordsItems, Date.now()])}}>
                <HiOutlinePlusCircle /> {t('add_more_keywords')}
            </span>
            <SliderNavigation display={state.steps.length > 1}
                              isFirst={currentStepIndex === 0}
                              isLast={currentStepIndex === state.steps.length - 1}
                              next={next}
                              prev={back} />
        </>
    );
}