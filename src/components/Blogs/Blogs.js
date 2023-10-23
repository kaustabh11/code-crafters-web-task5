import React, { useContext, useEffect } from 'react'
import BlogContext from '../../context/BlogContext'
import BlogItem from './BlogItem'
import './Blogs.css'

const Blogs = () => {
  const blog = useContext(BlogContext);
  const { blogs, allAvBlogs } = blog; // Use allAvBlogs instead of allBlogs

  useEffect(() => {
    allAvBlogs(); // Call allAvBlogs instead of allBlogs
  }, []);

  return (
    <>
      <div className='row my-3'>
        <h3 className='myNotes'>Latest Blogs</h3>
        {blogs.length > 0 ? (
          blogs.slice().reverse().map((blog) => {
            return <BlogItem key={blog._id} blog={blog} />;
          })
        ) : (
          <p>No blogs available.</p>
        )}

      </div>
    </>
  );
};

export default Blogs;
