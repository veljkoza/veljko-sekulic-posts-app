import ReactDOM from "react-dom/client";
import "./index.css";

import React from "react";
import { RouterProvider } from "react-router-dom";
import {
  CacheProvider,
  HttpClientProvider,
  LoggerProvider,
} from "./app/providers";
import { router } from "./app/router";
import { httpClient } from "./infrastructure";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoggerProvider>
      <HttpClientProvider httpClient={httpClient}>
        <CacheProvider>
          <RouterProvider router={router} />
        </CacheProvider>
      </HttpClientProvider>
    </LoggerProvider>
  </React.StrictMode>,
);
