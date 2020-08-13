import React from 'react'

const BlogForm = ({ onsubmit,valueTitle,valueAuthor,valueUrl,handleChangeTitle,handleChangeAuthor,handleChangeUrl}) => {
    return (

        <div>
        <h2>create new</h2>
        <form onSubmit={onsubmit}>
          <div>
            title:
            <input
              type='text'
              value={valueTitle}
              onChange={handleChangeTitle}
            ></input>
          </div>
          <div>
            author:
            <input
              type="text"
              value={valueAuthor}
              onChange={handleChangeAuthor}
            ></input>
          </div>
          <div>
            url:
            <input
              type="text"
              value={valueUrl}
              onChange={handleChangeUrl}
            ></input>
          </div>
          <button type="onsubmit">create</button>
          
          
        </form>
        </div>
    )
}

export default BlogForm