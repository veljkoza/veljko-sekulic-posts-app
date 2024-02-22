import { GetCommentsByPostIdDTO, User } from "@/models";
import { PropsWithChildren, createContext, useContext } from "react";

// cache the users
const usersCache: Record<number, User> = {};
//cache the comments by postId
const postsCommentsCache: Record<string, GetCommentsByPostIdDTO> = {};

export type CacheContextValue = {
  cache: {
    users: typeof usersCache;
    postsComments: typeof postsCommentsCache;
  };
};
const CacheContext = createContext<CacheContextValue>({} as CacheContextValue);

export const CacheProvider = (props: PropsWithChildren) => {
  const cache = { users: usersCache, postsComments: postsCommentsCache };
  return (
    <CacheContext.Provider value={{ cache }}>
      {props.children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);
