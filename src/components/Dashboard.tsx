import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

type Task = {
    id: number;
    text: string;
    priority: "high" | "medium" | "low";
    completed: boolean;
    dueDate: string;
};

const Dashboard : React.FC = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: "Complete project proposal", priority: "high", completed: false, dueDate: "2025-10-05" },
        { id: 2, text: "Review client feedback", priority: "medium", completed: true, dueDate: "2025-10-03" },
        { id: 3, text: "Schedule team meeting", priority: "low", completed: false, dueDate: "2025-10-04" },
        { id: 4, text: "Update project documentation", priority: "medium", completed: false, dueDate: "2025-10-06" },
        { id: 5, text: "Prepare weekly report", priority: "high", completed: false, dueDate: "2025-10-07" }
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return(
        <PageLayout>
            <h1>Dashboard</h1>

            {tasks.length === 0 ? (
                <Alert variant="info" className="text-center">
                    <h6>No tasks yet!</h6>
                    <p className="mb-0">Create your first task to get started.</p>
                    <Button 
                        variant="primary" 
                        className="mt-3"
                        onClick={() => navigate('/create-task')}
                    >
                        Create Task
                    </Button>
                </Alert>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <div key={task.id} className="d-flex align-items-center p-3 mb-2 bg-light rounded">
                            <Form.Check
                                type="checkbox"
                                id={`task-${task.id}`}
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="me-3"
                            />
                            <div className="flex-grow-1">
                                <div className={`${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                                    {task.text}
                                </div>
                                <small className="text-muted">Due: {task.dueDate}</small>
                            </div>
                             <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => deleteTask(task.id)}
                            >
                                🗑️
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </PageLayout>
    );
};

export default Dashboard;