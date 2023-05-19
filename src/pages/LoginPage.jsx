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

function LoginPage() {
  const navigate = useNavigate();

  const { setToken, setIsLoggedIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5005/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const tokenFromResponse = await response.json();
        setToken(tokenFromResponse.authToken);
        setIsLoggedIn(true);
        navigate("/profile");
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
            {/* <Group position="apart" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group> */}
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

// import { useContext, useState } from "react";
// import { AuthContext } from "../src/context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const { setToken } = useContext(AuthContext);

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await fetch("http://localhost:5005/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });
//     if (response.status === 200) {
//       const tokenFromResponse = await response.json();
//       setToken(tokenFromResponse);
//       navigate("/profile");
//     }
//   };

//   return (
//     <>
//       <h1>Login</h1>
//       <Link to="/profile">Profile</Link>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email
//           <input
//             type="text"
//             required
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </label>
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// };

// export default LoginPage;
