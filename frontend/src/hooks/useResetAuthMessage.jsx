// Redux
import { resetStates } from "../slices/authSlice";

export const useResetAuthMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetStates());
        }, 2000)
    }
}
