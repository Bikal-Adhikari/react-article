import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { fetchPosts, updatePost } from "./helpers/axiosHelper";
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewBlogButton from "./components/NewBlogButton";

function App() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { status, tasks } = await fetchPosts();
      if (status === "success") {
        setPosts(tasks);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setEditPostId(null); // Reset editPostId when toggling the form
    setIsEditClicked(false); // Reset isEditClicked when toggling the form
  };

  const handleEditClick = (postId) => {
    setEditPostId(postId);
    setShowForm(true);
    setIsEditClicked(true); // Set isEditClicked to true when edit button is clicked
  };

  const handleUpdate = async (updatedPostData) => {
    try {
      const { status, message } = await updatePost(
        updatedPostData._id,
        updatedPostData
      );
      if (status === "success") {
        getPosts();
        alert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An error occurred while updating the post.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {editPostId === null && !showForm && (
          <>
            <h1>My Blog</h1>
            {!isEditClicked && <NewBlogButton toggleForm={toggleForm} />}
          </>
        )}
        {(showForm || editPostId !== null) && (
          <Form
            getPosts={getPosts}
            toggleForm={() => {
              setShowForm(false);
              setEditPostId(null);
              setIsEditClicked(false); // Reset isEditClicked when closing the form
            }}
            postId={editPostId}
          />
        )}
        {!showForm && editPostId === null && (
          <List
            posts={posts}
            getPosts={getPosts}
            handleEditClick={handleEditClick}
            isEditClicked={isEditClicked}
            handleUpdate={handleUpdate} // Pass isEditClicked as a prop to List component
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
