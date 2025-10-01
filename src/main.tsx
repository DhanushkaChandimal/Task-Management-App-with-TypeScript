import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderLocal from './components/Auth0Provider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth0ProviderLocal>
      <App />
    </Auth0ProviderLocal>
  </BrowserRouter>,
)
