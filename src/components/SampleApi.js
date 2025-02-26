import { useState } from "react";
import './assets/ApiSample.scss';
import { Link } from "react-router-dom";

import '../components/assets/Home.scss';

const api_url = 'https://jsonplaceholder.typicode.com/posts';

export default function SampleApi() {
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPostById = async () => {
        if (!postId.trim()) {
            setError('Please enter a post ID.');
            setPost(null);
            return;
        }

        setLoading(true);
        setError(null);
        setPost(null);

        const controller = new AbortController();
        const signal = controller.signal;

        try {
            const res = await fetch(`${api_url}/${postId}`, { signal });
            if (!res.ok) throw new Error('Post not found. Please enter a valid ID.');

            const data = await res.json();
            setPost(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    };

    return (
        <div className="api-container">
            <h1>Fetch Post by ID</h1>

            <div className="input-group input_area">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Post ID (1-100)"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                />
                <button className="btn btn-primary" onClick={fetchPostById}>
                    Fetch Post
                </button>
            </div>

            {loading && <p>Loading...</p>}

            {error && <p className="error">{error}</p>}

            {post && (
                <div className="post">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            )}

            <div>
                <Link to='/' className="go_home">Go Home</Link>
            </div>
        </div>
    );
}
