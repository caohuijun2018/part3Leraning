import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";

const BlogToView = (props) => {
  const [blogView, setBlogView] = useState(null);
  
  const blogGet = (blog) => {
    blogService.getBlog(blog.id).then((blog) => setBlogView(blog));
  };

  
  useEffect(() => {
    blogGet(props);
  }, []);

  const addLikes = () => {
    const newBlogView = { ...blogView, likes: blogView.likes + 1 };
    blogService.updata(newBlogView.id, newBlogView).then((blog) => {
      blogGet(blog);
    });
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
