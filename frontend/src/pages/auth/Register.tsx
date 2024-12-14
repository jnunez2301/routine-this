import { PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "@tanstack/react-router";
import { apiUrl } from "../../environment";

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
    secretAnswer: "",
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
  });
  async function handleRegister(values: typeof form.values){
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const apiResponse = await response.json();
    console.log(apiResponse);
  }
  return (
    <form onSubmit={form.onSubmit(handleRegister)}>
      <h2>Register</h2>
      <p>Just be fit in your own way</p>
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
      <PasswordInput
        placeholder="Whats your favorite character?"
        label="Secret Answer"
        minLength={1}
        maxLength={255}
        {...form.getInputProps("secretAnswer")}
        required
      />
      <p className="text info">If you forget your password, this answer will be useful</p>
      <button type="submit" className="btn">
        Register
      </button>
      <div className="auth-link">
        <p>Already have a user?</p>
        <Link to="/auth">Sign in</Link>
      </div>
    </form>
  );
};

export default Register;
