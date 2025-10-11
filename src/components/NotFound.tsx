import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <Container className="py-5">
                <Row className="justify-content-center align-items-center min-vh-75">
                    <Col lg={8} xl={6}>
                        <Card className="shadow-lg border-0 text-center">
                            <Card.Body className="p-5">
                                <div className="mb-4">
                                    <span 
                                        style={{ 
                                            fontSize: '6rem', 
                                            color: '#dc3545',
                                            lineHeight: 1 
                                        }}
                                    >
                                        🚫
                                    </span>
                                </div>

                                <h1 className="display-1 fw-bold text-danger mb-3">
                                    404
                                </h1>

                                <h2 className="h3 mb-3 text-dark">
                                    Oops! Page Not Found
                                </h2>

                                <p className="text-muted mb-4 fs-5">
                                    The page you're looking for doesn't exist or has been moved. 
                                    Don't worry, let's get you back on track!
                                </p>

                                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                    <Button 
                                        variant="primary" 
                                        size="lg"
                                        onClick={() => navigate("/")}
                                        className="px-4"
                                    >
                                        🏠 Go to Homepage
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PageLayout>
    );
};

export default NotFound;