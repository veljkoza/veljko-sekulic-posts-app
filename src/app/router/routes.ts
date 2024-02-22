export const routes = {
  root: {
    path: "/",
  },
  posts: {
    path: "/posts",
    details(id?: number) {
      return {
        path: `${this.path}/${id}`,
        template: `${this.path}/:postId`,
      };
    },
  },
} as const;
