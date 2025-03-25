import axios from "axios";

const API_KEY = import.meta.env.VITE_GITHUB_API_KEY; // Access environment variable

const searchGithubUser = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${API_KEY}` // Pass API key if required
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export default searchGithubUser;