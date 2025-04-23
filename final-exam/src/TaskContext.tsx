import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCallback } from 'react';

export type Task = {
  taskId: string;
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleCompleted: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};



export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const LOCAL_STORAGE_KEY = 'tasks';

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) setTasks(JSON.parse(saved));
    } catch (err) {
      console.error('Failed to parse tasks from localStorage:', err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t.taskId === updatedTask.taskId ? updatedTask : t)));
  }, []);

  const toggleCompleted = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => (t.taskId === taskId ? { ...t, completed: !t.completed } : t)));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.taskId !== taskId));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, toggleCompleted, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

