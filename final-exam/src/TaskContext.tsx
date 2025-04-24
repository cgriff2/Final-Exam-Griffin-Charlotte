import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Task = {
  taskId: string;
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  category?: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleCompleted: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  categories: string[];
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
  const LOCAL_STORAGE_KEY = 'tasks';
  const LOCAL_CATEGORIES_KEY = 'categories';
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to load tasks from localStorage:', err);
      return [];
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CATEGORIES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to load categories from localStorage:', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(categories));
    } catch (err) {
      console.error('Failed to save categories to localStorage:', err);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to parse tasks from localStorage:', err);
    }
  }, [tasks]);

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [...prev, task]);
    addCategoryIfNew(task.category || '');
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(t => (t.taskId === updatedTask.taskId ? updatedTask : t)));
    addCategoryIfNew(updatedTask.category || '');
  }, []);

  const toggleCompleted = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => (t.taskId === taskId ? { ...t, completed: !t.completed } : t)));
  }, []);

  const deleteTask = useCallback((deletedTaskId: string) => {
    setTasks(prev => prev.filter(t => t.taskId !== deletedTaskId));
  }, []);

  const addCategoryIfNew = useCallback((category: string) => {
    if (category && !categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  }, [categories]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, toggleCompleted, deleteTask, categories }}>
      {children}
    </TaskContext.Provider>
  );
};