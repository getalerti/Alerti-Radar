import styles from "./style.module.scss";
import communStyles from "./../../styles/commun.module.scss";
import AlertiIcons from "../../components/AlertiIcons";
import useTranslation from "./../../../i18n";
import ListInput from "../../components/ListInput";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import SliderNavigation from "../../components/SliderNavigation";
import StepsValidations from "../../validations/StepsValidations";
import consts from "../../helpers/consts";

export default ({ onChangeHandler }) => {
    const {state, dispatch} = useContext(Context);
    const currentStepIndex = state.steps.indexOf(state.activeStep);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);

    const [includedKeywords, setIncludedKeywords] = useState([]);
    const [includedKeywordsError, setIncludedKeywordsError] = useState(null);

    const [excludedKeywords, setExcludedKeywords] = useState([]);
    const [excludedKeywordsError, setExcludedKeywordsError] = useState(null);


    const getName = (e) => {
        setName(e.target.value);
        setNameError(null);
    };
    const getIncludedKeywords = (keywords) => {
        setIncludedKeywords(keywords);
        setIncludedKeywordsError(null);
    };
    const getExcludedKeywords = (keywords) => {
        setExcludedKeywords(keywords);
        setExcludedKeywordsError(null);
    };
    const validate = () => {
        const validation = StepsValidations(consts.keywords_form, {name, excludedKeywords, includedKeywords})
        console.log({validation})
        if (validation !== true) {
            setNameError(validation.fieldByField('name'));
            setIncludedKeywordsError(validation.fieldByField('includedKeywords'));
            setExcludedKeywordsError(validation.fieldByField('excludedKeywords'));
            return;
        }
        if (state.steps && currentStepIndex >= state.steps.length - 1)
            return;
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
                <div className={communStyles.alertBloc}>
                    <AlertiIcons name={"keywords"} />
                    <h3>{t('included_keywords')}</h3>
                    <ListInput
                        invalid={includedKeywordsError !== null}
                        onChange={getIncludedKeywords}
                    />
                    { includedKeywordsError && <div className={communStyles.fieldError}>{includedKeywordsError}</div> }
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
            <SliderNavigation display={state.steps.length > 1}
                              isFirst={currentStepIndex === 0}
                              isLast={currentStepIndex === state.steps.length - 1}
                              next={validate}
                              prev={back} />
        </>
    );
}