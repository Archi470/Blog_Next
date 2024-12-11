"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";  // Importing Link to handle routing

export default function Homepage() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "blogPosts");
        const querySnapshot = await getDocs(postsCollection);
        setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("An error occurred while fetching posts. Please try again.");
      }
    };    
    fetchPosts();
  }, []);

  // Helper function to truncate content
  const truncateContent = (content, maxLength = 10) => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`; // Truncate and add ellipsis
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>By: {post.author}</p>
            <p>{truncateContent(post.content)}</p> {/* Display truncated content */}

            {/* Read More Link: Navigates to Post Details page */}
            <Link href={`/post/${post.id}`}>
              <button>Read More</button>
            </Link>
          </li>
        ))}
      </ul>

      {/* Admin Link: Navigates to Login page */}
      <div>
        <Link href="/login">
          <button>Admin Login</button>
        </Link>
      </div>
    </div>
  );
}
