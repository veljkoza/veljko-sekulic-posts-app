import { useHttpClient } from "@/app/providers";
import { Comment, GetAllPostsDTO } from "@/models";
import { FlatList, FlatListProps, useVisible } from "@/ui";
import { Button } from "@/ui/button/button";
import { Separator } from "@/ui/separator";
import { Typography } from "@/ui/typography";
import { FC, useRef } from "react";
import styles from "./posts-feed.module.css";
/* eslint-disable @typescript-eslint/no-explicit-any */

export type PostCardProps = {
  //   username: string;
  body: string;
  title: string;
  comments: Comment[];
  postId: number;
};

export const PostCard: FC<PostCardProps> = ({
  body,
  title,
  comments,
  postId,
}) => {
  const postRef = useRef<HTMLScriptElement | null>(null);

  const { isVisible } = useVisible(postRef, {
    onIntersect: (entry) => {
      const postId = entry.target.getAttribute("data-post-id");
      console.log({ postId });
    },
  });
  const { queries } = useHttpClient();
  const { data: fetchedComments } = queries.posts.getCommentsByPostId.useQuery({
    params: postId,
    options: { enabled: isVisible && comments.length === 0 },
  });

  const computedComments = () => {
    if (fetchedComments) return fetchedComments;
    return comments;
  };

  return (
    <section
      className={styles["post-feed-card"]}
      ref={postRef}
      data-post-id={postId}
    >
      <article>
        <Typography style={{ paddingBottom: "1rem" }}>
          Posted by
          <Button
            variant="plain"
            size="paddingless"
            style={{ marginLeft: "1rem" }}
          >
            @Antonette
          </Button>
        </Typography>
        <a href="">
          <Typography variant="heading" as="h3">
            {title}
          </Typography>
        </a>
        <Separator size="small" />
        <Typography variant="subheading">{body}</Typography>
      </article>
      {!!computedComments().length && (
        <>
          <Separator size="small" />
          <div
            className={styles["post-feed-card__coments-separator-container"]}
          >
            <div className={styles["post-feed-card__coments-separator"]}></div>
          </div>
        </>
      )}
      {computedComments() && (
        <FlatList
          data={computedComments().slice(0, 3)}
          renderItem={(comment) => (
            <div className={styles["post-feed-card__comment"]}>
              <Button
                variant="plain"
                size="paddingless"
                style={{ marginBottom: "1rem" }}
              >
                @veljkoza
              </Button>
              <Typography>{comment.body}</Typography>
            </div>
          )}
          renderSeparator={() => (
            <div
              className={styles["post-feed-card__coments-separator-container"]}
            >
              <div
                className={styles["post-feed-card__coments-separator"]}
              ></div>
            </div>
          )}
        />
      )}
    </section>
  );
};

export type PostsListProps<T extends GetAllPostsDTO> = FlatListProps<T>;

export const PostsFeed = <T extends GetAllPostsDTO>({
  renderItem,
  data,
}: PostsListProps<T>) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      renderSeparator={(item) => <Separator key={item.id + 999} />}
    />
  );
};

PostsFeed.Card = PostCard;
