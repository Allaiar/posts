import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function OneBigPost({posts}) {
    const {id} = useParams()
    const post = posts[id]
    console.log(post)

    return (
      <div className="onepost">
        <h2 className="onepost-title">{post.title}</h2>
        <p className="onepost-subtitle">{post.body}</p>
      </div>
    );
  }

export default OneBigPost;
