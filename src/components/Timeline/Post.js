import { BiHeart } from "react-icons/bi";
import ReactHashtag from "react-hashtag";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContexts";

import PostStyle from "../Styles/PostStyle";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export default function Post({ post, reload }) {
  const { linkImage, linkTitle, linkDescription, id, user, likes, link, text } =
    post;
  const userToken = useContext(UserContext).user.token;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newText, setNewText] = useState(text);
  const [alteredText, setAlteredText] = useState(text);
  const editorRef = useRef();

  useEffect(() => {
    if (isEditing) {
      editorRef.current.focus();
      editorRef.current.selectionStart = editorRef.current.value.length;
      editorRef.current.selectionEnd = editorRef.current.value.length;
    }
  }, [isEditing]);

  function editToggle() {
    if (isLoading) {
      return;
    }
    if (isEditing) {
      cancelEditing();
      return;
    } else {
      setIsEditing(true);
    }
  }

  function cancelEditing() {
    setNewText(alteredText);
    setIsEditing(false);
  }

  function keyActions(e) {
    if (isLoading) {
      return;
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      cancelEditing();
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      sendEdit();
      return;
    }
  }

  function sendEdit() {
    setIsLoading(true);
    const body = { text: newText };
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const editPostRequest = axios.put(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`,
      body,
      config
    );
    editPostRequest.then(() => {
      setAlteredText(newText);
      setIsEditing(false);
      setIsLoading(false);
    });
    editPostRequest.catch(() => {
      setIsLoading(false);
      setError(true);
    });
  }

  return (
    <PostStyle image={linkImage}>
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
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => keyActions(e)}
              ref={editorRef}
              disabled={isLoading}
            ></textarea>
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
