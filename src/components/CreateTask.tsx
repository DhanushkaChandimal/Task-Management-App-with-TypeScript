import type React from "react";
import PageLayout from "./PageLayout";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import TaskContexts from "../context/TaskContexts";

const priorityOptions = [
    {value: "low", label: "Low Priority"},
    {value: "medium", label: "Medium Priority"},
    {value: "high", label: "High Priority"}
];

type Priority = "low" | "medium" | "high";

interface TaskData {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    completed: boolean;
    dueDate: string;
};

const CreateTask : React.FC = () => {
    const { tasks, setTasks } = useContext(TaskContexts);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TaskData>({
        id:0,
        title: "",
        description: "",
        priority: "low",
        completed: false,
        dueDate: ""
    });
    const [validated, setValidated] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }else{
            setTasks([...tasks, formData]);
            alert("Task created successfully!");
            navigate("/dashboard");
        }
        setValidated(true);
    }

    const handleCancel = () => {
        const hasData = formData.title.trim() || formData.description.trim();
        
        if (hasData) {
            const confirmDiscard = window.confirm(
                "You have unsaved data. Are you sure you want to cancel?"
            );
            if (!confirmDiscard) return;
        }
        
        navigate("/dashboard");
    };

    return (
        <PageLayout>
            <h1>Create Task</h1>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Task Title <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Please enter your task title here"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, ["title"]: e.target.value})}
                        required
                        maxLength={100}
                        autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                        Title is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Description <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter your description here"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, ["description"]: e.target.value})}
                        required
                        maxLength={500}
                    />
                    <Form.Control.Feedback type="invalid">
                        Description is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, ["priority"]: e.target.value as Priority})}
                        required
                    >
                        {priorityOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                    
                <Form.Group className="mb-3">
                    <Form.Label>
                        Due Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, ["dueDate"]: e.target.value})}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <Form.Control.Feedback type="invalid">
                        Invalid due date
                    </Form.Control.Feedback>
                </Form.Group>

                <div>
                    <Button type="submit">Create Task</Button>
                    <Button
                        variant="outline-secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </PageLayout>
    );
};

export default CreateTask;