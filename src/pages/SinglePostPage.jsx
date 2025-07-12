import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom'
import BlogPost from '../components/BlogPost';
const BASE_URL = import.meta.env.VITE_API_URL;

const SinglePostPage = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const[blog,setBlog]=useState(null);

    function handleEditClick(){
        navigate(`/blog/edit/${id}`)
    }
    async function handleDeleteClick(){
        await fetch(`${BASE_URL}/blog/delete/${id}`,{
          method:'POST',
          headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
  })
        navigate("/");
    }


    useEffect(()=>{
        fetch(`${BASE_URL}/blog/${id}`).then(res=>{
             return res.json();
    }).then(data=>{
      setBlog(data);
    }).catch(err=>{
      console.log("error: ",err);
        })
    },[id])
    if (!blog) {
  return <h1>Loading...</h1>;
}
  return (
    <div>
     <BlogPost title={blog.title} content={blog.content}   coverImage={blog.coverImage} ></BlogPost> 
     <div className="action-buttons">
        <button onClick={handleEditClick}>edit</button>
        <button onClick={handleDeleteClick}>  delete</button>
     </div>
    </div>
  )
}

export default SinglePostPage
