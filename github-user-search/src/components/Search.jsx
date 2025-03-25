import React, { useState } from "react";
import { fetchUserData } from '../services/githubService';

const Search = ({ onSearch }) => {
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [minRepos, setMinRepos] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError("");
        setUsers([]);
        setPage(1); // Reset pagination

        const userData = await onSearch(username, location, minRepos, 1); 
        if (userData && userData.length > 0) {
            setUsers(userData);
            setHasMore(userData.length === 30); // If 30 results, there may be more pages
        } else {
            setError("No users found.");
            setHasMore(false);
        }
        setLoading(false);
    };

    const loadMoreUsers = async () => {
        setLoading(true);
        const nextPage = page + 1;
        const moreUsers = await onSearch(username, location, minRepos, nextPage);
        
        if (moreUsers && moreUsers.length > 0) {
            setUsers((prevUsers) => [...prevUsers, ...moreUsers]);
            setHasMore(moreUsers.length === 30);
            setPage(nextPage);
        } else {
            setHasMore(false);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">GitHub User Search</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Min Repositories (optional)"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Search
                </button>
            </form>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {users.length > 0 && (
                <div className="mt-6">
                    <ul className="space-y-3">
                        {users.map((user) => (
                            <li key={user.id} className="border p-3 rounded-lg flex items-center gap-3">
                                <img src={user.avatar_url} alt="User Avatar" width={50} className="rounded-full" />
                                <div>
                                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                        <p className="font-semibold text-lg">{user.login}</p>
                                    </a>
                                    <p className="text-gray-600">{user.location || "No location"}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {hasMore && (
                        <button
                            onClick={loadMoreUsers}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4"
                        >
                            Load More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;