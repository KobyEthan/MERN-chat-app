import React from "react";
import { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        boxShadow="lg"
        p={2}
        w="100%"
        m="100px 0 15px"
        rounded="md"
        className="box"
      >
        <Text fontSize="3xl" fontFamily="roboto">
          Chat-App
        </Text>
      </Box>
      <Box w="100%" className="box" p={4} rounded="md" boxShadow="lg">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              _selected={{ color: "white", bg: "blue.500" }}
              color="white"
              width="50%"
            >
              Login
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.500" }}
              color="white"
              width="50%"
            >
              Sign up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
