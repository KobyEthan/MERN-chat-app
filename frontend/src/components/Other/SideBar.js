import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
let socket;

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("notification received", (newNotification) => {
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    });

    return () => {
      socket.off("notification received");
    };
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please fill this field",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "An error occurred during searching",
        description: "Failed to load search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error getting chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/notification", config);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast({
        title: "Error Occurred!",
        description: "Failed to fetch notifications",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleNotificationClick = async (notif) => {
    setSelectedChat(notif.chat);
    setNotifications(notifications.filter((n) => n !== notif));
    // Mark notification as read (Optional: Update this in the backend if needed)
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px"
        borderWidth="0px"
      >
        <Tooltip
          label="Search Users to chat with"
          hasArrow
          placement="bottom-end"
        >
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search" style={{ color: "white" }}></i>
            <Text display={{ base: "none", md: "flex" }} color={"white"} px="4">
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="4xl" fontFamily="Roboto">
          Chat-App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList style={{ color: "black" }} pl={5}>
              {!notifications.length && "No New Messages"}
              {notifications.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.profilePic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem color="black">My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem color="red" onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
