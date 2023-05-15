import OneBigPost from "./pages/OneBigPost";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Posts from "./pages/Posts";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState("");
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data));
  }, []);

  const deletePosts = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
      });
  };

  const createPost = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: postList,
        body: value,
        complated: false,
      })
      .then((res) => {
        const postListItem = res.data;
        setPosts([postListItem, ...posts]);
        setPostList("");
        setValue("");
      });
  };
  const editPost = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: postList,
        body: value,
      })
      .then(() => {
        const editPosts = posts.map((post) =>
          post.id === id ? { ...post, title: postList, body: value } : post
        );
        setPosts(editPosts);
        setEdit("");
        setPostList("");
        setValue("");
      });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/OneBigPost/:id" element={<OneBigPost posts={posts}/>} />
        <Route path="/" element={<Posts/>}/>
      </Routes>
    </div>
  );
}

export default App;