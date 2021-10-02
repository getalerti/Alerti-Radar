import {
    SET_SUCCESS,
    SET_ERROR,
    LOAD_FEEDS,
    LOAD_FOLLOWINGS,
    LOADING,
    USER_STATUS,
    VIEW_ITEM,
    SAVED_ITEMS,
    LOAD_FOLDERS,
    LOAD_ALERTS, LOAD_ALERT_ITEMS, SET_FEED_FOLDER
} from "./actions";
import initialState from "./initialState";

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_ERROR: {
            return {
                ...state,
                error: payload,
            };
        }
        case SET_SUCCESS: {
            return {
                ...state,
                success: payload,
            };
        }
        case LOAD_FEEDS: {
            return {
                ...state,
                feeds: payload
            };
        }
        case LOAD_FOLLOWINGS: {
            return {
                ...state,
                followings: payload
            };
        }
        case LOAD_FOLDERS: {
            return {
                ...state,
                folders: payload
            };
        }
        case LOAD_ALERTS: {
            return {
                ...state,
                alerts: payload
            };
        }
        case LOAD_ALERT_ITEMS: {
            return {
                ...state,
                alert_items: payload
            };
        }
        case SAVED_ITEMS: {
            return {
                ...state,
                saved_items: payload
            };
        }
        case LOADING: {
            return {
                ...state,
                loading: payload
            };
        }
        case USER_STATUS: {
            return {
                ...state,
                user_status: payload
            };
        }
        case VIEW_ITEM: {
            return {
                ...state,
                item_viewer: payload
            };
        }
        default: {
            return state;
        }
    }
}