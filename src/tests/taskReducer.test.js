import { describe, it, expect } from 'vitest';
import { taskReducer } from '../context/taskReducer';
import { ACTIONS, defaultState } from '../constants';

describe('taskReducer', () => {

  it('should return default state for unknown action', () => {
    const initialState = defaultState();
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = taskReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should create a new task', () => {
    const initialState = defaultState();
    const newTask = {
      id: 'task-1',
      title: 'Test task',
    };
    const action = {
      type: ACTIONS.CREATE_TASK,
      payload: { task: newTask },
    };
    const newState = taskReducer(initialState, action);

    // Task is added to tasks object
    expect(newState.tasks['task-1']).toBeDefined();
    expect(newState.tasks['task-1'].title).toBe('Test task');
    // Task is added to 'todo' column
    const todoColumn = newState.columns.find((col) => col.id === 'todo');
    expect(todoColumn.taskIds).toContain('task-1');
    expect(todoColumn.taskIds[0]).toBe('task-1'); // Added to the start
  });

  it('should delete a task', () => {
    const initialState = {
      ...defaultState(),
      tasks: {
        'task-1': { id: 'task-1', title: 'Task to delete' },
      },
      columns: [
        { id: 'todo', taskIds: ['task-1'] },
        { id: 'inprogress', taskIds: [] },
        { id: 'testing', taskIds: [] },
        { id: 'review', taskIds: [] },
        { id: 'done', taskIds: [] },
      ],
    };

    const action = {
      type: ACTIONS.DELETE_TASK,
      payload: { taskId: 'task-1' },
    };
    const newState = taskReducer(initialState, action);

    // Task is removed from tasks object
    expect(newState.tasks['task-1']).toBeUndefined();
    // Task is removed from 'todo' column
    const todoColumn = newState.columns.find((col) => col.id === 'todo');
    expect(todoColumn.taskIds).not.toContain('task-1');
  });

  it('should move a task between columns', () => {
    const initialState = {
      ...defaultState(),
      tasks: { 'task-1': { id: 'task-1', title: 'Task to move' } },
      columns: [
        { id: 'todo', taskIds: ['task-1'] },
        { id: 'inprogress', taskIds: [] },
        { id: 'testing', taskIds: [] },
        { id: 'review', taskIds: [] },
        { id: 'done', taskIds: [] },
      ],
    };

    const action = {
      type: ACTIONS.MOVE_TASK,
      payload: { taskId: 'task-1', toColumnId: 'inprogress', index: 0 },
    };
    const newState = taskReducer(initialState, action);

    // Task is removed from 'todo'
    const todoColumn = newState.columns.find((col) => col.id === 'todo');
    expect(todoColumn.taskIds).not.toContain('task-1');
    // Task is added to 'inprogress'
    const inProgressColumn = newState.columns.find((col) => col.id === 'inprogress');
    expect(inProgressColumn.taskIds).toContain('task-1');
  });
});