import { useCache, useHttpClient, useLogger } from "@/app/providers";
import {
  Comment,
  ExtendedPost,
  GetAllPostsDTO,
  GetCommentsByPostIdDTO,
  User,
  getUserHandle,
} from "@/models";
import { FlatList, FlatListProps, useVisible } from "@/ui";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { Typography } from "@/ui/typography";
import React, { FC, useEffect, useRef } from "react";
import styles from "./posts-feed.module.css";

export type PostCardProps = {
  userId: number;
  body: string;
  title: string;
  comments: Comment[];
  postId: number;
  visibleComments?: number | "unlimited";
  actions?: (extendedPost: ExtendedPost & { user: User }) => React.JSX.Element;
};

const usePostFeedCard = ({
  initialComments,
  postId,
  userId,
}: {
  postId: number;
  userId: number;
  initialComments: GetCommentsByPostIdDTO;
}) => {
  const postRef = useRef<HTMLScriptElement | null>(null);
  const { isVisible } = useVisible(postRef, {
    rootMargin: "500px",
  });
  const { cache } = useCache();
  const { queries } = useHttpClient();
  const { data: fetchedComments } = queries.posts.getCommentsByPostId.useQuery({
    params: postId,
    options: {
      enabled: isVisible && !cache.postsComments[postId],
    },
  });

  const { data: fetchedUser } = queries.users.getById.useQuery({
    params: userId,
    options: { enabled: isVisible && !cache.users[userId] },
  });

  // add user to cache
  useEffect(() => {
    if (fetchedUser) {
      cache.users[fetchedUser.id] = fetchedUser;
    }
  }, [fetchedUser?.id]);

  //add comments to cache
  useEffect(() => {
    if (fetchedComments) {
      const firstEl = fetchedComments[0];
      cache.postsComments[firstEl.postId] = fetchedComments;
    }
  }, [fetchedComments]);

  const getComputedComments = () => {
    if (cache.postsComments[postId]) return cache.postsComments[postId];
    if (fetchedComments) return fetchedComments;
    return initialComments;
  };

  const getUser = () => {
    if (cache.users[userId]) return cache.users[userId];
    return fetchedUser;
  };

  const user = getUser();
  const comments = getComputedComments();

  return { user, comments, postRef, isVisible };
};

export const PostsFeedCard: FC<PostCardProps> = ({
  body,
  title,
  comments: initialComments,
  postId,
  userId,
  visibleComments = 3,
  actions,
}) => {
  const { logger } = useLogger();
  logger.log("PostsFeedCard");
  const { postRef, comments, user, isVisible } = usePostFeedCard({
    initialComments,
    postId,
    userId,
  });
  // if (!isVisible) return <section ref={postRef}></section>;

  const getVisibleComments = () => {
    if (visibleComments === "unlimited") return comments;
    return comments.slice(0, visibleComments);
  };
  return (
    <section
      className={`${styles["post-feed-card"]} ${isVisible && styles["post-feed-card--visible"]}`}
      ref={postRef}
      data-post-id={postId}
    >
      <article>
        {user && (
          <Typography style={{ paddingBottom: "1rem" }}>
            Posted by
            <Button
              variant="plain"
              size="paddingless"
              style={{ marginLeft: "1rem" }}
            >
              {getUserHandle(user!)}
            </Button>
          </Typography>
        )}
        <a href="">
          <Typography variant="heading" as="h3">
            {title} {postId}
          </Typography>
        </a>
        <Separator size="small" />
        <Typography variant="subheading" weight="bold">
          {body}
        </Typography>
      </article>
      {!!comments?.length && (
        <>
          <Separator size="small" />
          <CommentSeparator />
        </>
      )}
      {comments && (
        <FlatList
          data={getVisibleComments()}
          renderItem={(comment) => (
            <PostsFeedCardComment body={comment.body} email={comment.email} />
          )}
          renderSeparator={() => <CommentSeparator />}
        />
      )}
      <Separator />
      {actions && (
        <div className={styles["post-feed-card__actions-container"]}>
          {actions({
            body,
            title,
            comments,
            id: postId,
            user: user!,
            userId: userId,
          })}
        </div>
      )}
    </section>
  );
};

export type PostsListProps<T extends GetAllPostsDTO> = FlatListProps<T>;

export const PostsFeed = <T extends GetAllPostsDTO>({
  renderItem,
  data,
}: PostsListProps<T>) => {
  const { logger } = useLogger();
  logger.log("PostsFeed");
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      renderSeparator={(item) => <Separator key={item.id + 999} />}
    />
  );
};

type PostsFeedCardCommentProps = {
  email: string;
  body: string;
};

const PostsFeedCardComment: FC<PostsFeedCardCommentProps> = ({
  email,
  body,
}) => {
  const { logger } = useLogger();
  logger.log("PostsFeedCardComment");
  return (
    <div className={styles["post-feed-card__comment"]}>
      <Button
        variant="plain"
        size="paddingless"
        style={{ marginBottom: "1rem" }}
      >
        <Typography weight="bold">@ {email}</Typography>
      </Button>
      <Typography>{body}</Typography>
    </div>
  );
};

const CommentSeparator = () => {
  const { logger } = useLogger();
  logger.log("CommentSeparator");
  return (
    <div className={styles["post-feed-card__coments-separator-container"]}>
      <div className={styles["post-feed-card__coments-separator"]}></div>
    </div>
  );
};
export default PostsFeedCard;

PostsFeed.Card = PostsFeedCard;
