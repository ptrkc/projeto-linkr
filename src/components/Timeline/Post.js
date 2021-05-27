import { BiHeart } from "react-icons/bi";
import ReactHashtag from "react-hashtag";

import PostStyle from "../Styles/PostStyle";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { useState } from "react";

export default function Post({ post, reload }) {
  const { linkImage, linkTitle, linkDescription, id, user, likes, link, text } =
    post;
  const [isEditing, setIsEditing] = useState(false);
  function editPost() {
    setIsEditing(true);
  }

  return (
    <PostStyle image={linkImage} key={id}>
      <div className="post-left">
        <a className="user-image" href={`/user/${user.id}`}>
          <img src={user.avatar} alt="user avatar" />
        </a>
        <BiHeart />
        <p className="likes">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </p>
      </div>
      <div className="post-right">
        <div className="top">
          <a href={`/user/${user.id}`} className="username">
            {user.username}
          </a>
          <div>
            <EditButton userId={user.id} edit={editPost} />
            <DeleteButton postId={id} userId={user.id} reload={reload} />
          </div>
        </div>
        <p className="user-text">
          {isEditing ? (
            <textarea>{text}</textarea>
          ) : (
            <ReactHashtag
              renderHashtag={(hashtagValue) => (
                <a
                  href={`/hashtag/${hashtagValue.substring(1)}`}
                  className="hashtag"
                >
                  {hashtagValue}
                </a>
              )}
            >
              {text}
            </ReactHashtag>
          )}
        </p>
        <a href={link} className="link" target="_blank" rel="noreferrer">
          <div className="texts">
            <p className="link-title">{linkTitle}</p>
            <p className="link-description">{linkDescription}</p>
            <p className="link-url">{link}</p>
          </div>
          <div className="image"></div>
        </a>
      </div>
    </PostStyle>
  );
}
