import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import Dashboard from "./components/Dashboard"
import AuthenticationGuard from "./components/AuthenticationGuard"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard} />}></Route>        
    </Routes>
  )
}

export default App
