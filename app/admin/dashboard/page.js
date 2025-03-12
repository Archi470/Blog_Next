"use client";
import Link from "next/link"; 
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [formState, setFormState] = useState({ id: null, title: "", author: "", content: "" });
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "blogPosts");
        const querySnapshot = await getDocs(postsCollection);
        setPosts(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setIsLoadingPosts(false);
      } catch (error) {
        alert("Error fetching posts: " + error.message);
      }
    };
    fetchPosts();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { id, title, author, content } = formState;

    try {
      if (id) {
        const docRef = doc(db, "blogPosts", id);
        await updateDoc(docRef, { title, author, content });
        setPosts(
          posts.map((post) =>
            post.id === id ? { ...post, title, author, content } : post
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "blogPosts"), {
          title,
          author,
          content,
          timestamp: serverTimestamp(),
        });
        setPosts([
          ...posts,
          { id: docRef.id, title, author, content, timestamp: new Date() },
        ]);
      }
      setFormState({ id: null, title: "", author: "", content: "" });
    } catch (error) {
      alert("Error saving post: " + error.message);
    }
  };

  const handleEditClick = (post) => {
    setFormState(post);
  };

  const handleDeleteClick = async (id) => {
    if (formState.id) {
      alert("Complete or cancel the edit before deleting a post.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "blogPosts", id));
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      alert("Error deleting post: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <h1>Admin Dashboard</h1>
           
      <form onSubmit={handleFormSubmit}>
        <h2>{formState.id ? "Edit Post" : "Add New Post"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={formState.title}
          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={formState.author}
          onChange={(e) => setFormState({ ...formState, author: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={formState.content}
          onChange={(e) => setFormState({ ...formState, content: e.target.value })}
          required
        />
        <button type="submit">{formState.id ? "Update Post" : "Add Post"}</button>
      </form>

      <h2>All Posts</h2>
      {isLoadingPosts ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>By: {post.author}</p>
              <button className="edit" onClick={() => handleEditClick(post)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteClick(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {/* Button to return to homepage */}
      <div>
        <Link href="/">
          <button>Return to Homepage</button>
        </Link>
      </div>

    </div>
  );
}
