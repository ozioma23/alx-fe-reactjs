import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserCard from "./components/UserCard";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const dummyUser = {
    login: "octocat",
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
    html_url: "https://github.com/octocat",
};


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
            <h1>GitHub User Search</h1>
            <UserCard user={dummyUser} />
        </div>
    </>
  )
}

export default App
