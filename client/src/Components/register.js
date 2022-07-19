import { Box, Button, FormControl, FormLabel, Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    axios
      .post(
        "http://localhost:3000/usuario/cadastro",
        { username: username, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      )
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        return res.data;
      });
  };

  return (
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
        <Input id="my-password" onChange={(e) => setPassword(e.target.value)} />
        <br />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{ "margin-top": "10px" }}
          onClick={() => registerUser()}
        >
          Register
        </Button>
      </FormControl>
    </Box>
  );
};

export default AuthForm;
