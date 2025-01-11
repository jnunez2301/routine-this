import { Outlet } from "@tanstack/react-router";
import Navbar from "../../components/Navbar";
import '../../components/Navbar.styles.css'

export const App = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};
