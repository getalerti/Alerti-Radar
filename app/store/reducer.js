import {
    SET_SUCCESS,
    SET_ERROR,
    ADD_FOLLOWING,
    LOAD_FEEDS,
    LOAD_FOLLOWINGS,
    LOADING,
    REMOVE_FOLLOWING,
    USER_STATUS,
    VIEW_ITEM,
    SAVED_ITEMS,
    SAVE_ITEM,
    LOAD_FOLDERS,
    SAVE_FOLDER, LOAD_ALERTS, LOAD_ALERT_ITEMS
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
        case SAVE_FOLDER: {
            return {
                ...state,
                folders: [...state.folders, payload]
            };
        }
        case SAVED_ITEMS: {
            return {
                ...state,
                saved_items: payload
            };
        }
        case SAVE_ITEM: {
            return {
                ...state,
                saved_items: [...state.saved_items, payload]
            };
        }
        case ADD_FOLLOWING: {
            return {
                ...state,
                followings: [...state.followings, payload]
            };
        }
        case REMOVE_FOLLOWING: {
            return {
                ...state,
                followings: state.followings.filter(item => item.url !== payload.url)
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