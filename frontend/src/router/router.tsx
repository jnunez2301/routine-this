import {
  createRouter,
  createRootRoute,
} from '@tanstack/react-router'
import Home from '../pages/Home'

const rootRoute = createRootRoute({
  component: () => <Home />
})
// Add Routes here
// const indexRoute = createRoot({
//  root: () => rootRoute,
//  path: '/',
//  component: () => <p>hi</p>
//})

const routeTree = rootRoute.addChildren([])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router;