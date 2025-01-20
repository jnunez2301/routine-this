import { Outlet } from "@tanstack/react-router";

const Authenticate = () => {
  return (
    <section id="authenticate" className="authenticate">
      <Outlet />
    </section>
  );
};

export default Authenticate;
