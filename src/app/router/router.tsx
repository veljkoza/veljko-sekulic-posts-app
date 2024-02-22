import { createBrowserRouter } from "react-router-dom";
import { PostDetailsPage } from "../features/post-details";
import { PostsFeedPage } from "../features/posts-feed";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsFeedPage />,
  },
  {
    path: routes.posts.path,
    element: <PostsFeedPage />,
  },
  {
    path: routes.posts.details().template,
    element: <PostDetailsPage />,
  },
]);
