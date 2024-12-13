import {
  createRouter,
  createRootRoute,
  Outlet,
  createRoute,
} from '@tanstack/react-router'
import Home from '../pages/Home'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})
// Add Routes here
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Home />
})

const routeTree = rootRoute.addChildren([
  homeRoute
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router;