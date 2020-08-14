import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
const BlogToView = (props) => {
  const [blogView, setBlogView] = useState(null);
  console.log("huodedeId:", props.id);
  useEffect(() => {
    blogService.getBlog(props.id).then((blog) => {
      setBlogView(blog);
      console.log("blog:", blog);
    });
  },[]);
  //console.log("blogView:",blogView)

  if(blogView === null) {
    return null
  }
  return (
    <div>
      
      <p> title : {blogView.title}</p>
      <p> auhort: {blogView.author}</p>
      <p> url: {blogView.url}</p>
    </div>
  );
};

export default BlogToView;
