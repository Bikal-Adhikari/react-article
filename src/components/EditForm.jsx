// EditForm.jsx
import { useState, useEffect } from "react";

const EditForm = ({ post, handleUpdate }) => {
  const [formData, setFormData] = useState(post);

  useEffect(() => {
    setFormData(post);
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  return (
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
  );
};

export default EditForm;
