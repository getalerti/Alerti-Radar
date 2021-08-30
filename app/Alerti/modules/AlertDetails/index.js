import styles from "./style.module.scss"
import AlertSteps from "./../AlertSteps";
import {Provider, initialState} from "../../context";
import {useReducer} from "react";
import ProgressBarNavigation from "../../components/ProgressBarNavigation";

export default ({ alertType }) => {
    const [state, dispatch] = useReducer(initialState.reducer, initialState.state);
    return (
        <Provider value={{ state, dispatch }}>
            <div className={styles.alertiContainer}>
                <ProgressBarNavigation steps={state.steps} activeStep={state.activeStep} />
                <AlertSteps details={{ alertType }} />
            </div>
        </Provider>
    )
}