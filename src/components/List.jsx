// List.jsx

import React, { useState } from "react";
import EditForm from "./EditForm";
import { deleteTasks } from "../helpers/axiosHelper";

const List = ({ posts, getPosts }) => {
  const [editingPost, setEditingPost] = useState(false);

  const handleEditClick = () => {
    setEditingPost(true);
  };

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

  const handleUpdate = async (updatedPostData) => {
    // Logic to update post on the server
    try {
      // Send update request to server
      // Handle response
      console.log("Updated post data:", updatedPostData);
      // After successful update, fetch updated posts
      getPosts();
      // Clear editingPost state
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error
    }
  };

  return (
    <div>
      {editingPost ? (
        <div className="blog-post">
          <h2>Edit Post</h2>
          <EditForm post={editingPost} handleUpdate={handleUpdate} />
        </div>
      ) : (
        <ul id="postsList">
          {posts?.map((post) => {
            const { _id, title, content, author, date } = post;
            return (
              <li key={_id}>
                <div className="blog-post">
                  <h2>{title}</h2>
                  <p>{content}</p>
                  <small>By: {author}</small>
                  <small>{date}</small>
                  <button
                    className="edit"
                    onClick={() => handleEditClick(post)}
                  >
                    Edit
                  </button>
                  <button className="delete" onClick={() => handOnDelete(_id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default List;
