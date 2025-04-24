import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
interface TaskItemProps {
  taskId: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  onToggleCompleted: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100';
    case 'medium': return 'bg-orange-100';
    case 'low': return 'bg-yellow-100';
    default: return '';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  completed,
  priority,
  onToggleCompleted,
  onEdit,
  onDelete,
}) => {
  return (
    <li
      className={`
        ${getPriorityColor(priority)}
        p-3 rounded-lg transition-all cursor-pointer min-h-[30px] overflow-hidden
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
          className="ml-1 px-1 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Pencil size={18} />
        </button>
        <button 
          onClick={onDelete} 
          className="ml-1 px-1 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
