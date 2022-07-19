import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  listItemTextClasses,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const logUser = () => {
    axios
      .post("http://localhost:3000/usuario/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        navigate("/estoque");
        return res.data;
      });
  };
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <FormControl>
          <FormLabel htmlFor="my-input">Username:</FormLabel>
          <Input
            id="my-input"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <br />
          <FormLabel htmlFor="my-password">Password:</FormLabel>
          <Input
            id="my-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ "margin-top": "10px" }}
            onClick={() => logUser()}
          >
            Login
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default LoginForm;
