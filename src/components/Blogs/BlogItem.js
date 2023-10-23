import React, { useContext } from 'react'
import './Blogs.css'
import BlogContext from '../../context/BlogContext'
import { Link } from 'react-router-dom'

const BlogItem = (props) => {

    const context = useContext(BlogContext)

    const { blog } = props

    function truncateText(text, maxLength) {
        if (text.split(' ').length > maxLength) {
            const words = text.split(' ').slice(0, maxLength).join(' ');
            return words + '...';
        } else {
            return text;
        }
    }

    return (
        <div className='col-md-4 col-6 my-2'>
            <div className="card">
                <img src={blog.imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{truncateText(blog.content, 15)}</p>
                    <Link to={`/blogs/${blog._id}`} className="btn btn-primary">Read Now</Link>
                </div>
            </div>
        </div>
    )
}

export default BlogItem