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

    return (
        <PageLayout>
            <h1>Create Task</h1>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Task Title <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Description <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter your description here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
                    >
                        {priorityOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "pending" | "in-progress" | "completed")}
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                    
                <Form.Group>
                    <Form.Label>
                        Due Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
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