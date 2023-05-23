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
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const { setToken, setIsLoggedIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const tokenFromResponse = response.data.authToken;
        setToken(tokenFromResponse);
        setIsLoggedIn(true);
        navigate("/spots");
        console.log("logging in");
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
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
        <form onSubmit={handleSubmit}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Username"
              placeholder="Your Username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
      <FooterSocial />
    </>
  );
}

export default LoginPage;
