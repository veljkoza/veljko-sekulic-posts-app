import { useLogger } from "@/app/providers";
import { Button, Header, Input, Logo, Virtualized } from "@/ui";
import { Separator } from "@/ui/separator";
import { PostsFeed } from "./posts-feed";
import styles from "./posts-feed.page.module.css";
import { usePostsFeedPage } from "./use-posts-feed-page";

export const PostsFeedPage = () => {
  const {
    searchInput,
    error,
    extendedPosts,
    isLoading,
    searchInputHandler,
    viewMoreHandler,
    logoClickHandler,
  } = usePostsFeedPage();

  const { logger } = useLogger();
  logger.log("PostsFeedPage");

  const getBody = () => {
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;
    if (!extendedPosts || !extendedPosts.length) return <h1>No posts!</h1>;
    return (
      <PostsFeed
        data={extendedPosts}
        renderItem={(post) => (
          <Virtualized>
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
                    viewMoreHandler(extendedPost);
                  }}
                >
                  See more
                </Button>
              )}
            />
          </Virtualized>
        )}
      />
    );
  };
  return (
    <main className="app-container">
      <Header
        left={
          <Button size="paddingless" variant="plain" onClick={logoClickHandler}>
            <Logo />
          </Button>
        }
        right={
          <div className={styles["search-bar"]}>
            <Input
              value={searchInput}
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
