import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState();
  const [pic, setPic] = useState();
  const [leading, setLoading] = useState(false);
  const toast = useToast();

  const handleclick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image",
        status: "warning",
        duration: 5000,
        isCloseable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkbcyluax");
      fetch(""); //left off here
    }
  };

  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Please Enter your Name"
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Please Enter your Email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Create a Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Retype your Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          p={1}
          accept="image/*"
          onChange={(event) => postDetails(event.target.files[0])}
        />
      </FormControl>

      <Button colorScheme="blue" width="100%" mt="10px" onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
