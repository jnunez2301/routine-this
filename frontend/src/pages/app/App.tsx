import { Outlet } from "@tanstack/react-router";

export const App = () => {
  return (
    <>
      <p>Nav</p>
      <Outlet />
    </>
  );
};
