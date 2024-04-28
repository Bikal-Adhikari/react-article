import axios from "axios";

// const API_URL = "http://localhost:4000/api/posts";
// const API_URL = "https://nodejs-article-hrmx.onrender.com/api/posts";
const API_URL = import.meta.env.VITE_API_URL + "/api/posts";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const deleteTasks = async (taskId) => {
  try {
    const { data } = await axios.delete(API_URL + "/" + taskId);
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updatePost = async (postId, updatedPostData) => {
  try {
    const { data } = await axios.put(API_URL + "/" + postId, updatedPostData);
    return data;
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
};
