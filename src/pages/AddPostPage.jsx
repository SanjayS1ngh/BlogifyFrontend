import React from 'react'
import { useState } from 'react';
import"./EditPostPage"
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_URL;
const AddPostPage = () => {
    const[title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [coverImage, setCoverImage] = useState(null);
     const navigate=useNavigate();
    async function handleCreateSubmit(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('coverImage', coverImage); // The key here is crucial

  await fetch(`${BASE_URL}/blog/submit`, {
    method: 'POST',
    headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
  },
    body: formData, 
  });
        navigate(`/`)
    }
    
    
  return (
    <div className='add-container'>
      <form onSubmit={handleCreateSubmit} className='add-form'>
        <input type="file" className='add-image' onChange={e => setCoverImage(e.target.files[0])}/>
        <input className='add-title' type="text" placeholder='enter title' value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className='add-content' value={content} placeholder='enter content' onChange={e=>setContent(e.target.value)}></textarea>
        <button type="submit">Done</button>
        
        </form>
    </div>
  )
}

export default AddPostPage
