import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { fetchPosts } from "./helpers/axiosHelper";
import List from "./components/List";

function App() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { status, tasks } = await fetchPosts();
      if (status === "success") {
        setPosts(tasks);
      } else {
        // Handle error or set default posts state
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle error or set default posts state
      setPosts([]);
    }
  };

  const handelOnClick = () => {
    setShowForm(true);
  };
  console.log(posts);
  return (
    <div>
      <h1>My Blog</h1>
      <button onClick={handelOnClick}>New Blog</button>
      {showForm && <Form getPosts={getPosts} />}

      {!showForm && <List posts={posts} />}
    </div>
  );
}

export default App;
