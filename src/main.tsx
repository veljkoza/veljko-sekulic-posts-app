import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { HttpClientProvider } from "./app/providers";
import { router } from "./app/router";
import { httpClient } from "./infrastructure";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HttpClientProvider httpClient={httpClient}>
      <RouterProvider router={router} />
    </HttpClientProvider>
  </React.StrictMode>,
);
