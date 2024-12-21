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
import { useQuery } from "@tanstack/react-query";
import { profile, TOKEN_KEY } from "../cake/authSlice";
import { apiUrl } from "../environment";
import { ApiResponse } from "../model/ApiResponse";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

const rootRoute = createRootRoute({
  component: () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    useQuery({
      queryKey: ['user-profile'],
      queryFn: async() => {
        const response = await fetch(`${apiUrl}/auth/profile`, {
          headers: {
            'Authorization' : `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          }
        })
        const apiResponse: ApiResponse = await response.json();
        // @ts-expect-error: Username does exist in this context
        const username = apiResponse.data.username;
        dispatch(profile({username, isLoggedIn: apiResponse.success}))
        return apiResponse.data;
      }
    })
    useEffect(() => {
      setIsHome(location.pathname === "/" || location.pathname.includes("auth"));
    }, [location]);
    return (
      <>
        {!isHome && <Navbar />}
        <Outlet />
      </>
    );
  }
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
  component: () => <p>routines</p>,
});
const exercisesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/exercises',
  component: () => <p>Exercises</p>
})
const myApp =  createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component:  () => <p>Routine-This App</p>
})
const myRoutines = createRoute({
  getParentRoute: () => myApp,
  path: '/my-routines',
  component: () => <p>My routines</p>
})
const myExercises = createRoute({
  getParentRoute: () => myApp,
  path: '/my-exercises',
  component: () => <p>My exercises</p>
})
const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute.addChildren([loginRoute, registerRoute]),
  routinesRoute,
  exercisesRoute,
  myApp.addChildren([
    myRoutines,
    myExercises
  ])
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
