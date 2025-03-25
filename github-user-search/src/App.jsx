import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserCard from "./components/UserCard";
import Search from "./components/Search";
import { fetchUserData } from "./services/githubService";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const dummyUser = {
    login: "octocat",
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
    html_url: "https://github.com/octocat",
};

const [user, setUser] = useState(null);
const [error, setError] = useState("");

const handleSearch = async (username) => {
    setError(""); // Clear previous errors
    setUser(null); // Reset user data before new search

    const userData = await fetchUserData(username);
    if (userData) {
        setUser(userData);
    } else {
        setError("User not found or an error occurred.");
    }
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
        <div>
            <h1>GitHub User Search</h1>
            <Search onSearch={handleSearch} />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {user && (
                <div>
                    <h2>{user.name || "No Name Available"}</h2>
                    <p>Username: {user.login}</p>
                    <img src={user.avatar_url} alt="User Avatar" width={100} />
                    <p>Bio: {user.bio || "No bio available"}</p>
                    <p>Followers: {user.followers} | Following: {user.following}</p>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
                </div>
            )}
        </div>
    </>
  )
}

export default App
