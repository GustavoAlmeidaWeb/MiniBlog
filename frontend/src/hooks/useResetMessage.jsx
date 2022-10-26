// Redux
import { resetAuthStates } from "../slices/authSlice";
import { resetPostStates } from "../slices/postSlice";

export const useResetAuthMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetAuthStates());
        }, 2000)
    }
}

export const useResetPostMessage = (dispatch) => {
  return () => {
      setTimeout(() => {
          dispatch(resetPostStates());
      }, 2000)
  }
}
