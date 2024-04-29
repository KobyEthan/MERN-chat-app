import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      cursor="pointer"
      bgColor="blue"
      color={"white"}
      fontSize={12}
      variant="solid"
      m={1}
      mb={2}
      onClick={handleFunction}
      fontFamily={"Roboto"}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
