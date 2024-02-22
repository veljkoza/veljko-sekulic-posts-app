import { useCache, useHttpClient } from "@/app/providers";
import { Logo } from "@/ui";
import { Separator } from "@/ui/separator";
import { useEffect } from "react";
import { PostsFeed } from "./post-feed";
import styles from "./posts-feed.page.module.css";

export const PostsFeedPage = () => {
  const { queries } = useHttpClient();
  const { data, isLoading, error } = queries.extendedPost.getAll.useQuery();

  const { cache } = useCache();
  const { extendedPosts: posts, numberOfPrefetchedPosts } = data || {};

  // cache initial posts
  useEffect(() => {
    posts
      ?.slice(0, numberOfPrefetchedPosts)
      .forEach((post) => (cache.postsComments[post.id] = post.comments));
  }, [posts?.length]);

  const getBody = () => {
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;
    if (!posts || !posts.length) return <h1>No posts!</h1>;
    return (
      <PostsFeed
        data={posts}
        renderItem={(post) => (
          <PostsFeed.Card
            title={post.title}
            body={post.body}
            key={post.id}
            comments={post.comments}
            postId={post.id}
            userId={post.userId}
          />
        )}
      />
    );
  };
  return (
    <main>
      <header className={styles["header"]}>
        <Logo />
        <input className={styles["search-bar"]} />
      </header>
      <div>
        <Separator />
        {getBody()}
      </div>
    </main>
  );
};
