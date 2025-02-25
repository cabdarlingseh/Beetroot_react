import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SinglePost() {
    const { postId } = useParams();
    const numericPostId = parseInt(postId, 10);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                console.log(`Fetching post with ID: ${numericPostId}`);
                const response = await axios.get(
                    `https://api.slingacademy.com/v1/sample-data/blog-posts/${numericPostId}`
                );
                console.log('API response:', response.data);
                if (response.data.success) {
                    setPost(response.data.blog);
                    setLoading(false);
                } else {
                    throw new Error('API response unsuccessful');
                }
            } catch (error) {
                setError('Failed to fetch post: ' + error.message);
                setLoading(false);
            }
        };
        fetchPost();
    }, [numericPostId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className="single-post">
            <h2>{post.title}</h2>
            {post.photo_url && (
                <img src={post.photo_url} alt={post.title} className="post-image" />
            )}
            <div className="post-content">{post.content_html}</div>
            <p className="post-date">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
            </p>
        </div>
    );
}