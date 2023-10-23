import React, { useState } from 'react'
import BlogContext from './BlogContext'

const BlogState = (props) => {

    const host = "https://blog-backend55-97ceda30cc73.herokuapp.com"

    const blogsInitial = []
    const [blogs, setBlogs] = useState(blogsInitial)

    const getBlogById = (blogId) => {
        return blogs.find(blog => blog._id === blogId);
    };

    // Fetch all blogs (Logged in)
    const allBlogs = async () => {

        const url = `${host}/api/blogs/fetchallblogs`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setBlogs(json)
    }

    // Fetch all blogs (Guest login)
    const allAvBlogs = async () => {

        const url = `${host}/api/blogs/allblogs`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        setBlogs(json)
    }

    // Add a Blog
    const addBlog = async (title, content, tag, imgUrl) => {

        const url = `${host}/api/blogs/addblog`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, content, tag, imgUrl }),
        });
        const json = await response.json();

        // console.log(json)

        const blog = {
            "title": title,
            "content": content,
            "imgUrl": imgUrl,
        }
        setBlogs(blogs.concat(blog))

        return json._id;
    }

    // Edit a Blog
    const editBlog = async (id, title, content, tag, imgUrl) => {

        const url = `${host}/api/blogs/updateblog/${id}`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, content, tag, imgUrl }),
        });
        const json = response.json();

        for (let index = 0; index < blogs.length; index++) {
            const element = blogs[index];
            if (element._id === id) {
                element.title = title;
                element.content = content;
                element.tag = tag
            }
        }
    }

    // Delete a Blog
    const deleteBlog = async (id) => {
        const url = `${host}/api/blogs/deleteblog/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const newBlog = blogs.filter((blog) => { return blog._id !== id })
        setBlogs(newBlog)
    }

    const blogDetails = async (id) => {
        const url = `${host}/api/blogs/bloginfo/${id}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json()

        return res;
    }

    return (
        <BlogContext.Provider value={{ blogs, addBlog, editBlog, deleteBlog, allBlogs, allAvBlogs, getBlogById, blogDetails }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;