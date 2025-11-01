import { useEffect } from "react";
import { loadState } from "../utils/storage";
import { ACTIONS, STORAGE_KEY } from "../constants";

export function useLocalStorageSync(dispatch) {
  useEffect(() => {
    function onStorage(e) {
      if (e.key === STORAGE_KEY || e.key === STORAGE_KEY + ":updatedAt") {
        const remote = loadState();
        if (remote) {
          dispatch({ type: ACTIONS.SET_STATE, payload: remote });
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch]);
}