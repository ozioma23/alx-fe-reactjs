import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import HomePage from "./components/HomePage"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="AddRecipeForm/"element={<AddRecipeForm/>}/>
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
      </Router>
    </>
  )
}
export default App;
