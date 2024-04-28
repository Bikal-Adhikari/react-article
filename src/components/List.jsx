import { useState } from "react";
import { deleteTasks } from "../helpers/axiosHelper";
import EditForm from "./EditForm";

const List = ({ posts, getPosts }) => {
  const [editPost, setEditPost] = useState(null);

  const handOnDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await deleteTasks(taskId);
        if (response.status === "success") {
          getPosts();
          alert(response.message);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("An error occurred while deleting the task.");
      }
    }
  };

  const handleEditClick = (post) => {
    setEditPost(post);
  };

  const handleUpdate = () => {
    setEditPost(null);
  };

  return (
    <div>
      {editPost ? (
        <EditForm post={editPost} handleUpdate={handleUpdate} />
      ) : (
        <ul id="postsList">
          {posts?.map((post) => {
            const { _id, title, content, author, date } = post;
            return (
              <li key={_id}>
                <h2>{title}</h2>
                <p>{content}</p>
                <small>By: {author}</small>
                <small>{date}</small>
                <button className="edit" onClick={() => handleEditClick(post)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handOnDelete(_id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default List;
