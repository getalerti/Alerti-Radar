import {fetchAPI} from "../helpers/utils";
import useTranslation from "../helpers/i18n";
import consts from "../helpers/consts";

export const LOAD_FEEDS         = "LOAD_FEEDS";
export const LOAD_FOLLOWINGS    = "LOAD_FOLLOWINGS";
export const SET_ERROR          = "SET_ERROR";
export const SET_SUCCESS        = "SET_SUCCESS";
export const USER_STATUS        = "USER_STATUS";
export const SAVED_ITEMS        = "SAVED_ITEMS";
export const VIEW_ITEM          = "VIEW_ITEM";
export const LOADING            = "LOADING";
export const LOAD_FOLDERS       = "GET_FOLDERS";
export const LOAD_ALERTS        = "LOAD_ALERTS";
export const LOAD_ALERT_ITEMS   = "LOAD_ALERT_ITEMS";
export const SET_FEED_FOLDER    = "SET_FEED_FOLDER";

const t = useTranslation();
export const auth = ({sub, email, name, picture, listTopics}) => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    dispatch({
        type: USER_STATUS,
        payload: "unauthorized"
    })
    fetchAPI("/auth/sso", "POST", {sub, email, name, picture, listTopics}, false)
        .then(response => {
            if (response && !response.success) {
                dispatch({ type: SET_ERROR, payload: t("technical_error") })
            }
            if (typeof window !== "undefined") {
                window.localStorage.setItem(consts.isAuthenticatedKey, true);
                window.localStorage.setItem(consts.isAuthenticatedUser, JSON.stringify(response.data));
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
            }
        }).catch(error => {
            console.log({authError: error})
            dispatch({ type: SET_ERROR, payload: t("technical_error") })
        }).finally(() => {
            dispatch({ type: LOADING, payload: false });
        })
};
export const loadFollwings = () => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/following", "GET", null, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: LOAD_FOLLOWINGS, payload: response.data })
                dispatch({ type: LOADING, payload: false });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
            }
        }).catch(error => {
            console.log({loadFollwingsError: error})
            dispatch({ type: SET_ERROR, payload: t("technical_error") })
        })
};
export const loadSavedItems = () => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/saved", "GET", null, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: SAVED_ITEMS, payload: response.data })
                dispatch({ type: LOADING, payload: false });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
            }
        }).catch(error => {
            console.log({loadSavedItemsError: error})
            dispatch({ type: SET_ERROR, payload: t("technical_error") })
        })
};
export const saveItem = (item) => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/saved", "POST", {item}, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: LOADING, payload: false });
                dispatch({ type: SET_SUCCESS, payload: t("successfully_operation") });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
            }
        }).catch(error => {
            console.log({loadSaveItemError: error})
            dispatch({ type: SET_ERROR, payload: t("technical_error") })
        })
};
export const loadFeeds = () => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/feeds", "GET", null, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: LOAD_FEEDS, payload: response.data })
                dispatch({ type: LOADING, payload: false });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
            }
        }).catch(error => {
            console.log({loadFeedsError: error})
            if (error === "NO_AUTH") {
                dispatch({
                    type: USER_STATUS,
                    payload: "unauthorized"
                })
            } else {
                dispatch({ type: SET_ERROR, payload: t("technical_error") })
            }
        })
};
export const addRemoveFeed = (item, action) => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/feeds", "POST", {...item, action}, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: SET_SUCCESS, payload: t("successfully_operation") });
                dispatch({ type: LOADING, payload: false });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
                dispatch(loadFollwings())
            }
        }).catch(error => {
            console.log({loadFeedsError: error})
            if (error === "NO_AUTH") {
                dispatch({
                    type: USER_STATUS,
                    payload: "unauthorized"
                })
            } else {
                dispatch({ type: SET_ERROR, payload: t("technical_error") })
            }
        })
};
export const updateFeedFolder = (feedId, folderId) => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/feeds/folder", "PUT", {feedId, folderId}, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: SET_SUCCESS, payload: t("successfully_operation") });
                dispatch({ type: LOADING, payload: false });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
                dispatch(loadFollwings())
            }
        }).catch(error => {
            console.log({updateFeedFolderError: error})
            dispatch({ type: SET_ERROR, payload: t("technical_error") })
        })
};
export const generateFeeds = () => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/generate-feeds", "GET", null, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: SET_SUCCESS, payload: t("successfully_operation") });
                dispatch({ type: LOADING, payload: false });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
                dispatch(loadFeeds())
            }
        }).catch(error => {
        console.log({loadFeedsError: error})
        if (error === "NO_AUTH") {
            dispatch({
                type: USER_STATUS,
                payload: "unauthorized"
            })
        } else {
            dispatch({ type: SET_ERROR, payload: t("technical_error") })
        }
    })
};
export const loadFolders = () => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/folders", "GET", null, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: LOAD_FOLDERS, payload: response.data })
                dispatch({ type: LOADING, payload: false });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
            }
        }).catch(error => {
            console.log({loadFeedsError: error})
            if (error === "NO_AUTH") {
                dispatch({
                    type: USER_STATUS,
                    payload: "unauthorized"
                })
            } else {
                dispatch({ type: SET_ERROR, payload: t("technical_error") })
            }
    })
};
export const saveFolder = (name) => dispatch => {
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI("/folders", "POST", {name}, true)
        .then(response => {
            if (response && !response.success) {
                if (response.error === "unauthorized") {
                    dispatch({
                        type: USER_STATUS,
                        payload: "unauthorized"
                    })
                }
                else
                    dispatch({ type: SET_ERROR, payload: t("technical_error") })
            } else {
                dispatch({ type: LOADING, payload: false });
                dispatch({ type: SET_SUCCESS, payload: t("successfully_operation") });
                dispatch({
                    type: USER_STATUS,
                    payload: "authorized"
                })
                dispatch(loadFolders())
            }
        }).catch(error => {
        console.log({loadSaveItemError: error})
        dispatch({ type: SET_ERROR, payload: t("technical_error") })
    })
};
export const viewItem = (item) => dispatch => {
    dispatch({ type: LOADING, payload: true });
    dispatch({ type: VIEW_ITEM, payload: item });
    dispatch({ type: LOADING, payload: false });
};
export const setError = (err) => dispatch => {
    dispatch({ type: SET_ERROR, err })
};
export const setSuccess = (msg) => dispatch => {
    dispatch({ type: SET_SUCCESS, msg })
};

// ALERTI
const alertApiUrl = process.env.ALERTI_API_URL || "";
export const loadAlerts = () => dispatch => {
    if (alertApiUrl === "")
        return;
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI(`${alertApiUrl}/alerts?per_page=100`, "GET", null, false, true)
        .then(response => {
            dispatch({ type: LOAD_ALERTS, payload: response.alerts })
            dispatch({ type: LOADING, payload: false });
        }).catch(error => {
        console.log({loadAlertsError: error})
        dispatch({ type: SET_ERROR, payload: t("technical_error") })
        }).finally(() => {
        dispatch({ type: LOADING, payload: false });
    })
};
export const loadAlert = (id, page = "") => dispatch => {
    if (alertApiUrl === "")
        return;
    dispatch({ type: SET_ERROR, payload: "" });
    dispatch({ type: LOADING, payload: true });
    fetchAPI(`${alertApiUrl}/alerts/${id}/entries?per_page=100${page}`, "GET", null, false, true)
        .then(response => {
            dispatch({ type: LOAD_ALERT_ITEMS, payload: { paging: response.paging, entries: response.entries } })
            dispatch({ type: LOADING, payload: false });
        }).catch(error => {
        console.log({loadAlertError: error})
        dispatch({ type: SET_ERROR, payload: t("technical_error") })
        }).finally(() => {
        dispatch({ type: LOADING, payload: false });
    })
};
