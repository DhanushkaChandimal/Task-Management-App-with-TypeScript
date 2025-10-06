import { createContext, useState } from "react";
import type { ReactNode } from "react";

type Priority = "low" | "medium" | "high";

interface TaskData {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    completed: boolean;
    dueDate: string;
};

const dummyTasks: TaskData[] = [
  { id: 1, title: "Complete project proposal", description: "Draft and finalize the new project proposal", priority: "high", completed: false, dueDate: "2025-10-05" },
  { id: 2, title: "Review client feedback", description: "Go through feedback and suggest improvements", priority: "medium", completed: true, dueDate: "2025-10-03" },
  { id: 3, title: "Schedule team meeting", description: "Coordinate with the team and book a slot", priority: "low", completed: false, dueDate: "2025-10-04" },
  { id: 4, title: "Update project documentation", description: "Update requirements and technical notes", priority: "medium", completed: false, dueDate: "2025-10-06" },
  { id: 5, title: "Prepare weekly report", description: "Summarize progress and blockers", priority: "high", completed: false, dueDate: "2025-10-07" }
];

interface TaskContextType {
  tasks: TaskData[];
  setTasks: (tasks: TaskData[]) => void;
}

const TaskContexts = createContext<TaskContextType>({
  tasks: dummyTasks,
  setTasks: () => {}
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskData[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : dummyTasks;
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return dummyTasks;
    }
  });

  const updateTasks = (newTasks: TaskData[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  };
  
  return (
    <TaskContexts.Provider value={{ tasks, setTasks: updateTasks }}>
      {children}
    </TaskContexts.Provider>
  );
};

export default TaskContexts;