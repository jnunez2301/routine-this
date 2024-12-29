import { Outlet } from "@tanstack/react-router";
import Navbar from "../../components/Navbar";
import UserIcon from "../../components/icons/UserIcon";
import '../../components/Navbar.styles.css'
export const App = () => {

   const exampleLinks = Array.from({length: 5}, (_, i) => {
      return {id: i+1, path: i % 2 ? '/' : '/app', component: () => {
        return <div className="navlink-content"><UserIcon /><p key={i}>Link {i}</p></div>
      }}
    })
  return (
    <>
      <Navbar
        links={exampleLinks}
      />
      <Outlet />
    </>
  );
};
