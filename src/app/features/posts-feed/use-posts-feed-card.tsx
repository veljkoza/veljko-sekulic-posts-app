import { useCache, useHttpClient } from "@/app/providers";
import { GetCommentsByPostIdDTO } from "@/models";
import { useVisible } from "@/ui";
import { useEffect, useRef } from "react";

export const usePostFeedCard = ({
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
