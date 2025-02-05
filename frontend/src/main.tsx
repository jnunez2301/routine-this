import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./router/router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "./context/auth/AuthContext";
import { Toaster } from "./context/toast/ToastContext";
import { ExerciseProvider } from "./context/app/exercise/ExerciseContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ExerciseProvider>
          <Toaster>
            <RouterProvider router={router} />
          </Toaster>
        </ExerciseProvider>
      </QueryClientProvider>
    </SessionProvider>
  </StrictMode>
);
