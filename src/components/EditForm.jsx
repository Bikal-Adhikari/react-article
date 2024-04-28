import { useState } from "react";
import { updatePost } from "../helpers/axiosHelper";

const EditForm = ({ post, handleUpdate }) => {
  const [formData, setFormData] = useState(post);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(formData._id, formData);
      handleUpdate(); // Reset edit state
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An error occurred while updating the post.");
    }
  };

  return (
    <>
      <h1>Edit Posts</h1>
      <form onSubmit={handleSubmit} id="editForm" method="post">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
        ></textarea>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <button className="full-width" type="submit">
          Update
        </button>
      </form>
    </>
  );
};

export default EditForm;
