import { deleteTasks } from "../helpers/axiosHelper";

const List = ({ posts, getPosts }) => {
  const handleEditClick = (postId) => {
    // Handle the edit click event, such as opening a modal for editing the post
    console.log("Edit button clicked for post ID:", postId);
  };

  const handOnDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await deleteTasks(taskId); // Assuming you have a deleteTask function to send the request
        if (response.status === "success") {
          // If the deletion is successful, update the UI by removing the deleted task
          getPosts();
          alert(response.message); // Optionally show a success message
        } else {
          alert(response.message); // Show an error message if the deletion failed
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("An error occurred while deleting the task."); // Show an error message if an exception occurs
      }
    }
  };

  return (
    <ul id="postsList">
      {posts?.map((post) => {
        const { _id, title, content, author, date } = post;
        return (
          <li key={_id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <small>By: {author}</small>
            <small>{date}</small>
            <button className="edit" onClick={() => handleEditClick(_id)}>
              Edit
            </button>
            <button className="delete" onClick={() => handOnDelete(_id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
