import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: routes.posts.path,
    element: (
      <div>
        <h1>Posts</h1>
      </div>
    ),
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
