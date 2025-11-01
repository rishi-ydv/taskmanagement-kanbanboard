import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { AppContext } from "./context/AppContext";
import { ACTIONS, COLUMNS } from "./constants";
import { nowISO } from "./utils/dateUtils";

// Import all your new components
import BoardHeader from "./components/BoardHeader";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";
import ToastContainer from "./components/Toast/ToastContainer";
import { useToasts } from "./components/Toast/useToasts";
import { TaskProvider } from "./context/TaskProvider";
import Footer from "./components/Footer";

// This is the inner app component that renders the board
function KanbanBoard() {
  const { state, dispatch } = useContext(AppContext);

  // UI-only state
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [draggingTaskId, setDraggingTaskId] = useState(null);

  // --- Event Handlers ---
  // All handlers are now simple functions that dispatch
  
  function createNewTask() {
    const t = {
      id: uuid(),
      title: "New task",
      description: "",
      assignee: null,
      priority: "Medium",
      labels: [],
      attachments: [],
      comments: [],
      createdAt: nowISO(),
      updatedAt: nowISO(),
      deadline: null,
      reminderMinutes: 60,
    };
    dispatch({ type: ACTIONS.CREATE_TASK, payload: { task: t } });
    setSelectedTask(t);
    setShowModal(true);
  }

  function handleOpenModal(task) {
    setSelectedTask(task);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedTask(null);
  }

  function handleSaveTask(patch) {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: { taskId: selectedTask.id, patch },
    });
  }

  function handleDeleteTask() {
    dispatch({
      type: ACTIONS.DELETE_TASK,
      payload: { taskId: selectedTask.id },
    });
    handleCloseModal();
  }

  function handleMoveTask(toColumnId) {
    dispatch({
      type: ACTIONS.MOVE_TASK,
      payload: { taskId: selectedTask.id, toColumnId, index: 0 },
    });
  }

  function handleAddComment(author, text) {
    const comment = { id: uuid(), author, text, createdAt: nowISO() };
    dispatch({
      type: ACTIONS.ADD_COMMENT,
      payload: { taskId: selectedTask.id, comment },
    });
  }

  function handleAttachFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const att = {
        id: uuid(),
        name: file.name,
        size: file.size,
        dataUrl,
        createdAt: nowISO(),
      };
      dispatch({
        type: ACTIONS.ADD_ATTACHMENT,
        payload: { taskId: selectedTask.id, attachment: att },
      });
    };
    reader.readAsDataURL(file);
  }

  // --- Drag and Drop Handlers ---
  function onDragStart(e, taskId) {
    e.dataTransfer.setData("text/plain", taskId);
    setDraggingTaskId(taskId);
  }

  function onDragEnd() {
    setDraggingTaskId(null);
  }

  function onDrop(e, columnId) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    dispatch({
      type: ACTIONS.MOVE_TASK,
      payload: { taskId, toColumnId: columnId, index: 0 },
    });
    setDraggingTaskId(null);
  }

  // --- Render ---
  return (
    <div className="min-h-screen bg-slate-100 font-inter p-4 md:p-8 flex flex-col">
      <BoardHeader
        filter={filter}
        onFilterChange={setFilter}
        onNewTask={createNewTask}
      />

      <main className="mt-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {state.columns.map((col) => {
            const tasks = col.taskIds
              .map((id) => state.tasks[id])
              .filter(Boolean)
              .filter((t) =>
                filter
                  ? (t.title + " " + t.description)
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  : true
              );
            return (
              <TaskColumn
                key={col.id}
                column={COLUMNS.find((c) => c.id === col.id)}
                tasks={tasks}
                onDrop={onDrop}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onOpenModal={handleOpenModal}
                draggingTaskId={draggingTaskId}
              />
            );
          })}
        </div>
      </main>

      {showModal && selectedTask && (
        <TaskModal
          task={state.tasks[selectedTask.id]}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
          onAddComment={handleAddComment}
          onAttach={handleAttachFile}
        />
      )}
      <Footer />
    </div>
  );
}

// This is the new top-level App component
// Its job is to set up all the providers
export default function App() {
  const { toasts, showToast, removeToast } = useToasts();

  return (
    // The TaskProvider needs showToast for the reminder hook
    <TaskProvider showToast={showToast}>
      <KanbanBoard />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </TaskProvider>
  );
}