/* eslint-disable react-hooks/rules-of-hooks */
import {
  createRouter,
  createRootRoute,
  Outlet,
  createRoute,
  useLocation,
} from "@tanstack/react-router";
import Home from "../pages/Home";
import Authenticate from "../pages/auth/Authenticate";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { App } from "../pages/app/App";
import { Routines } from "../pages/routines/Routines";
import { Exercises } from "../pages/exercises/Exercises";
import useApi from "../hooks/useApi";
import { useSession } from "../context/auth/context";
import { UserSession } from "../model/User";
import { useQuery } from "@tanstack/react-query";

const rootRoute = createRootRoute({
  component: () => {
    const api = useApi();
    const location = useLocation();
    const { setSession } = useSession();
    useQuery({
      queryKey: ["user-session", location.pathname],
      queryFn: () => {
        api
          .get("auth/profile")
          .then((response) => {
            if (response.success) {
              setSession(response.data as unknown as UserSession);
            }
          })
          .catch(() => {
            if (location.pathname !== "/") {
              alert("Server error, try checking this site later");
            }
          });
      },
      enabled: !location.pathname.includes("auth"),
    });
    return (
      <>
        <Outlet />
      </>
    );
  },
});
// Add Routes here
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: () => <Authenticate />,
});
const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/",
  component: () => <Login />,
});
const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/register",
  component: () => <Register />,
});

const routinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/routines",
  component: () => <Routines />,
});
const exercisesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exercises",
  component: () => <Exercises />,
});
const myApp = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: () => <App />,
});
const myRoutines = createRoute({
  getParentRoute: () => myApp,
  path: "/",
  component: () => <p>My routines</p>,
});
const myExercises = createRoute({
  getParentRoute: () => myApp,
  path: "/my-exercises",
  component: () => <p>My exercises</p>,
});
const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute.addChildren([loginRoute, registerRoute]),
  routinesRoute,
  exercisesRoute,
  myApp.addChildren([myRoutines, myExercises]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
