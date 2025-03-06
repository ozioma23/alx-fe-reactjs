import { useQuery } from '@tanstack/react-query';

// Fetch function with error handling
const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }
    return res.json();
};
const PostsComponent = () => {
    // Use useQuery to handle data fetching, caching, and updating
    const { data, error, isLoading } = useQuery({
        queryKey: ['fetchData'], // Unique key for caching
        queryFn: fetchData,
    });
    // Handle loading state
    if (isLoading) return <div>Loading...</div>;
    // Handle error state
    if (error) return <div>Error: {error.message}</div>;
    // Render the fetched data
    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {data.map(post => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default PostsComponent;