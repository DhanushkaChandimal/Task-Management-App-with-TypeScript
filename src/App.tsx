import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
    </Routes>
  )
}

export default App
