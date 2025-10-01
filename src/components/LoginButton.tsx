import { useAuth0 } from "@auth0/auth0-react";
import type React from "react";
import { Button } from "react-bootstrap";

const LoginButton : React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect ({
            appState: {
                returnTo: "/dashboard",
            },
            authorizationParams: {
                prompt: "login",
            },
        });
    };

    if(!isAuthenticated){
        return (
            <Button variant="outline-primary" onClick={handleLogin}>Log In</Button>
        )
    }

    return null;
};

export default LoginButton;