import React, { useState } from 'react';
import { TaskProvider, useTasks, Task } from './TaskContext';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const PlannerApp = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [currentWeekOffset, setWeekOffset] = useState(0);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortMode, setSortMode] = useState<'title' | 'priority'>('title');

  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay() + currentWeekOffset * 7));

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const handleToggleComplete = (task: Task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center gap-20 my-4">
        <div className="flex gap-5">
          <button
            className="bg-gray-800 text-white rounded px-4 py-2 font-bold hover:bg-gray-700 transition"
            onClick={() => setWeekOffset(o => o - 1)}
          >
            ← Previous
          </button>
          <button
            className="bg-gray-800 text-white rounded px-4 py-2 font-bold hover:bg-gray-700 transition"
            onClick={() => setWeekOffset(o => o + 1)}
          >
            Next →
          </button>
        </div>
      </div>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(s => !s)}
        />
        <span className="font-medium">Show Completed Tasks</span>
      </label>

      <select value={sortMode} onChange={(e) => setSortMode(e.target.value as any)}>
        <option value="title">Sort by Title</option>
        <option value="priority">Sort by Priority</option>
      </select>

      <div className="grid grid-cols-7 gap-4 mt-4">
        {weekDates.map(date => {
          const dayTasks = tasks
            .filter(task => task.date === date)
            .filter(task => showCompleted || !task.completed);
          const dateObj = new Date(date);
          const label = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
          const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
          const sortedTasks = [...dayTasks].sort((a, b) => {
            if (sortMode === 'title') return a.title.localeCompare(b.title);
            if (sortMode === 'priority') return a.priority.localeCompare(b.priority);
            return 0;
          });

          return (
            <div
              key={date}
              className="border border-gray-300 rounded p-3 min-h-[200px] flex flex-col bg-gray-50"
            >
              <div className="text-center mb-2 font-semibold">
                {label}
                <div className="text-sm text-gray-500">{weekday}</div>
              </div>
              <ul className="flex-grow space-y-2">
                {sortedTasks.map(task => (
                  <TaskItem
                    key={task.taskId}
                    taskId={task.taskId}
                    title={task.title}
                    completed={task.completed}
                    priority={task.priority}
                    onToggleCompleted={() => handleToggleComplete(task)}
                    onEdit={() => setEditingTask(task)}
                    onDelete={() => deleteTask(task.taskId)}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {!editingTask && (
        <button
          className="bg-blue-700 text-white px-6 py-3 mt-6 rounded hover:bg-blue-800 transition"
          onClick={() =>
            setEditingTask({
              taskId: '',
              title: '',
              description: '',
              date: new Date().toISOString().split('T')[0],
              priority: 'medium',
              completed: false,
            })
          }
        >
          + Add Task
        </button>
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          closeForm={() => setEditingTask(null)}
          onDelete={() => {
            if (editingTask) {
              deleteTask(editingTask.taskId);
              setEditingTask(null);
            }
          }}
          updateTask={updateTask}
          addTask={addTask}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <TaskProvider>
      <PlannerApp />
    </TaskProvider>
  );
}
