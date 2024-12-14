import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "@tanstack/react-router";
import { apiUrl } from "../../environment";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { ApiResponse } from "../../model/ApiResponse";
import { login } from "../../cake/authSlice";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
  });
  async function handleLogin(values: typeof form.values) {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const apiResponse: ApiResponse = await response.json();

    if (apiResponse.success && apiResponse.token) {
      dispatch(login({ user: values.username, token: apiResponse.token }));
      navigate({
        to: '/'
      })
    }
  }
  return (
    <form onSubmit={form.onSubmit(handleLogin)}>
      <h2>Login</h2>
      <p>Welcome back, lets workout!</p>
      <TextInput
        my="md"
        placeholder="Username"
        label="Username"
        {...form.getInputProps("username")}
        minLength={4}
        maxLength={32}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        minLength={6}
        {...form.getInputProps("password")}
        required
      />
      <button type="submit" className="btn">
        Sign in
      </button>
      <div className="auth-link">
        <p>Don't have a user?</p>
        <Link to="/auth/register">Register</Link>
      </div>
    </form>
  );
};

export default Login;
