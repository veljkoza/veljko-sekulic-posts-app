import { Post } from "@/models";

interface IPostsService {
  getAll: () => Promise<Post>;
  getById: () => Promise<Post>;
}

const postsService = {
  getAll: async () => {},
};
