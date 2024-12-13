import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "@tanstack/react-router";
import { apiUrl } from "../../environment";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
  });
  async function handleLogin(values: typeof form.values) {
    const response = await fetch(`${apiUrl}/auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    const apiResponse = await response.json();

    console.log(apiResponse)
  }
  return (
    <form onSubmit={form.onSubmit(handleLogin)}>
      <h2>Login</h2>
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
