import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";

const BlogToView = (props) => {
  const [blogView, setBlogView] = useState(null);
  //const [blogs,setBlogs] = useState(null)
  console.log("huodedeId:", props.id);
  useEffect(() => {
    blogService.getBlog(props.id).then((blog) => {
      setBlogView(blog);
      console.log("blog:", blog);
    });
  }, []);
  //console.log("blogView:",blogView)

  const addLikes = () => {
    const newBlogView = { ...blogView, likes: blogView.likes + 1 }
    //setBlogView(newBlogView);
    
    blogService.updata(newBlogView.id, newBlogView).then((blog) => {
      console.log("id:",blog.id)
      blogService.getBlog(blog.id).then((blog) => {
        setBlogView(blog)
      })
    }
      
    )
  };

  if (blogView === null) {
    return null;
  }
  return (
    <div>
      <p> title : {blogView.title}</p>
      <p> auhort: {blogView.author}</p>
      <p> url: {blogView.url}</p>
      <p> likes: {blogView.likes}</p>
      <div>
        <button onClick={addLikes}>likes</button>
      </div>
    </div>
  );
};

export default BlogToView;
