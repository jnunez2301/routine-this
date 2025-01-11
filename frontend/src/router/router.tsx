import {
  createRouter,
  createRootRoute,
  Outlet,
  createRoute,
} from "@tanstack/react-router";
import Home from "../pages/Home";
import Authenticate from "../pages/auth/Authenticate";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import { App } from "../pages/app/App";
import { Routines } from "../pages/routines/Routines";
import { Exercises } from "../pages/exercises/Exercises";
import Navbar from "../components/Navbar";

const rootRoute = createRootRoute({
  component: () => {
    // const dispatch = useDispatch<AppDispatch>();
    /* useQuery({
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
    }) */
    return (
      <>
        <Navbar  />
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
  component: () => <Routines />,
});
const exercisesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/exercises',
  component: () => <Exercises />
})
const myApp =  createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component:  () => <App />
})
const myRoutines = createRoute({
  getParentRoute: () => myApp,
  path: '/',
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
