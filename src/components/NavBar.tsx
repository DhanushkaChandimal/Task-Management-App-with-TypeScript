import type React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar :React.FC = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Task Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated && 
                            <>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link href="/create-task">Create Task</Nav.Link>
                            </>
                        }
                    </Nav>
                    <Nav>
                        <LoginButton/>
                        <LogoutButton/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;