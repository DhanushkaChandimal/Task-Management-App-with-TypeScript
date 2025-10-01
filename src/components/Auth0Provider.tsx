import { Auth0Provider } from "@auth0/auth0-react";
import type React from "react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderProps = {
    children: React.ReactNode;
};

const Auth0ProviderLocal : React.FC<Auth0ProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const domain = "dev-tq58j3rwst2eez34.us.auth0.com";
    const clientId = "g5ar1TnyJrK9Xuc414wjSlc9mc07eRXo" ;
    const redirectUri = "http://localhost:5173/callback";

    const onRedirectCallBack = (appState: { returnTo?: string } | undefined) => {
        navigate((appState && appState.returnTo) || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                scope: "openid profile email"
            }}
            onRedirectCallback={onRedirectCallBack}
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    )
};

export default Auth0ProviderLocal;