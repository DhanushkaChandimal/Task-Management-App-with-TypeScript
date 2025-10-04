import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

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
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const completionPercentage = (completedTasks / totalTasks) * 100;

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "danger";
            case "medium": return "warning";
            case "low": return "success";
            default: return "secondary";
        }
    };

    return(
        <PageLayout>
            <Container fluid className="py-4">
                <Row className="mb-4">
                    <Col>
                        <h1 className="h2 mb-1">Dashboard</h1>
                        <p className="text-muted mb-0">Welcome back! Here's what's happening with your tasks today.</p>
                    </Col>
                </Row>
            
                <Row className="mb-4">
                    <Col md={3} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                                style={{width: '48px', height: '48px'}}>
                                            📋
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="text-muted mb-1">Total Tasks</h5>
                                        <h3 className="mb-0">{totalTasks}</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" 
                                                style={{width: '48px', height: '48px'}}>
                                            ✅
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="text-muted mb-1">Completed</h5>
                                        <h3 className="mb-0">{completedTasks}</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" 
                                                style={{width: '48px', height: '48px'}}>
                                            ⏳
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="text-muted mb-1">Pending</h5>
                                        <h3 className="mb-0">{totalTasks - completedTasks}</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center" 
                                                style={{width: '48px', height: '48px'}}>
                                            📊
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="text-muted mb-1">Progress</h5>
                                        <h3 className="mb-0">{Math.round(completionPercentage)}%</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white border-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Tasks</h5>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                                            Filter
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>All Tasks</Dropdown.Item>
                                            <Dropdown.Item>Pending</Dropdown.Item>
                                            <Dropdown.Item>Completed</Dropdown.Item>
                                            <Dropdown.Item>High Priority</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Card.Header>
                            <Card.Body>
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
                                                <Badge bg={getPriorityColor(task.priority)} className="me-2">
                                                    {task.priority}
                                                </Badge>
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PageLayout>
    );
};

export default Dashboard;