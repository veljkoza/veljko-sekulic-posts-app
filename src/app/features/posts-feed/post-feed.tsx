import { Comment, GetAllPostsDTO } from "@/models";
import { FlatList, FlatListProps } from "@/ui";
import { Button } from "@/ui/button/button";
import { Separator } from "@/ui/separator";
import { Typography } from "@/ui/typography";
import { FC } from "react";
import styles from "./posts-feed.module.css";

export type PostCardProps = {
  //   username: string;
  body: string;
  title: string;
  comments?: Comment[];
  //   postId: string;
};

export const PostCard: FC<PostCardProps> = ({ body, title, comments }) => {
  return (
    <section className={styles["post-feed-card"]}>
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
      {!!comments?.length && (
        <>
          <Separator size="small" />
          <div
            className={styles["post-feed-card__coments-separator-container"]}
          >
            <div className={styles["post-feed-card__coments-separator"]}></div>
          </div>
        </>
      )}
      {comments && (
        <FlatList
          data={comments.slice(0, 3)}
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
