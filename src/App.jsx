import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import PostDetail from "./components/PostDetail";

function App() {
  const [createdPosts, setCreatedPosts] = useState([]); // State for created posts

  // Function to add a new post to the list of created posts
  const addPost = (newPost) => {
    setCreatedPosts([...createdPosts, newPost]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PostList createdPosts={createdPosts} />}
        />
        <Route path="/create" element={<CreatePost addPost={addPost} />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
