export default function filterPosts(newRequest, posts, setPosts) {
  const newPosts = newRequest.filter((p) => {
    for (let i = 0; i < posts.length; i++) {
      if (p.repostId) {
        if (p.repostId === posts[i].repostId) {
          return false;
        } else {
          continue;
        }
      } else if (p.id === posts[i].id) {
        return false;
      }
    }
    return true;
  });

  setPosts([...newPosts, ...posts]);
}
