export const routes = {
  posts: {
    path: "/posts",
    details(id?: string) {
      return {
        path: `${this.path}/${id}`,
        template: `${this.path}/:postId`,
      };
    },
  },
} as const;
