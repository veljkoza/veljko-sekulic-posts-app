import { useLogger } from "@/app/providers";
import { Comment, ExtendedPost, User, getUserHandle } from "@/models";
import { Button, FlatList, Separator } from "@/ui";
import { Typography } from "@/ui/typography";
import { FC } from "react";
import styles from "./posts-feed.module.css";
import { usePostFeedCard } from "./use-posts-feed-card";

type PostsFeedCardProps = {
  userId: number;
  body: string;
  title: string;
  comments: Comment[];
  postId: number;
  visibleComments?: number | "unlimited";
  actions?: (extendedPost: ExtendedPost & { user: User }) => React.JSX.Element;
};

export const PostsFeedCard: FC<PostsFeedCardProps> = ({
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
              {getUserHandle(user)}
            </Button>
          </Typography>
        )}
        <Typography variant="heading" as="h3">
          {title} {postId}
        </Typography>
        <Separator size="small" />
        <Typography variant="subheading" weight="bold">
          {body}
        </Typography>
      </article>
      {!!comments?.length && (
        <>
          <Separator size="small" />
          <CommentSeparator />
          <CommentsList comments={getVisibleComments()} />
        </>
      )}
      {actions && (
        <>
          <Separator />
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
        </>
      )}
    </section>
  );
};

type CommentsListProps = {
  comments: Comment[];
};

const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      renderItem={(comment) => (
        <PostsFeedCardComment body={comment.body} email={comment.email} />
      )}
      renderSeparator={() => <CommentSeparator />}
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
      <Typography weight="bold">@ {email}</Typography>
      <Separator size="small" />
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
