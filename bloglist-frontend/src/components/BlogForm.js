import React from "react";
import PropTypes from "prop-types";

const BlogForm = ({
  onsubmit,
  valueTitle,
  valueAuthor,
  valueUrl,
  valueLikes,
  handleChangeTitle,
  handleChangeAuthor,
  handleChangeUrl,
  handleChangeLikes,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onsubmit}>
        <div>
          title:
          <input
            type="text"
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
        <div>
          likes:
          <input
            type="text"
            value={valueLikes}
            onChange={handleChangeLikes}
          ></input>
        </div>
        <button type="onsubmit">create</button>
      </form>
    </div>
  );
};

BlogForm.prototype = {
  onsubmit: PropTypes.func.isRequired,
  valueTitle: PropTypes.string.isRequired,
  valueAuthor: PropTypes.string.isRequired,
  valueUrl: PropTypes.string.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleChangeAuthor: PropTypes.func.isRequired,
  handleChangeUrl: PropTypes.func.isRequired,
};

export default BlogForm;
