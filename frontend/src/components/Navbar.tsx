import { useLocation, useNavigate } from "@tanstack/react-router";
import "./Navbar.styles.css";
import RoutineThisIcon from "./RoutineThisIcon";
import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Burger, Drawer } from "@mantine/core";

interface NavLink {
  id: string | number;
  component: React.FC;
  path: string;
}
interface NavbarProps {
  links?: NavLink[];
}

const Navbar = ({ links = [] }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const matches = useMediaQuery("(max-width: 768px)");
  function DisplayLinks({ links }: { links: NavLink[] }) {
    return (
      links &&
      links.length > 0 &&
      links.map((l) => (
        <div
          key={l.id}
          onClick={() => navigate({to: l.path})}
          className={
            "navlink " +
            l.id +
            (location.href === l.path ? " link-active" : "")
          }
        >
          {<l.component />}
        </div>
      ))
    );
  }
  return (
    <nav id="navbar">
      <div className="left-menu">
        <RoutineThisIcon onClick={() => navigate({to: '/'})}/>
      </div>
      <div className="middle-title"></div>
      <div className="right-menu">
       {!matches ? <DisplayLinks links={links} /> :
        <div>
          <Burger opened={!opened} onClick={toggle} />
          <Drawer
            size="xs"
            position="right"
            opened={!opened}
            onClose={toggle}
            title="Menu"
          >
            <DisplayLinks links={links} />
          </Drawer>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
