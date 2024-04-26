// Form.jsx
import { useState } from "react";
import { createPost } from "../helpers/axiosHelper";

const initialPost = {
  title: "",
  content: "",
  author: "",
};

const Form = ({ getPosts, toggleForm }) => {
  const [newPost, setNewPost] = useState(initialPost);
  const [response, setResponse] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
    if (response.message) {
      setResponse({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(newPost);
      setNewPost(initialPost);
      getPosts();
      toggleForm(); // Close the form after adding the post
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {response.message && (
        <div>
          <div>
            {response.status === "success" ? (
              <div>{response.message}</div>
            ) : (
              <div>{response.message}</div>
            )}
          </div>
        </div>
      )}
      <input
        type="text"
        placeholder="Title"
        aria-label="Title"
        name="title"
        required
        onChange={handleOnChange}
        value={newPost.title}
      />
      <textarea
        placeholder="Content"
        aria-label="Content"
        name="content"
        required
        onChange={handleOnChange}
        value={newPost.content}
      ></textarea>
      <input
        type="text"
        placeholder="Author"
        aria-label="Author"
        name="author"
        required
        onChange={handleOnChange}
        value={newPost.author}
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default Form;
