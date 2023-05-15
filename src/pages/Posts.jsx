import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
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
    <div>
        <div className="create-bar">
          <div className="flex">
            <div>
              <p>Title:</p>
              <input
                className="input"
                type="text"
                value={postList}
                onChange={(e) => setPostList(e.target.value)}
              />
            </div>
            <div>
              <p>Subtext:</p>
              <input
                className="input2"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        <button className="create" onClick={createPost}>
          Создать
        </button>
        </div>
        <div className="posts">
      {posts.map((post) => (
          <div className="post" key={post.id}>
          {edit === post.id ? (
              <div>
              <p>Внесите изменения:</p>
              <div className="inputs">
                <input
                  className="input-edit"
                  type="text"
                  value={postList}
                  onChange={(e) => setPostList(e.target.value)}
                  />
                <input
                  className="input-edit2"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  />
              </div>
              <button className="create" onClick={() => editPost(post.id)}>
                Сохранить
              </button>
            </div>
          ) : (
              <div className="post" key={post.id}>
              <Link className="Link" to={`/OneBigPost/${post.id}`}>
                <h3>{post.title}</h3>
                <h5>{post.body}</h5>
              </Link>
              <button className="delete" onClick={() => deletePosts(post.id)}>
                Удалить
              </button>
              <button className="edit" onClick={() => setEdit(post.id)}>
                Изменить
              </button>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Posts;
