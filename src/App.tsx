import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import Dashboard from "./components/Dashboard"
import AuthenticationGuard from "./components/AuthenticationGuard"
import CreateTask from "./components/CreateTask"
import { TaskProvider } from "./context/TaskContexts"

function App() {

  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard} />}></Route>
        <Route path="/create-task" element={<AuthenticationGuard component={CreateTask} />}></Route>
      </Routes>
    </TaskProvider>
  )
}

export default App
