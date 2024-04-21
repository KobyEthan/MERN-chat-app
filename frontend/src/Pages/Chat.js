import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SideBar from "../components/Other/SideBar";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;
