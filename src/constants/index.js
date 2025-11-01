export const COLUMNS = [
  { id: "todo", title: "To Do", color: "bg-blue-400" },
  { id: "inprogress", title: "In Progress", color: "bg-yellow-400" },
  { id: "testing", title: "Testing", color: "bg-orange-400" },
  { id: "review", title: "Review", color: "bg-purple-400" },
  { id: "done", title: "Done", color: "bg-green-400" },
];

export const STORAGE_KEY = "taskboard:v3";

export const ACTIONS = {
  SET_STATE: "SET_STATE",
  CREATE_TASK: "CREATE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  MOVE_TASK: "MOVE_TASK",
  ADD_COMMENT: "ADD_COMMENT",
  ADD_ATTACHMENT: "ADD_ATTACHMENT",
};

export function defaultState() {
  return {
    users: [
      { id: "u1", name: "Alice" },
      { id: "u2", name: "Bob" },
      { id: "u3", name: "Charlie" },
    ],
    tasks: {},
    columns: COLUMNS.map((c) => ({ id: c.id, taskIds: [] })),
    createdAt: new Date().toISOString(),
  };
}