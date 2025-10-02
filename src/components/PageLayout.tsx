import type React from "react"
import Container from "react-bootstrap/Container";
import Navbar from "./NavBar";

type PageLayoutProps = {
    children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {
    return(
        <Container className="d-flex flex-column min-vh-100">
            <Navbar/>
            
            <main className="flex-grow-1">
                {children}
            </main>
            
            <footer className="bg-dark text-white py-3 text-center">
                <p className="mb-0">&copy; 2025 Dhanushka. All rights reserved.</p>
            </footer>
        </Container>
    );
};

export default PageLayout;