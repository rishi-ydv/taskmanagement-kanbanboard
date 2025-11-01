import { ACTIONS } from "../constants";
import { nowISO } from "../utils/dateUtils";

export function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return action.payload;

    case ACTIONS.CREATE_TASK: {
      const { task } = action.payload;
      const tasks = { ...state.tasks, [task.id]: task };
      const columns = state.columns.map((col) => {
        if (col.id === "todo") {
          return { ...col, taskIds: [task.id, ...col.taskIds] };
        }
        return { ...col };
      });
      return { ...state, tasks, columns };
    }

    case ACTIONS.UPDATE_TASK: {
      const { taskId, patch } = action.payload;
      const task = { ...state.tasks[taskId], ...patch, updatedAt: nowISO() };
      const tasks = { ...state.tasks, [taskId]: task };
      return { ...state, tasks };
    }

    case ACTIONS.DELETE_TASK: {
      const { taskId } = action.payload;
      const tasks = { ...state.tasks };
      delete tasks[taskId];
      const columns = state.columns.map((col) => ({
        ...col,
        taskIds: col.taskIds.filter((id) => id !== taskId),
      }));
      return { ...state, tasks, columns };
    }

    case ACTIONS.MOVE_TASK: {
      const { taskId, toColumnId, index = 0 } = action.payload;
      const columns = state.columns.map((col) => ({
        ...col,
        taskIds: col.taskIds.filter((id) => id !== taskId),
      }));
      const target = columns.find((c) => c.id === toColumnId);
      if (target) {
        const ids = [...target.taskIds];
        ids.splice(index, 0, taskId);
        target.taskIds = ids;
      }
      return { ...state, columns };
    }

    case ACTIONS.ADD_COMMENT: {
      const { taskId, comment } = action.payload;
      const task = {
        ...state.tasks[taskId],
        comments: [...state.tasks[taskId].comments, comment],
        updatedAt: nowISO(),
      };
      return { ...state, tasks: { ...state.tasks, [taskId]: task } };
    }

    case ACTIONS.ADD_ATTACHMENT: {
      const { taskId, attachment } = action.payload;
      const task = {
        ...state.tasks[taskId],
        attachments: [...state.tasks[taskId].attachments, attachment],
        updatedAt: nowISO(),
      };
      return { ...state, tasks: { ...state.tasks, [taskId]: task } };
    }

    default:
      return state;
  }
}