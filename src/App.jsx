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

    getPosts();
  }, []);

  // const handlePostCreated = async () => {
  //   const updatedPosts = await fetchPosts();
  //   setPosts(updatedPosts);
  // };

  const handelOnClick = () => {
    setShowForm(true);
  };
  console.log(posts);
  return (
    <div>
      <h1>My Blog</h1>
      <button onClick={handelOnClick}>New Blog</button>
      {showForm && <Form />}
      {/* onPostCreated={handlePostCreated}  */}
      <ul>
        {posts.map((post) => {
          const { _id, title, content, author, date } = post; // Destructure post here
          return (
            <li key={_id}>
              <h2>{title}</h2>
              <p>{content}</p>
              <small>By: {author}</small>
              <small>{date}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
