
import axios from "axios";

const API_KEY = import.meta.env.VITE_GITHUB_API_KEY; // Access environment variable

export const fetchUserData = async (username, location = "", minRepos = "") => {
    try {
        let query = `q=${username}`;

        if (location) {
            query += `+location:${location}`;
        }
        if (minRepos) {
            query += `+repos:>${minRepos}`;
        }

        const response = await axios.get("https://api.github.com/search/users?q={query}", {
            headers: {
                Authorization: `token ${API_KEY}`, // Pass API key if required
                Accept: "application/vnd.github.v3+json",
            }
        });

        return response.data.items || []; // Returns list of users
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export default fetchUserData;