import type React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import TaskContexts from "../context/TaskContexts";

interface ToastData {
    message: string;
    variant: 'success' | 'danger';
    show: boolean;
}

const Dashboard : React.FC = () => {
    const { tasks, setTasks } = useContext(TaskContexts);
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState<string>("all");
    const [toastData, setToastData] = useState<ToastData | undefined>(undefined);

    useEffect(() => {
        const state = location.state as { toast?: ToastData } | null;
        if (state?.toast) {
            setToastData(state.toast);
            
            setTimeout(() => {
                setToastData(prev => prev ? { ...prev, show: false } : undefined);
            }, 3000);
        }
    }, [location.state]);

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

    const getFilteredTasks = () => {
        switch (filter) {
            case "pending":
                return tasks.filter(task => !task.completed);
            case "completed":
                return tasks.filter(task => task.completed);
            case "high":
                return tasks.filter(task => task.priority === "high");
            case "medium":
                return tasks.filter(task => task.priority === "medium");
            case "low":
                return tasks.filter(task => task.priority === "low");
            default:
                return tasks;
        }
    };

    const getFilterLabel = () => {
        switch (filter) {
            case "pending": return "Pending Tasks";
            case "completed": return "Completed Tasks";
            case "high": return "High Priority";
            case "medium": return "Medium Priority";
            case "low": return "Low Priority";
            default: return "All Tasks";
        }
    };

    const filteredTasks = getFilteredTasks();

    return(
        <PageLayout toastData={toastData}>
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
                                    <h5 className="mb-0">Tasks ({getFilterLabel()})</h5>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                                            {getFilterLabel()}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item 
                                                active={filter === "all"}
                                                onClick={() => setFilter("all")}
                                            >
                                                All Tasks
                                            </Dropdown.Item>
                                            <Dropdown.Item 
                                                active={filter === "pending"}
                                                onClick={() => setFilter("pending")}
                                            >
                                                Pending
                                            </Dropdown.Item>
                                            <Dropdown.Item 
                                                active={filter === "completed"}
                                                onClick={() => setFilter("completed")}
                                            >
                                                Completed
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item 
                                                active={filter === "high"}
                                                onClick={() => setFilter("high")}
                                            >
                                                High Priority
                                            </Dropdown.Item>
                                            <Dropdown.Item 
                                                active={filter === "medium"}
                                                onClick={() => setFilter("medium")}
                                            >
                                                Medium Priority
                                            </Dropdown.Item>
                                            <Dropdown.Item 
                                                active={filter === "low"}
                                                onClick={() => setFilter("low")}
                                            >
                                                Low Priority
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {filteredTasks.length === 0 ? (
                                    <Alert variant="info" className="text-center">
                                        {tasks.length === 0 ? (
                                            <div>
                                                <h6>No tasks yet!</h6>
                                                <p className="mb-0">Create your first task to get started.</p>
                                                <Button 
                                                    variant="primary" 
                                                    className="mt-3"
                                                    onClick={() => navigate('/create-task')}
                                                >
                                                    Create Task
                                                </Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <h6>No tasks match the current filter</h6>
                                                <p className="mb-0">Try selecting a different filter or create a new task.</p>
                                                <Button 
                                                    variant="outline-primary" 
                                                    className="mt-3 me-2"
                                                    onClick={() => setFilter("all")}
                                                >
                                                    Show All Tasks
                                                </Button>
                                            </div>
                                        )}
                                    </Alert>
                                ) : (
                                    <div>
                                        {filteredTasks.map((task) => (
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
                                                        {task.title}
                                                    </div>
                                                    <small className="text-muted">Due: {task.dueDate}</small>
                                                </div>
                                                <Badge bg={getPriorityColor(task.priority)} className="me-2">
                                                    {task.priority}
                                                </Badge>
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => navigate(`/edit-task/${task.id}`)}
                                                >
                                                    ✏️
                                                </Button>
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