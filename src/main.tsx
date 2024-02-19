import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";


const router = {
  posts: {
    path: '/posts',
    details(id: string) {
      return {
        path: `${this.path}/${id}`
      }
    }
  }
}

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/posts",
    element: (
      <div>
        <h1>Posts</h1>
      </div>
    ),
  },
  {
    path: "/posts/:id",
    element: (
      <div>
        <h1>Posts Details</h1>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routerConfig} />
  </React.StrictMode>,
);
