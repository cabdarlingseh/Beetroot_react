import '../assets/SinglePost.scss';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import Lottie from "lottie-react";
import Loading_icon from '../images/loading.json';
import NotFound from '../NotFound';

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const setFullHeight = () => {
            if (loading) {
                document.body.style.height = '100vh';
            } else {
                document.body.style.height = '100%';
            }
        };

        setFullHeight();
        window.addEventListener('resize', setFullHeight);

        return () => {
            window.removeEventListener('resize', setFullHeight);
            document.body.style.height = 'auto';
        };
    }, [loading]);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {

                // console.log(`Fetching post with ID: ${id}`);

                const response = await axios.get(
                    `https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`
                );

                // console.log('API response:', response.data); 

                if (response.data.success) {
                    setPost(response.data.blog);
                    setLoading(false);
                }

                else {
                    throw new Error('API response unsuccessful');
                }
            }

            catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);


    if (loading) return <Lottie animationData={Loading_icon} loop={true} className="loading_icon" />;
    if (error) return <NotFound />;
    if (!post) return <div><Link to='/notfound'></Link></div>;

    const sanitizedContent = DOMPurify.sanitize(post.content_html);

    return (
        <div className="single-post">
            <h2>{post.title}</h2>
            {post.photo_url && (
                <img src={post.photo_url} alt={post.title} className="post-image" />
            )}
            <div className="post-content">
                {parse(sanitizedContent)}
            </div>
            <p className="post-date">
                Updated on: {new Date(post.updated_at).toLocaleDateString()}
            </p>
            <div className="back-link">
                <Link to="/blog" className="btn btn-secondary">Back to Blog</Link>
            </div>
        </div>

    );
}