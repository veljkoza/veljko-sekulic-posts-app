import { routes } from "@/app/router";
import { Button, Header, Input, useVisible } from "@/ui";
import { Separator } from "@/ui/separator";
import React, { useRef } from "react";
import { PostsFeed } from "./posts-feed";
import styles from "./posts-feed.page.module.css";
import { usePostsFeedPage } from "./use-posts-feed-page";
const LazyLoadedPostsFeed = React.lazy(() => import("./posts-feed"));

const Virtualized = (props: Parameters<typeof LazyLoadedPostsFeed>["0"]) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isVisible } = useVisible(ref);

  return (
    <div ref={ref}>
      {isVisible && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyLoadedPostsFeed {...props} />
        </React.Suspense>
      )}
    </div>
  );
};
export const PostsFeedPage = () => {
  const {
    error,
    extendedPosts,
    navigate,
    isLoading,
    searchInputHandler,
    cache,
  } = usePostsFeedPage();

  const getBody = () => {
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;
    if (!extendedPosts || !extendedPosts.length) return <h1>No posts!</h1>;
    return (
      <PostsFeed
        data={extendedPosts}
        renderItem={(post) => (
          <PostsFeed.Card
            title={post.title}
            body={post.body}
            key={post.id}
            comments={post.comments}
            postId={post.id}
            userId={post.userId}
            actions={(extendedPost) => (
              <Button
                onClick={(e) => {
                  e.preventDefault();

                  // cache complete extended post before navigating
                  const cached = extendedPost;
                  cache.extendedPosts[post.id] = cached;
                  navigate(routes.posts.details(post.id).path);
                }}
              >
                See more
              </Button>
            )}
          />
        )}
      />
    );
  };
  return (
    <main className="app-container">
      <Header
        right={
          <div className={styles["search-bar"]}>
            <Input
              onChange={searchInputHandler}
              placeholder="Search by username. Ex: Antonette"
            />
          </div>
        }
      />
      <div>
        <Separator />
        {getBody()}
      </div>
    </main>
  );
};
