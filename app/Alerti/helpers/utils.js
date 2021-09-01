import useTranslation from "../../i18n";

const t = useTranslation();

const msg = (name, param = "") => {
    if (param !== "")
        return t(name).replace("###", param);
    return t(name);
}
export {
    msg
}