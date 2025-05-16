export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}

// Extend the Window interface to include our custom functions
declare global {
  interface Window {
    toggleTask: (taskId: number) => void;
    deleteTask: (taskId: number) => void;
  }
}
