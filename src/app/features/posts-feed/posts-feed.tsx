import { useLogger } from "@/app/providers";
import { GetAllPostsDTO } from "@/models";
import { FlatList, FlatListProps } from "@/ui";
import { Separator } from "@/ui/separator";
import PostsFeedCard from "./posts-feed-card";

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

PostsFeed.Card = PostsFeedCard;
