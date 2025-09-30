import type React from "react"
import { Container } from "react-bootstrap";

type PageLayoutProps = {
    children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {
    return(
        <Container>
            {children}
        </Container>
    );
};

export default PageLayout;