import { useState } from "react";
import { createPost } from "../helpers/axiosHelper";

const initialPost = {
  title: "",
  content: "",
  author: "",
};

// const Form = ({ onPostCreated }) => {
const Form = () => {
  const [newPost, setNewPost] = useState(initialPost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(newPost);
      // onPostCreated(); // Notify the parent component that a new post has been created
      setNewPost(initialPost);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      ></textarea>
      <input
        type="text"
        placeholder="Author"
        value={newPost.author}
        onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default Form;
