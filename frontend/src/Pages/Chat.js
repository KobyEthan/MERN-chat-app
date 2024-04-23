import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideBar from "../components/Other/SideBar";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
        display="flex"
        w="100%"
        h="91.5vh"
        justifyContent={"space-between"}
        p={"10px"}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;
