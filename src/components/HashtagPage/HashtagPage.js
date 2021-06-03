import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import PostsList from "../Timeline/PostsList";
import useInterval from "../useInterval/useInterval";
import filterPosts from "../filterPosts/filterPosts";

export default function HashtagPage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);
  const { hashtag } = useParams();

  useEffect(() => {
    if (user) {
      getPosts();
    }
  }, [user, hashtag]);

  useEffect(() => {
    setPosts(null);
    setIsLoading(true);
  }, [hashtag]);

  function getPosts(newPosts) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    if (posts && posts.length > 0 && !newPosts) {
      const referenceId = posts[posts.length - 1].repostId
        ? posts[posts.length - 1].repostId
        : posts[posts.length - 1].id;
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts?olderThan=${referenceId}`,
        config
      );

      request.then((response) => {
        if (response.data.posts.length < 10) {
          setHasMore(false);
        }
        const refreshPosts = [...posts, ...response.data.posts];
        setPosts(refreshPosts);
        setIsLoading(false);
      });
      request.catch((error) => {
        setHasMore(false);
        setIsLoading(false);
        setError(true);
      });
    } else {
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,
        config
      );

      request.then((response) => {
        if (response.data.posts.length < 10) {
          setHasMore(false);
        }
        if (newPosts) {
          filterPosts(response.data.posts, posts, setPosts);
        } else {
          setPosts(response.data.posts);
        }
        setIsLoading(false);
      });
      request.catch((error) => {
        setIsLoading(false);
        setError(true);
      });
    }
  }

  useInterval(() => {
    getPosts(true);
  }, 15000);

  function removePost(repost, id) {
    let filteredPosts = [];
    if (repost) {
      filteredPosts = posts.filter((p) => p.repostId !== id);
    } else {
      filteredPosts = posts.filter((p) => p.id !== id);
    }
    const refreshPosts = [...filteredPosts];
    setPosts(refreshPosts);
  }

  return (
    <StyledTimeline>
      <h1># {hashtag}</h1>
      <div className="main-content">
        <div className="page-left">
          {isLoading ? <Loading /> : ""}
          {posts === null ? (
            error ? (
              <p className="warning">Error getting posts, please try again.</p>
            ) : (
              ""
            )
          ) : posts.length === 0 ? (
            <p className="warning">No posts with this hashtag.</p>
          ) : (
            <PostsList
              posts={posts}
              reload={getPosts}
              hasMore={hasMore}
              removePost={removePost}
            />
          )}
        </div>
        <div className="page-right"></div>
      </div>
    </StyledTimeline>
  );
}
