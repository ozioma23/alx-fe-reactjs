import { useQuery } from 'react-query';

// Define a fetch function that can be used to fetch data from an API
const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }
    return res.json();
};

const PostsComponent = () => {
    // Use the useQuery hook to handle data fetching and caching
    const { data, error, isLoading, isError } = useQuery('fetchPosts', fetchPosts);

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;

    // Handle error state
    if (isError) return <div>Error loading data</div>;

    // Render the fetched data
    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostsComponent;