import type React from "react";
import PageLayout from "./PageLayout";
import LoginButton from "./LoginButton";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const HomePage: React.FC = () => {
    return (
        <PageLayout>
            <section className="bg-primary text-white py-5">
                <Container>
                    <Row className="align-items-center min-vh-75">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <h1 className="display-4 fw-bold mb-4">
                                Master Your Tasks, <br />
                                <span className="text-warning">Achieve Your Goals</span>
                            </h1>
                            <p className="lead mb-4">
                                Stay organized, boost productivity, and never miss a deadline with our intuitive task management platform. Perfect for individuals and teams.
                            </p>
                        </Col>
                        <Col lg={6}>
                            <Card className="shadow-lg border-0 bg-light">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-success rounded-circle me-3" style={{width: '12px', height: '12px'}}></div>
                                        <h5 className="mb-0 text-dark">Today's Tasks</h5>
                                        <Badge bg="primary" className="ms-auto">4 pending</Badge>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                                            <input type="checkbox" className="form-check-input me-3" />
                                            <span className="text-dark">Complete project proposal</span>
                                            <Badge bg="danger" className="ms-auto">High</Badge>
                                        </div>
                                        <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm mt-2">
                                            <input type="checkbox" className="form-check-input me-3" checked readOnly />
                                            <span className="text-decoration-line-through text-muted">Review client feedback</span>
                                            <Badge bg="success" className="ms-auto">Done</Badge>
                                        </div>
                                        <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm mt-2">
                                            <input type="checkbox" className="form-check-input me-3" />
                                            <span className="text-dark">Schedule team meeting</span>
                                            <Badge bg="warning" className="ms-auto">Medium</Badge>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-5 bg-light">
                <Container>
                    <Row className="mb-5">
                        <Col lg={8} className="mx-auto text-center">
                            <h2 className="display-5 fw-bold text-dark mb-3">
                                Everything you need to stay productive
                            </h2>
                            <p className="lead text-muted">
                                Powerful features designed to help you organize, prioritize, and accomplish more
                            </p>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <Col md={12}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                         style={{width: '60px', height: '60px'}}>
                                        <i className="fas fa-tasks fs-4"></i>
                                        ✓
                                    </div>
                                    <h4 className="fw-bold text-dark mb-3">Smart Organization</h4>
                                    <p className="text-muted">
                                        Organize tasks by projects, priorities, and deadlines. Create custom categories that work for you.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-5 bg-dark text-white">
                <Container>
                    <Row className="text-center">
                        <Col lg={8} className="mx-auto">
                            <h2 className="display-5 fw-bold mb-3">
                                Ready to boost your productivity?
                            </h2>
                            <p className="lead mb-4">
                                Join thousands of users who have transformed their workflow with our task management platform
                            </p>
                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                <LoginButton />
                                <Button variant="outline-light" size="lg" className="fw-semibold px-4">
                                    Learn More
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageLayout>
    );
};

export default HomePage;