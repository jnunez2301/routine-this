import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./router/router";
import "@mantine/core/styles.css";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
