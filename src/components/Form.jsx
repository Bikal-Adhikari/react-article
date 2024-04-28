import { useState, useEffect } from "react";
import { createPost, updatePost } from "../helpers/axiosHelper";

const initialPost = {
  title: "",
  content: "",
  author: "",
};

const Form = ({ getPosts, toggleForm, postId }) => {
  const [newPost, setNewPost] = useState(initialPost);
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (postId) {
      // Fetch post data based on postId and populate the form
      // Example: fetchPostById(postId).then((data) => setNewPost(data));
    }
  }, [postId]);

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
      if (postId) {
        await updatePost(postId, newPost);
      } else {
        await createPost(newPost);
      }
      setNewPost(initialPost);
      getPosts();
      toggleForm(); // Close the form after adding/updating the post
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }
  };

  return (
    <>
      <h1>New Posts</h1>
      <form onSubmit={handleSubmit} id="newPostForm" method="post">
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
          rows="10"
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
        <button className="full-width" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
