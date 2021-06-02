import ReactHashtag from "react-hashtag";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiRepost } from "react-icons/bi";

import PostStyle from "../Styles/PostStyle";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import RepostButton from "./RepostButton";
import EditArea from "./EditArea";
import Likes from "../Likes/Likes";
import CommentsButton from "../Comments/CommentsButton";
import CommentsSection from "../Comments/CommentsSection";
import LocationIndicator from "./LocationIndicator";

export default function Post({ post, reload, userId }) {
  const {
    linkImage,
    linkTitle,
    linkDescription,
    id,
    user,
    link,
    text,
    geolocation,
  } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showingComments, setShowingComments] = useState(false);
  const [loadedComments, setLoadedComments] = useState(false);
  const [alteredText, setAlteredText] = useState(text);
  const [error, setError] = useState(false);
  const [commentCounter, setCommentCounter] = useState(post.commentCount);
  const [repostCounter, setRepostCounter] = useState(post.repostCount);
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
    <PostStyle
      avatar={user.avatar}
      image={linkImage}
      showingComments={showingComments}
    >
      {post.repostId && (
        <div className="repost">
          <div>
            <BiRepost />
            Reposted by{" "}
            <Link to={`/user/${post.repostedBy.id}`}>
              {post.repostedBy.id === userId ? "you" : post.repostedBy.username}
            </Link>
          </div>
          {post.repostedBy.id === userId && (
            <DeleteButton
              postId={post.repostId}
              userId={post.repostedBy.id}
              reload={reload}
            />
          )}
        </div>
      )}
      <div className="post-content">
        <div className="post-left">
          <a className="user-image" href={`/user/${user.id}`}>
            <div />
          </a>
          <Likes post={post}></Likes>
          <CommentsButton
            post={post}
            counter={commentCounter}
            loadedComments={loadedComments}
            setLoadedComments={setLoadedComments}
            showingComments={showingComments}
            setShowingComments={setShowingComments}
          />
          <RepostButton
            post={post}
            counter={repostCounter}
            setCounter={setRepostCounter}
          />
        </div>
        <div className="post-right">
          <div className="top">
            <div>
              <a href={`/user/${user.id}`} className="username">
                {user.username}
              </a>
              {geolocation && (
                <LocationIndicator
                  user={user.username}
                  geolocation={geolocation}
                />
              )}
            </div>
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
      </div>
      <div className="comment-section">
        {loadedComments ? (
          <CommentsSection post={post} setCounter={setCommentCounter} />
        ) : null}
      </div>
    </PostStyle>
  );
}
