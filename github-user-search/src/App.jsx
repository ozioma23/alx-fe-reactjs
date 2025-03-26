import { useState } from 'react'
import UserCard from "./components/UserCard";
import Search from "./components/Search";
import { fetchUserData } from "./services/githubService";

import './App.css'

function App() {
  

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
