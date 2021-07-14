const defaultLang = "en";
const locales = require("./locales.json")
export default () => {
    if (typeof window === "undefined")
        return t => t ;
    const lang = window.localStorage.getItem("lang") || defaultLang;
    return (key => {
        if (!key)
            return key;
        const locale = locales[lang];
        const translation = locale ? locale[key] : undefined;
        return translation ? translation : key
    });

}