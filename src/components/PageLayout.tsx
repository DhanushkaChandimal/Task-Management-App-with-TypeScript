import type React from "react"
import Container from "react-bootstrap/Container";
import Navbar from "./NavBar";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface ToastData {
    message: string;
    variant: 'success' | 'danger' | 'warning' | 'info';
    show: boolean;
}

type PageLayoutProps = {
    children?: React.ReactNode;
    toastData?: ToastData;
    onToastClose?: () => void;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, toastData, onToastClose }) => {
    console.log('PageLayout toastData:', toastData);
    
    const getToastIcon = (variant: string) => {
        switch (variant) {
            case 'success': return '✅';
            case 'danger': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '✅';
        }
    };

    const getToastTitle = (variant: string) => {
        switch (variant) {
            case 'success': return 'Success';
            case 'danger': return 'Error';
            case 'warning': return 'Warning';
            case 'info': return 'Info';
            default: return 'Notification';
        }
    };

    return(
        <Container className="d-flex flex-column min-vh-100">
            <Navbar/>
            
            <main className="flex-grow-1">
                {children}
            </main>
            
            <footer className="bg-dark text-white py-3 text-center">
                <p className="mb-0">&copy; 2025 Dhanushka. All rights reserved.</p>
            </footer>
            
            {toastData?.show && (
                <ToastContainer
                    position="top-end" 
                    className="p-3"
                    style={{ zIndex: 1000 }}
                >
                    <Toast
                        show={toastData.show}
                        onClose={onToastClose}
                        delay={5000} 
                        autohide
                        bg={toastData.variant}
                    >
                        <Toast.Header>
                            <strong className="me-auto">
                                {getToastIcon(toastData.variant)} {getToastTitle(toastData.variant)}
                            </strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body className="text-white">
                            {toastData.message}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </Container>
    );
};

export default PageLayout;