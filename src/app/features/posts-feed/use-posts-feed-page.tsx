import { useCache, useHttpClient } from "@/app/providers";
import { useEffect } from "react";

export const usePostsFeedPage = () => {
  const { queries } = useHttpClient();
  const { data, isLoading, error } = queries.extendedPost.getAll.useQuery();

  const { cache } = useCache();
  const { extendedPosts, numberOfPrefetchedPosts } = data || {};

  // cache initial posts
  useEffect(() => {
    extendedPosts
      ?.slice(0, numberOfPrefetchedPosts)
      .forEach((post) => (cache.postsComments[post.id] = post.comments));
  }, [extendedPosts?.length]);

  return { extendedPosts, isLoading, error };
};


