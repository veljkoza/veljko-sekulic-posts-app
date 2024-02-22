import { useCache, useHttpClient } from "@/app/providers";
import { ExtendedPost } from "@/models";
import { Header, Separator } from "@/ui";
import { useParams } from "react-router-dom";
import { PostsFeed } from "../posts-feed/posts-feed";

export const PostDetailsPage = () => {
  const { postId = "" } = useParams();
  console.log({ postId });
  const { queries } = useHttpClient();
  const { cache } = useCache();
  const cachedExtendedPost = cache.extendedPosts[postId];

  const getInitialData = () => {
    if (cachedExtendedPost)
      return {
        ...(cachedExtendedPost as ExtendedPost),
        user: cachedExtendedPost.user!,
      };
  };

  const {
    data: extendedPost,
    isLoading,
    error,
  } = queries.extendedPost.getById.useQuery({
    params: +postId,
    options: {
      initialData: getInitialData(),
    },
  });
  const getBody = () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!extendedPost) return <div>No data...</div>;

    return (
      <PostsFeed.Card
        visibleComments="unlimited"
        body={extendedPost.body}
        comments={extendedPost.comments}
        postId={extendedPost.id}
        title={extendedPost.title}
        userId={extendedPost.userId}
      />
    );
  };
  return (
    <main className="app-container">
      <Header />
      <div>
        <Separator />
        {getBody()}
      </div>
    </main>
  );
};
