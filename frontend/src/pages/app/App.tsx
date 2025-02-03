import { Outlet } from "@tanstack/react-router";
import Navbar from "../../components/Navbar";

export const App = () => {
  return (
    <>
      {/* TODO: We might need a Navbar to navigate trough content  */}
      <Navbar />
      <Outlet />
    </>
  );
};
