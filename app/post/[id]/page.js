"use client";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Link from "next/link";

export default function PostDetails({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  // Unwrap params if it's a promise (for Next.js 13+ dynamic routing)
  const unwrappedParams = params instanceof Promise ? React.use(params) : params;

  useEffect(() => {
    const fetchPost = async () => {
      if (unwrappedParams?.id) {
        setLoading(true);
        try {
          const postDoc = doc(db, "blogPosts", unwrappedParams.id);
          const docSnap = await getDoc(postDoc);
          if (docSnap.exists()) {
            setPost(docSnap.data());
          } else {
            setPost(null); // Handle post not found
            alert("Post not found!"); // Show alert for post not found
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          alert("An error occurred while fetching the post. Please try again later."); // Show alert for errors
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPost();
  }, [unwrappedParams]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <div id="box">
        <p>{post.content}</p>
      </div>

      {/* Button to go back to the homepage */}
      <div>
        <Link href="/">
          <button>Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
}
