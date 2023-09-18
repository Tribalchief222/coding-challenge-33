import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PostList({ createdPosts }) {
  const [page, setPage] = useState(1);
  const [post, setPost] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * 10}&_limit=10`);
      setPost(response.data); // Update the local state with fetched existing posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Combine existingPosts and createdPosts into a single array
  const allPosts = [...post, ...createdPosts];

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">List of Posts</h1>
        <Link to="/create" className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700">
          Create Post
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPosts.map((post) => (
          <li key={post.id} className="border rounded-lg p-4">
            <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2">{post.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded ${page === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-400'}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostList;
