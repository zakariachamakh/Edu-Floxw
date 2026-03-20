import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { TopNavigation } from "./TopNavigation";

export function Layout() {
  return (
    <Flex minH="100vh" bg="#F7FAFC" direction="column">
      <TopNavigation />
      <Box flex="1" display="flex" flexDirection="column">
        <Outlet />
      </Box>
    </Flex>
  );
}
