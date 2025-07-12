import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import"./editPage.css"
const BASE_URL = import.meta.env.VITE_API_URL;
const EditPostPage = () => {
    const navigate=useNavigate();
    
    async function handleUpdatedSubmit(e){
      e.preventDefault();
      const token = localStorage.getItem("token");
        await fetch(`${BASE_URL}/blog/edit/${id}`,{
            method:'POST',
              headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,    
            'Content-Type': 'application/json', 
        },
          body: JSON.stringify({
      title: title,     
      content: content 
    }),

        });
        navigate(`/blog/${id}`)
    }
    const {id}=useParams();
    const[title,setTitle]=useState("");
    const [content,setContent]=useState("");
    useEffect(()=>{
        fetch(`${BASE_URL}/blog/${id}`).then(res=>{
           return res.json();
        }).then(data=>{
            setTitle(data.title);
            setContent(data.content);
        })

    },[id])
  return (
    <div className='edit-container'>
        <form onSubmit={handleUpdatedSubmit} className='edit-form'>
        <input type="text" value={title} className='edit-title' onChange={e=>setTitle(e.target.value) } />
        <textarea value={content} className='edit-content' onChange={e=>setContent(e.target.value)}></textarea>
        <button type="submit">Done</button>
        
        </form>
      
    </div>
  )
}

export default EditPostPage
