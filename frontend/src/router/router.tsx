/* eslint-disable react-hooks/rules-of-hooks */
import {
  createRouter,
  createRootRoute,
  Outlet,
  createRoute,
  useLocation,
} from "@tanstack/react-router";
import Home from "../pages/Home";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Authenticate from "../pages/auth/Authenticate";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

const rootRoute = createRootRoute({
  component: () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState<boolean>(false);
    useEffect(() => {
      setIsHome(location.pathname === "/" || location.pathname.includes("auth"));
    }, [location]);
    return (
      <>
        {!isHome && <Navbar />}
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
  getParentRoute: () => authRoute,
  path: "/routines",
  component: () => <p>routines</p>,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute.addChildren([loginRoute, registerRoute]),
  routinesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
