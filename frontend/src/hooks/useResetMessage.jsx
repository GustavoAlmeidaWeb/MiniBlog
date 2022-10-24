// Redux
import { resetAuthStates } from "../slices/authSlice";

export const useResetAuthMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetAuthStates());
        }, 2000)
    }
}
