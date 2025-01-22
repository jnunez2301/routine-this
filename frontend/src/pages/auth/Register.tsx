import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "../../components/core/Input";
import { Link } from "@tanstack/react-router";
import { Button } from "../../components/core/Button";
import { useState } from "react";
import useApi from "../../hooks/useApi";

type RegisterRequest = {
  username: string;
  password: string;
  confirmPassword: string;
  secretAnswer: string;
};

const Register = () => {
  const { handleSubmit, register, reset } = useForm<RegisterRequest>();
  const [isUserTaken, setIsUserTaken] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<string>("");
  const api = useApi();
  function clearErrors() {
    setIsPasswordValid("");
    setIsUserTaken(false);
  }
  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    clearErrors();
    if (data.password !== data.confirmPassword) {
      setIsPasswordValid("Make sure you typed your password right");
      return;
    }
    api
    .post("auth/register", data)
    .then((response) => {
      if (response.success) {
        reset();
      }
    });
  };
  async function getUserAvailability(username: string): Promise<boolean> {
    if (username.length === 0) {
      setIsUserTaken(false);
      return false;
    }
    const response = await api.get(`auth/check/${username}`);
    if (!response.success) {
      console.log(response.message);
      setIsUserTaken(true);
      return response.success;
    }
    setIsUserTaken(false);
    return false;
  }
  return (
    <section id="register" className="flex flex-col lg:flex-row items-center">
      <div className="w-full max-lg:h-36 lg:w-[80vw] lg:h-screen bg-slate-700"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-5 w-full"
      >
        <h2 className="text-2xl">Start your own journey!</h2>
        <p className="text-xs text-slate-500">
          Building muscles, staying lean or just having fun is easier than you
          think
        </p>
        <label htmlFor="username">Username</label>
        <TextInput
          type="text"
          $invalid={isUserTaken}
          id="username"
          placeholder="Your username"
          minLength={4}
          maxLength={32}
          {...register("username", { minLength: 4 })}
          onBlur={(e) => getUserAvailability(e.target.value)}
          required
        />
        {isUserTaken ? (
          <p className="text-xs text-red-500">Username is already taken</p>
        ) : null}
        <label htmlFor="password">Password</label>
        <TextInput
          id="password"
          type="password"
          minLength={6}
          placeholder="Your password"
          {...register("password")}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <TextInput
          id="confirmPassword"
          type="password"
          minLength={6}
          placeholder="Confirm password"
          {...register("confirmPassword")}
          required
        />
        <p className="text-xs text-red-500">{isPasswordValid}</p>
        <label htmlFor="secretAnswer">Secret Answer</label>
        <TextInput
          id="secretAnswer"
          type="text"
          minLength={1}
          maxLength={255}
          placeholder="Think about something you like or a show you love"
          {...register("secretAnswer")}
          required
        />
        <p className="text-slate-400">
          Just in case you forget your password answering this question will be
          useful
        </p>

        <div>
          <p>
            Already have an account? {"  "}
            <Link to="/auth" style={{ color: "blue" }}>
              Sign in
            </Link>
          </p>
        </div>
        <Button disabled={isUserTaken} $variant="primary">
          Register
        </Button>
      </form>
    </section>
  );
};

export default Register;
