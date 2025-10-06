import type React from "react";
import PageLayout from "./PageLayout";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const priorityOptions = [
    {value: "low", label: "Low Priority"},
    {value: "medium", label: "Medium Priority"},
    {value: "high", label: "High Priority"}
];

const statusOptions = [
    {value: "pending", label: "Pending"},
    {value: "in-progress", label: "In Progress"},
    {value: "completed", label: "Completed"}
];

const CreateTask : React.FC = () => {

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [priority, setPriority] = useState<"high" | "medium" | "low">()
    const [status, setStatus] = useState<"pending" | "in-progress" | "completed">()
    const [dueDate, setDueDate] = useState<string>("")
    const [validated, setValidated] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true)
    }

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
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Description is required
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
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
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "pending" | "in-progress" | "completed")}
                        required
                    >
                        {statusOptions.map(option => (
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
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Invalid due date
                    </Form.Control.Feedback>
                </Form.Group>

                <div>
                    <Button type="submit">Create Task</Button>
                    <Button>Cancel</Button>
                </div>
            </Form>
        </PageLayout>
    );
};

export default CreateTask;