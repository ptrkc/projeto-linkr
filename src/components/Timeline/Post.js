import ReactHashtag from "react-hashtag";
import { useState } from "react";

import PostStyle from "../Styles/PostStyle";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import EditArea from "./EditArea";

import Likes from '../Likes/Likes';

export default function Post({ post, reload }) {
  const { linkImage, linkTitle, linkDescription, id, user, link, text } =
    post;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alteredText, setAlteredText] = useState(text);
  const [error, setError] = useState(false);

  function editToggle() {
    if (isLoading) {
      return;
    }
    if (isEditing) {
      setIsEditing(false);
      return;
    } else {
      setIsEditing(true);
    }
  }

  return (
    <PostStyle avatar={user.avatar} image={linkImage}>
      <div className="post-left">
        <a className="user-image" href={`/user/${user.id}`}>
          <div />
        </a>
        <Likes post={post}></Likes>
      </div>
      <div className="post-right">
        <div className="top">
          <a href={`/user/${user.id}`} className="username">
            {user.username}
          </a>
          <div>
            <EditButton
              userId={user.id}
              edit={editToggle}
              error={error}
              setError={setError}
              setIsEditing={setIsEditing}
            />
            <DeleteButton postId={id} userId={user.id} reload={reload} />
          </div>
        </div>
        <p className="user-text">
          {isEditing ? (
            <EditArea
              id={post.id}
              setAlteredText={setAlteredText}
              alteredText={alteredText}
              setIsLoading={setIsLoading}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isLoading={isLoading}
              setError={setError}
            />
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
              {alteredText}
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
