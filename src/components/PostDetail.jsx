import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        // You can handle the error or navigate to an error page here
      }
    };
    fetchPost();
  }, [postId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <button
        className="mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleGoBack}
      >
        Back
      </button>
      {post ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600">{post.body}</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
}

export default PostDetail;
