import type { Task, Priority } from './types';

export const createTask = (title: string, priority: Priority): Task => ({
  id: Date.now(),
  title: title.trim(),
  completed: false,
  priority,
});

export const getPriorityClasses = (priority: Priority) => {
  return {
    bg: priority === 'high' 
      ? 'bg-red-100' 
      : priority === 'medium' 
        ? 'bg-yellow-100' 
        : 'bg-green-100',
    text: priority === 'high'
      ? 'text-red-800'
      : priority === 'medium'
        ? 'text-yellow-800'
        : 'text-green-800',
    border: priority === 'high'
      ? 'border-red-200'
      : priority === 'medium'
        ? 'border-yellow-200'
        : 'border-green-200'
  };
};
