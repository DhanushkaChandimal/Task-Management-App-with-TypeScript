import { useAuth0 } from "@auth0/auth0-react";
import type React from "react";
import { Button } from "react-bootstrap";

const LogoutButton : React.FC = () => {
    const { logout, isAuthenticated } = useAuth0();

    const handleLogout = () => {
        logout ({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    if(isAuthenticated){
        return (
            <Button variant="outline-primary" onClick={handleLogout}>Log Out</Button>
        )
    }

    return null;
};

export default LogoutButton;