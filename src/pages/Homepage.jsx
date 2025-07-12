import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import "../App.css"
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_URL;

const Homepage = () => {
  const navigate=useNavigate();
   const[blogs,setBlogs]=useState([]);
  useEffect(()=>{
    fetch(`${BASE_URL}/`).then(Res=>{
      return Res.json();
    }).then(data=>{
      // console.log("data recieved ",data);
      setBlogs(data);
    }).catch(err=>{
      console.log("error: ",err);
    })
  },[])
  const username = localStorage.getItem("username");

    return (
    <div >
      {/* <div className="usernameHome">

      <h1>{username ? `${username}'s Dashboard` : "My Blogs"}</h1>
      </div> */}

      <div className="blog-list-container">
      {blogs.map(blog=>(
        <div className="blog-post"  key={blog._id} onClick={()=>{navigate(`/blog/${blog._id}`)}}>
        
        <BlogPost  title={blog.title}  coverImage={blog.coverImage}></BlogPost>
         <div className="author-name pixel-font">
          <p className="blog-author">By {blog.author?.username || "Unknown"}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Homepage
