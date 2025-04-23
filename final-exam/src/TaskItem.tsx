import React from 'react';

interface TaskItemProps {
  taskId: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  onToggleCompleted: () => void;
  onEdit: () => void;
}

const priorityColors = {
  low: 'bg-yellow-100',
  medium: 'bg-orange-100',
  high: 'bg-red-100',
};

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  completed,
  priority,
  onToggleCompleted,
  onEdit,
}) => {
  return (
    <li
      className={`
        ${priorityColors[priority]}
        p-3 rounded-lg transition-all cursor-pointer min-h-[60px] overflow-hidden
        ${completed ? 'line-through opacity-60' : ''}
        hover:bg-blue-50
      `}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold truncate flex-1" onClick={onToggleCompleted}>
          {title}
        </span>
        <button
          onClick={onEdit}
          className="ml-4 px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
