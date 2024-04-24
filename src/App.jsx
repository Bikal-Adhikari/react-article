import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { fetchPosts } from "./helpers/axiosHelper";

function App() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  const handlePostCreated = async () => {
    const updatedPosts = await fetchPosts();
    setPosts(updatedPosts);
  };

  const handelOnClick = () => {
    setShowForm(true);
  };
  return (
    <div>
      <h1>My Blog</h1>
      <button onClick={handelOnClick}>New Blog</button>
      {showForm && <Form onPostCreated={handlePostCreated} />}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>By: {post.author}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
