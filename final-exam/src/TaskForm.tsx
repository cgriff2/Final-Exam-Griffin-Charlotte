import React, { useState } from 'react';
import { Task } from './TaskContext';

interface TaskFormProps {
  task: Task;
  closeForm: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, closeForm }) => {
  const [formTask, setFormTask] = useState(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call your task saving logic here
    closeForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 mt-6 border border-gray-300 rounded-lg bg-gray-50 max-w-xl mx-auto"
    >
      <label className="flex flex-col font-semibold">
        Title
        <input
          name="title"
          value={formTask.title}
          onChange={handleChange}
          className="mt-1 px-3 py-2 border border-gray-300 rounded"
        />
      </label>

      <label className="flex flex-col font-semibold">
        Description
        <textarea
          name="description"
          value={formTask.description}
          onChange={handleChange}
          className="mt-1 px-3 py-2 border border-gray-300 rounded resize-none"
        />
      </label>

      <label className="flex flex-col font-semibold">
        Date
        <input
          type="date"
          name="date"
          value={formTask.date}
          onChange={handleChange}
          className="mt-1 px-3 py-2 border border-gray-300 rounded"
        />
      </label>

      <label className="flex flex-col font-semibold">
        Priority
        <select
          name="priority"
          value={formTask.priority}
          onChange={handleChange}
          className="mt-1 px-3 py-2 border border-gray-300 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <div className="flex justify-between gap-4 mt-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
