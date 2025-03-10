import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import '../assets/BlogPage.scss';
import Lottie from "lottie-react";
import Loading_icon from '../images/loading.json';

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const [totalPosts, setTotalPosts] = useState(0);


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
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const offset = (currentPage - 1) * postsPerPage;
                const response = await axios.get(
                    `https://api.slingacademy.com/v1/sample-data/blog-posts?offset=${offset}&limit=${postsPerPage}`
                );

                // console.log('API Response:', response.data);

                if (response.data.success) {
                    setPosts(response.data.blogs);
                    setTotalPosts(response.data.total_blogs || 0);
                    setLoading(false);
                }
                else {
                    throw new Error("API response unsuccessful");
                }
            }
            catch (error) {
                setError('Failed to fetch blog posts: ' + error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const totalPages = Math.ceil(totalPosts / postsPerPage) || 1;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);

            // console.log(`Page changed to: ${page}`);
        }
    };

    if (loading) return <Lottie animationData={Loading_icon} loop={true} className="loading_icon" />;
    if (error) return <div>{error}</div>;

    return (
        <div className="blog-page">
            <h2>Blog Posts</h2>

            <div className="post-list">

                {posts.map((post) => (

                    <div key={post.id} className="post-preview">

                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        {post.photo_url && (
                            <img src={post.photo_url} alt={post.title} className="preview-image" />
                        )}

                        <div className="read_more_button">
                            <NavLink to={`/blog/${post.id}`} key={post.id} className='btn btn-danger '>Read More</NavLink>
                        </div>

                    </div>
                ))}

            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>

            <div>
                <Link to='/homework' className="go_home">Go Back To Homeworks</Link>
            </div>
        </div>
    );
}