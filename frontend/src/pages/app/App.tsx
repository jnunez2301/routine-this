import { Outlet } from "@tanstack/react-router";

export const App = () => {
  return (
    <>
      {/* TODO: We might need a Navbar to navigate trough content  */}
      <Outlet />
    </>
  );
};
