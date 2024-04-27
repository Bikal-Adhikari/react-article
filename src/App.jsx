// App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { fetchPosts } from "./helpers/axiosHelper";
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

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
  };

  const handleEditClick = (postId) => {
    setEditPostId(postId);
    setShowForm(true);
  };

  return (
    <>
      <Header />
      <div className="container">
        {editPostId === null && (
          <>
            <h1>My Blog</h1>
            {!showForm && <button onClick={toggleForm}>New Blog</button>}
          </>
        )}
        {(showForm || editPostId !== null) && (
          <Form
            getPosts={getPosts}
            toggleForm={() => {
              setShowForm(false);
              setEditPostId(null);
            }}
            postId={editPostId}
          />
        )}
        {!showForm && editPostId === null && (
          <List
            posts={posts}
            getPosts={getPosts}
            handleEditClick={handleEditClick}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
