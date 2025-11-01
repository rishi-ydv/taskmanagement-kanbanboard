import React, { useReducer, useEffect, useMemo } from "react";
import { AppContext } from "./AppContext";
import { taskReducer } from "./taskReducer";
import { defaultState } from "../constants";
import { loadState, saveState } from "../utils/storage";
import { useLocalStorageSync } from "../hooks/useLocalStorageSync";
import { useTaskReminders } from "../hooks/useTaskReminders";

export function TaskProvider({ children, showToast }) {
  const [state, dispatch] = useReducer(
    taskReducer,
    undefined,
    () => loadState() || defaultState()
  );

  // Memoize usersMap
  const usersMap = useMemo(() => {
    return state.users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
  }, [state.users]);

  // --- Side Effects ---
  
  // 1. Save to local storage on any state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // 2. Listen for other tabs changing local storage
  useLocalStorageSync(dispatch);

  // 3. Set up task reminders
  useTaskReminders(state.tasks, showToast);

  // --- Context Value ---
  const contextValue = useMemo(() => ({
    state,
    dispatch,
    users: state.users,
    usersMap,
  }), [state, dispatch, usersMap, state.users]);


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}