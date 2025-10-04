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
            <h1>Dashboard</h1>
            
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
                </Col>
            </Row>
        </PageLayout>
    );
};

export default Dashboard;