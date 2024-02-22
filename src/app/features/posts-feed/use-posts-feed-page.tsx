import { useCache, useHttpClient } from "@/app/providers";
import { useDebounce } from "@/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePostsFeedPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const { queries } = useHttpClient();
  const navigate = useNavigate();
  const debouncedSearchInput = useDebounce(searchInput);
  const getParams = () => {
    if (debouncedSearchInput) return { username: debouncedSearchInput };
  };
  const { data, isLoading, error } = queries.extendedPost.getAll.useQuery({
    params: getParams(),
  });

  const { cache } = useCache();
  const { extendedPosts, numberOfPrefetchedPosts } = data || {};

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  // cache initial posts
  useEffect(() => {
    extendedPosts
      ?.slice(0, numberOfPrefetchedPosts)
      .forEach((post) => (cache.postsComments[post.id] = post.comments));
  }, [extendedPosts?.length]);

  return {
    extendedPosts,
    isLoading,
    error,
    searchInputHandler,
    cache,
    navigate,
  };
};
