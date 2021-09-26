import consts from "../helpers/consts";
import FieldError from "../parameters/FieldError";
import useTranslation from "../../helpers/i18n";
import { msg } from "./../helpers/utils";
const t = useTranslation();

// TODO: refactor it
export default (step, data) => {
    const { name } = data;
    switch (step) {
        case consts.keywords_form:
            if (!name || name === '') {
                return new FieldError('name', msg('required_input', t('name')))
            }
            return true;
        break;
        case consts.alert_sources_form:
            const { lang, alertSources } = data;
            if (!lang || lang === '') {
                return new FieldError('lang', msg('required_input', t('lang')))
            }
            if (!alertSources || alertSources.length === 0) {
                return new FieldError('alertSources', msg('required_input', t('sources')))
            }
            return true;
        break;
        case consts.alert_social_admin_accounts_form:
            const { instagram_indexes, my_pages_indexes, twitter_indexes } = data;
            if (!name || name === '') {
                return new FieldError('name', msg('required_input', t('name')))
            }
            if (instagram_indexes.length === 0 && my_pages_indexes.length === 0 && twitter_indexes.length === 0) {
                return new FieldError('accounts', t('must_select_account'))
            }
            return true;
        break;
        case consts.alert_reviews_form:
            const keys = Object.keys(data);
            let emptyDataValues = true;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                if (key === "name") {
                    const name = data.name;
                    if (!name || name === '') {
                        return new FieldError('name', msg('required_input', t('name')))
                    }
                } else {
                    const input = data[key];
                    if (input && input.length > 0) {
                        emptyDataValues = false;
                        break;
                    }
                }
            }
            if (emptyDataValues) {
                return new FieldError('accounts', t('must_select_account'))
            }
            return true;
        break;
        default:
            return true;
            break;
    }
}