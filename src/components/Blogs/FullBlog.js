import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BlogContext from '../../context/BlogContext'
import './Blogs.css'

const FullBlog = () => {

    const [details, setDetails] = useState({})

    const userSearch = async () => {
        const url = "https://blog-backend55-97ceda30cc73.herokuapp.com/api/auth/getuser"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        if (json.name) {
            setDetails(json)
        } else {
            console.error('Error occured')
        }
    }

    useEffect(() => {
        userSearch()
    }, [])

    const { blogId } = useParams();
    const context = useContext(BlogContext);
    const { blogDetails, deleteBlog } = context;

    const [blog, setBlog] = useState({})

    const fetchBlogData = async () => {
        const blogs = await blogDetails(blogId);
        setBlog(blogs)
    };

    useEffect(() => {
        fetchBlogData()
    }, [blogId])

    if (!blog.title) {
        return (
            <div class="container homeWrapper full-view">
                <div className="error-cont">
                    Blog either deleted or not available.
                </div>
            </div>
        )
    }
    else {
        return (
            <div class="container homeWrapper full-view">
                <div class="row">
                    <div class="col-md-12">
                        <div className="author">
                            <h3>
                                {blog.title}
                            </h3>
                            <h4>
                                Author: {blog.author}
                            </h4>
                        </div>
                        <img className='fullPrev' alt="Preview" src={blog.imgUrl} />
                        <p className='contentPrev my-4'>
                            {blog.content}
                        </p>
                        {blog.author === details._id && (
                            localStorage.getItem('token') ? (
                                <div className="editicons">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className="fa-regular fa-trash-can" onClick={() => { deleteBlog(blog._id) }}></i>
                                </div>
                            ) : (
                                <div></div>
                            )
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default FullBlog