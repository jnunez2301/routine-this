import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/core/Button";
import { TextInput } from "../../components/core/Input";
import useApi, { sessionTokenName } from "../../hooks/useApi";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSession } from "../../context/auth/context";
import { UserSession } from "../../model/User";

interface LoginRequest {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginRequest>();
  const session = useSession();
  const api = useApi();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    api.post("auth/login", data).then((response) => {
      if (response.success && response.token) {
        localStorage.setItem(sessionTokenName, response.token);
        session.setSession(response.data as unknown as UserSession);
        navigate({ to: "/" });
      }
    });
  };
  return (
    <section id="login" className="flex flex-col lg:flex-row items-center">
      <div className="w-full max-lg:h-36 lg:w-[80vw] lg:h-screen bg-slate-700"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-5 w-full"
      >
        <h2 className="text-2xl">Welcome Back</h2>
        <p className="text-xs text-slate-500">
          Let's keep building those muscles!
        </p>
        <label htmlFor="username">Username</label>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          {...register("username")}
        />
        <label htmlFor="password">Password</label>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          {...register("password")}
        />
        <div>
          <p>
            Don't have an account?{" "}
            <Link to="/auth/register" style={{ color: "blue" }}>
              Register
            </Link>
          </p>
        </div>
        <Button $variant="primary">Login</Button>
      </form>
    </section>
  );
};

export default Login;
