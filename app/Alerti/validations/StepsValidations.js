import consts from "../helpers/consts";
import FieldError from "../parameters/FieldError";
import useTranslation from "../../i18n";
import { msg } from "./../helpers/utils";
const t = useTranslation();

export default (step, data) => {
    switch (step) {
        case consts.keywords_form:
            const { name, includedKeywords, excludedKeywords } = data;
            if (!name || name === '') {
                return new FieldError('name', msg('required_input', t('name')))
            }
            if (!includedKeywords || includedKeywords.length === 0) {
                return new FieldError('includedKeywords', msg('required_input', t('included_keywords')))
            }
            if (!excludedKeywords || excludedKeywords.length === 0) {
                return new FieldError('excludedKeywords', msg('required_input', t('excluded_keywords')))
            }
            return true;
        break;
    }
}