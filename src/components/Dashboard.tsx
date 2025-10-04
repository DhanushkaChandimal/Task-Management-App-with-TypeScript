import type React from "react";
import { useState } from "react";
import PageLayout from "./PageLayout";
import Form from "react-bootstrap/Form";

const Dashboard : React.FC = () => {

    const [tasks, setTasks] = useState([
        { id: 1, text: "Complete project proposal", priority: "high", completed: false, dueDate: "2025-10-05" },
        { id: 2, text: "Review client feedback", priority: "medium", completed: true, dueDate: "2025-10-03" },
        { id: 3, text: "Schedule team meeting", priority: "low", completed: false, dueDate: "2025-10-04" },
        { id: 4, text: "Update project documentation", priority: "medium", completed: false, dueDate: "2025-10-06" },
        { id: 5, text: "Prepare weekly report", priority: "high", completed: false, dueDate: "2025-10-07" }
    ]);

    return(
        <PageLayout>
            <h1>Dashboard</h1>

            <div>
                {tasks.map((task) => (
                    <div key={task.id} className="d-flex align-items-center p-3 mb-2 bg-light rounded">
                        <Form.Check
                            type="checkbox"
                            id={`task-${task.id}`}
                            checked={task.completed}
                            className="me-3"
                        />
                        <div className="flex-grow-1">
                            <div className={`${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                                {task.text}
                            </div>
                            <small className="text-muted">Due: {task.dueDate}</small>
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

export default Dashboard;