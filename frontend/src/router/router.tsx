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

const rootRoute = createRootRoute({
  component: () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState<boolean>(false);
    useEffect(() => {
      setIsHome(location.pathname === "/")
    }, [location])
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
  component: () => <p>auth</p>,
});

const routinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/routines",
  component: () => <p>routines</p>,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute,
  routinesRoute
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
