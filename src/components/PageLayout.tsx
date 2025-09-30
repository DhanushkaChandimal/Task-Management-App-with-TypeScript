import type React from "react"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Navbar from "./NavBar";

type PageLayoutProps = {
    children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {
    return(
        <Container>
            <Col>
                <Navbar/>
            </Col>
            {children}
        </Container>
    );
};

export default PageLayout;