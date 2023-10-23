import React, { useContext, useState } from 'react'
import BlogContext from '../../context/BlogContext'
import { Link } from 'react-router-dom'

const AddBlog = () => {
    const context = useContext(BlogContext);
    const { addBlog } = context;

    const [blog, setBlog] = useState({ title: "", content: "", tag: "Default", imgUrl: "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" });

    const handleSubmit = (e) => {
        e.preventDefault();
        addBlog(blog.title, blog.content, blog.tag, blog.imgUrl);
        alert('Blog added successfully')
    };

    const onChange = (e) => {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value
        });
    };
    

    return (
        <div>
            <h3 className='myNotes'>Create a new Blog</h3>
            <form className='my-4'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" id="content" name='content' rows="3" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="imgUrl" className="form-label">Image URL (if any)</label>
                    <input type="text" className="form-control" id="imgUrl" name='imgUrl' rows="3" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default AddBlog;
