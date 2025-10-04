import type React from "react";
import { useState } from "react";
import PageLayout from "./PageLayout";

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
        </PageLayout>
    );
};

export default Dashboard;