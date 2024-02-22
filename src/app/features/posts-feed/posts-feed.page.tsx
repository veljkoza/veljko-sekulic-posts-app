import { Logo } from "@/ui";
import { Separator } from "@/ui/separator";
import { PostsFeed } from "./posts-feed";
import styles from "./posts-feed.page.module.css";
import { usePostsFeedPage } from "./use-posts-feed-page";

export const PostsFeedPage = () => {
  const { error, extendedPosts, isLoading, searchInputHandler } =
    usePostsFeedPage();

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
          />
        )}
      />
    );
  };
  return (
    <main>
      <header className={styles["header"]}>
        <Logo />
        <input className={styles["search-bar"]} onChange={searchInputHandler} />
      </header>
      <div>
        <Separator />
        {getBody()}
      </div>
    </main>
  );
};
