import type React from "react";
import PageLayout from "./PageLayout";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
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
}

interface TaskFormProps {
    mode?: 'create' | 'edit';
}

const TaskForm: React.FC<TaskFormProps> = ({ mode = 'create' }) => {
    const { tasks, setTasks, updateTask } = useContext(TaskContexts);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const isEditMode = mode === 'edit' || Boolean(id);
    
    const [formData, setFormData] = useState<TaskData>({
        id: 0,
        title: "",
        description: "",
        priority: "low",
        completed: false,
        dueDate: ""
    });
    const [validated, setValidated] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (isEditMode && id) {
            const taskToEdit = tasks.find(task => task.id === parseInt(id));
            if (taskToEdit) {
                setFormData(taskToEdit);
                setError("");
            } else {
                setError("Task not found!");
            }
        }
    }, [id, tasks, isEditMode]);

    const showToast = (message: string, variant: 'success' | 'danger' = 'success') => {
        navigate("/dashboard", { 
            state: { 
                toast: { message, variant, show: true } 
            } 
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            if (isEditMode) {
                if (updateTask) {
                    updateTask(formData.id, formData);
                } else {
                    const updatedTasks = tasks.map(task => 
                        task.id === formData.id ? formData : task
                    );
                    setTasks(updatedTasks);
                }
                showToast("🎉 Task updated successfully!", 'success');
            } else {
                const newTask: TaskData = {
                    ...formData,
                    id: Date.now(),
                    completed: false
                };
                setTasks([...tasks, newTask]);
                showToast("✨ Task created successfully!", 'success');
            }
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

    if (error) {
        return (
            <PageLayout>
                <Container className="py-4">
                    <Row className="justify-content-center">
                        <Col lg={8} xl={6}>
                            <Card className="shadow-sm border-0">
                                <Card.Body className="text-center p-4">
                                    <h4 className="text-danger">{error}</h4>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => navigate("/dashboard")}
                                        className="mt-3"
                                    >
                                        Back to Dashboard
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col lg={8} xl={6}>
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-primary text-white">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="mb-0">
                                        <i className="me-2">
                                            {isEditMode ? "✏️" : "➕"}
                                        </i>
                                        {isEditMode ? "Update Task" : "Create New Task"}
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

                                    {/* Show completion status in edit mode */}
                                    {isEditMode && (
                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                type="checkbox"
                                                id="completed-checkbox"
                                                label="Mark as completed"
                                                checked={formData.completed}
                                                onChange={(e) => setFormData({...formData, completed: e.target.checked})}
                                            />
                                        </Form.Group>
                                    )}

                                    <div className="d-flex gap-3 pt-3 border-top">
                                        <Button
                                            type="submit"
                                            className="flex-grow-1"
                                        >
                                            {isEditMode ? "Update Task" : "Create Task"}
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

export default TaskForm;