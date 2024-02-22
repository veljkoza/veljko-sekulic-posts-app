import { ExtendedPost, GetCommentsByPostIdDTO, User } from "@/models";
import { PropsWithChildren, createContext, useContext } from "react";

// cache the users
const usersCache: Record<number, User> = {};

//cache the comments by postId
const postsCommentsCache: Record<string, GetCommentsByPostIdDTO> = {};

//cache posts with user and comments objects
const extendedPostsCache: Record<
  string,
  Partial<ExtendedPost & { user?: User }>
> = {};

export type CacheContextValue = {
  cache: {
    users: typeof usersCache;
    postsComments: typeof postsCommentsCache;
    extendedPosts: typeof extendedPostsCache;
  };
};
const CacheContext = createContext<CacheContextValue>({} as CacheContextValue);

export const CacheProvider = (props: PropsWithChildren) => {
  const cache = {
    users: usersCache,
    postsComments: postsCommentsCache,
    extendedPosts: extendedPostsCache,
  };
  return (
    <CacheContext.Provider value={{ cache }}>
      {props.children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);
