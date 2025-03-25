import React, { useState } from "react";
import { fetchUserData } from '../services/githubServices';

const Search = ({ onSearch }) => {
    const [username, setUsername] = useState("");  // Stores input value
    const [loading, setLoading] = useState(false); // Tracks API loading state
    const [error, setError] = useState("");       // Stores error messages
    const [user, setUser] = useState(null);       // Stores fetched user data

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents page refresh
        if (!username.trim()) return;  // Stops if input is empty

        setLoading(true); // Show loading state
        setError(""); // Clear previous errors
        setUser(null); // Reset previous user data

        const userData = await onSearch(username); // Calls API function
        if (userData) {
            setUser(userData); // Store user data
        } else {
            setError("Looks like we can't find the user."); // Show error
        }
        setLoading(false); // Stop loading
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {user && (
                <div>
                    <img src={user.avatar_url} alt="User Avatar" width={100} />
                    <h2>{user.name || "No Name Available"}</h2>
                    <p>Username: {user.login}</p>
                    <p>Bio: {user.bio || "No bio available"}</p>
                    <p>Followers: {user.followers} | Following: {user.following}</p>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                        View Profile
                        "Looks like we cant find the user"
                    </a>
                </div>
    
            )}
        </div>
    );
};

export default Search;