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
import useApi from "../hooks/useApi";
import { useSession } from "../context/auth/context";
import { UserSession } from "../model/User";
import { useQuery } from "@tanstack/react-query";
import Toast from "../components/core/Toast";
import MyRoutines from "../pages/app/routines/myRoutines/MyRoutines";
import PublicRoutines from "../pages/app/routines/publicRoutines/PublicRoutines";
import Exercises from "../pages/app/exercises/Exercises";
import ExerciseListByBodyPart from "../pages/app/exercises/ExerciseListByBodyPart";

const rootRoute = createRootRoute({
  component: () => {
    const api = useApi();
    const location = useLocation();
    const { setSession, session } = useSession();
    useQuery({
      queryKey: ["user-session", location.pathname],
      queryFn: () => {
        api
          .get("auth/profile", { avoidClear: true, hideToast: true })
          .then((response) => {
            if (response.success) {
              const data = response.data as unknown as UserSession;
              setSession(data);
              return data;
            }
          });
      },
      staleTime: Infinity,
      enabled: !session
    });
    return (
      <>
        <Toast />
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

const app = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: () => <App />,
});
const routines = createRoute({
  getParentRoute: () => app,
  path: "/routines",
  component: () => <PublicRoutines />,
});
const myRoutines = createRoute({
  getParentRoute: () => app,
  path: "/my-routines",
  component: () => <MyRoutines />,
});
const settings = createRoute({
  getParentRoute: () => app,
  path: "/settings",
  component: () => <p>Settings</p>,
});
const exercises = createRoute({
  getParentRoute: () => app,
  path: "/exercises",
  component: () => <Exercises />,
});
const exerciseList = createRoute({
  getParentRoute: () => app,
  path: "/exercises/$bodyPart",
  component: () => <ExerciseListByBodyPart />,
});
const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute.addChildren([loginRoute, registerRoute]),
  app.addChildren([exercises, exerciseList, routines, settings, myRoutines]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
