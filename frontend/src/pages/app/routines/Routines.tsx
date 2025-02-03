import { useSession } from "../../../context/auth/context";
import MyRoutines from "./myRoutines/MyRoutines";
import PublicRoutines from "./publicRoutines/PublicRoutines";

const Routines = () => {
  const { session } = useSession();
  
  return session ? <MyRoutines /> : <PublicRoutines />;
};

export default Routines;
