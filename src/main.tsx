import ReactDOM from "react-dom/client";
import "./index.css";

import React from "react";
import { RouterProvider } from "react-router-dom";
import { CacheProvider, HttpClientProvider } from "./app/providers";
import { router } from "./app/router";
import { httpClient } from "./infrastructure";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HttpClientProvider httpClient={httpClient}>
      <CacheProvider>
        <RouterProvider router={router} />
      </CacheProvider>
    </HttpClientProvider>
  </React.StrictMode>,
);
