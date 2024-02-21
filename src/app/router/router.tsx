import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { PostsFeedPage } from "../features/posts-feed";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main>
        <App />
      </main>
    ),
  },
  {
    path: routes.posts.path,
    element: <PostsFeedPage />,
    children: [
      {
        path: routes.posts.details().template,
        element: (
          <div>
            <h1>Posts Details</h1>
          </div>
        ),
      },
    ],
  },
]);
