import { FlatList, FlatListProps } from "@/app/ui";
import { Button } from "@/app/ui/button/button";
import { Separator } from "@/app/ui/separator";
import { Typography } from "@/app/ui/typography";
import { GetAllPostsDTO } from "@/models";
import { FC } from "react";

export type PostCardProps = {
  //   username: string;
  body: string;
  title: string;
  //   comments: string[];
  //   postId: string;
};

export const PostCard: FC<PostCardProps> = ({ body, title }) => {
  return (
    <article>
      <Typography>
        Posted by
        <Button variant="plain" size="mini">
          @Antonette
        </Button>
      </Typography>
      <a href="">
        <Typography variant="heading" as="h3">
          {title}
        </Typography>
      </a>
      <Separator size="small" />
      <Typography>{body}</Typography>
    </article>
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
