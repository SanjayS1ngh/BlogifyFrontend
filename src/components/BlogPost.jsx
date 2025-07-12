import React from 'react'
import"../App.css"
const BlogPost = (props) => {
  return (
    <div className='pixel-font'>
        {props.coverImage && ( 
        <img 
         src={`https://blogify-backend-tqwu.onrender.com/${props.coverImage}`} 
          // src={`http://blogifyproject-env.eba-3snt3wpf.ap-south-1.elasticbeanstalk.com/api/${props.coverImage.replace(/\\/g, '/')}`} 
          alt={props.title} 
          width="400" 
        />
      )}
      <h2>{props.title}</h2>
      <div className="blog-content">

      {props.content&&<p> {props.content}</p>}
      </div>
    </div>
  )
}

export default BlogPost
