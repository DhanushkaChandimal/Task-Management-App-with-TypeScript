import type React from "react";
import PageLayout from "./PageLayout";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import TaskContexts from "../context/TaskContexts";

const priorityOptions = [
    {value: "low", label: "Low Priority", color: "success", icon: "🟢"},
    {value: "medium", label: "Medium Priority", color: "warning", icon: "🟡"},
    {value: "high", label: "High Priority", color: "danger", icon: "🔴"}
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
        } else {
            // Generate a unique ID for the new task
            const newTask: TaskData = {
                ...formData,
                id: Date.now(), // Generate unique ID using timestamp
                completed: false // Ensure new tasks start as incomplete
            };
            setTasks([...tasks, newTask]);
            alert("Task created successfully!");
            navigate("/dashboard");
        }
        setValidated(true);
    };

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
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col lg={8} xl={6}>
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-primary text-white">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="mb-0">
                                        <i className="me-2">➕</i>
                                        Create New Task
                                    </h3>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">
                                            Task Title <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Please enter your task title here"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            required
                                            maxLength={100}
                                            autoFocus
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Title is required
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">
                                            Description <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Enter your description here"
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            required
                                            maxLength={500}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Description is required
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-semibold">Priority</Form.Label>
                                                <Form.Select
                                                    value={formData.priority}
                                                    onChange={(e) => setFormData({...formData, priority: e.target.value as Priority})}
                                                    required
                                                >
                                                    {priorityOptions.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.icon} {option.label}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-semibold">
                                                    Due Date <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={formData.dueDate}
                                                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Invalid due date
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-flex gap-3 pt-3 border-top">
                                        <Button
                                            type="submit"
                                            className="flex-grow-1"
                                        >
                                            Create Task
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PageLayout>
    );
};

export default CreateTask;