import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Shield, FileText, HelpCircle, UserPlus, CheckCircle, Calendar, LogOut, Settings } from "lucide-react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem, MenuSeparator } from "./ui/menu";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Schedule", path: "/schedule" },
  { name: "Learners", path: "/learners" },
  { name: "Tasks", path: "/tasks" },
  { name: "Classes", path: "/classes" },
  { name: "Payments", path: "/payments" },
  { name: "Reports", path: "/reports" },
  { name: "Communications", path: "/communications" },
  { name: "Settings", path: "/settings" },
];

export function TopNavigation() {
  const location = useLocation();

  return (
    <Flex 
      h="64px" 
      bg="white" 
      borderBottomWidth="1px" 
      borderColor="gray.200" 
      align="center" 
      justify="space-between"
      px={6}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center" gap={8}>
        {/* Logo */}
        <Flex align="center" gap={2}>
          <Box w={6} h={6} bg="#007D79" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
            <Text color="white" fontWeight="bold" fontSize="xs">E</Text>
          </Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800" letterSpacing="tight">EduFlow</Text>
        </Flex>

        {/* Nav Items */}
        <HStack gap={1}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <RouterLink to={item.path} key={item.name} style={{ textDecoration: "none" }}>
                <Box
                  px={3}
                  py={2}
                  borderRadius="md"
                  color={isActive ? "#007D79" : "gray.600"}
                  fontWeight={isActive ? "500" : "400"}
                  fontSize="sm"
                  _hover={{ color: "#007D79", bg: "gray.50" }}
                  position="relative"
                >
                  {item.name}
                  {isActive && (
                    <Box position="absolute" bottom="-16px" left={0} right={0} h="3px" bg="#007D79" borderTopRadius="md" />
                  )}
                </Box>
              </RouterLink>
            );
          })}
        </HStack>
      </Flex>

      {/* Right Side */}
      <Flex align="center" gap={4}>
        <Box textAlign="right">
          <Text fontSize="sm" fontWeight="bold" color="gray.800">EduFlow Staging</Text>
          <Text fontSize="xs" color="gray.500">Zakaria Chamakh</Text>
        </Box>
        <MenuRoot>
          <MenuTrigger asChild>
            <Box color="gray.500" cursor="pointer" _hover={{ color: "gray.800" }}>
              <MenuIcon size={20} />
            </Box>
          </MenuTrigger>
          <MenuContent minW="240px" boxShadow="lg" py={2} border="1px solid" borderColor="gray.100">
            <MenuItem value="account-security" asChild>
              <RouterLink to="/account-security" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px' }}>
                <Shield size={16} /> Account security
              </RouterLink>
            </MenuItem>
            <MenuItem value="help" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px' }}>
              <HelpCircle size={16} /> Help Centre
            </MenuItem>
            <MenuItem value="refer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px' }}>
              <UserPlus size={16} /> Refer a friend
            </MenuItem>
            <MenuItem value="releases" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px' }}>
              <CheckCircle size={16} /> New releases
            </MenuItem>
            <MenuItem value="coming-soon" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px' }}>
              <Calendar size={16} /> Coming soon
            </MenuItem>
            <MenuItem value="onboarding" asChild>
              <RouterLink to="/onboarding" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px' }}>
                <FileText size={16} /> Onboarding
              </RouterLink>
            </MenuItem>
            <MenuSeparator my={2} />
            <MenuItem value="logout" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '8px 16px' }}>
              <LogOut size={16} /> Log Out
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>
    </Flex>
  );
}
