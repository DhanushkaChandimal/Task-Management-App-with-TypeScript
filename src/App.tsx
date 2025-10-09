import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import Dashboard from "./components/Dashboard"
import AuthenticationGuard from "./components/AuthenticationGuard"
import TaskForm from "./components/TaskForm"
import { TaskProvider } from "./context/TaskContexts"

function App() {

  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard} />}></Route>
        <Route path="/create-task" element={<AuthenticationGuard component={() => <TaskForm mode="create" />} />}></Route>
        <Route path="/edit-task/:id" element={<AuthenticationGuard component={() => <TaskForm mode="edit" />} />}></Route>
      </Routes>
    </TaskProvider>
  )
}

export default App
