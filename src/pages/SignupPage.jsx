import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { FooterSocial } from "./FooterSocial";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, password };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/signup`, requestBody);
      if (response.status === 201) {
        navigate("/login");
      }
      if (response.status === 500) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome to{" "}
          <Text component="span" variant="gradient" gradient={{ from: "blue", to: "cyan" }} inherit>
            KoolSpots!
          </Text>
        </Title>
        {/* <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text> */}
        <form onSubmit={handleSignupSubmit}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Username"
              placeholder="Your Username"
              required
              value={username}
              onChange={handleUsername}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={handlePassword}
              mt="md"
            />

            {/* <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group> */}
            <Button fullWidth mt="xl" type="submit">
              Sign Up
            </Button>
          </Paper>
        </form>
      </Container>
      <FooterSocial />
    </>
    // <div className="SignupPage">
    //   <h1>Sign Up</h1>

    //   <form onSubmit={handleSignupSubmit}>
    //     <label>Username:</label>
    //     <input
    //       type="text"
    //       name="username"
    //       value={username}
    //       onChange={handleUsername}
    //     />

    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={password}
    //       onChange={handlePassword}
    //     />

    //     <button type="submit">Sign Up</button>
    //   </form>

    //   {errorMessage && <p className="error-message">{errorMessage}</p>}

    //   <p>Already have account?</p>
    //   <Link to={"/login"}> Login</Link>
    // </div>
  );
}

export default SignupPage;
