import { Box, Flex, Text, Button, VStack, HStack, Grid } from "@chakra-ui/react";
import { ShieldAlert, Copy } from "lucide-react";

export function AccountSecurity() {
  return (
    <Box flex="1" maxW="1400px" mx="auto" w="full" bg="white" p={10} overflowY="auto" h="calc(100vh - 64px)">
      <Text fontSize="3xl" fontWeight="bold" color="gray.800" mb={8} fontFamily="Georgia, serif">
        Account security
      </Text>

      <VStack gap={6} align="stretch">
        {/* Email Address */}
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
            <Box flex="1" minW="250px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2} fontFamily="Georgia, serif">
                Email address
              </Text>
              <Text fontSize="sm" color="gray.600" maxW="300px">
                The email address you use to log into Semble
              </Text>
            </Box>
            <Box flex="1" minW="250px" pt={1}>
              <Text fontSize="sm" fontWeight="500" color="gray.800">
                zakariachamakh34@gmail.com
              </Text>
            </Box>
            <Box>
              <Button variant="outline" colorScheme="teal" size="sm" borderRadius="md" px={4}>
                Update email address
              </Button>
            </Box>
          </Flex>
        </Box>

        {/* Password */}
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
            <Box flex="1" minW="250px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2} fontFamily="Georgia, serif">
                Password
              </Text>
            </Box>
            <Box flex="1" minW="250px" pt={1}>
              <Text fontSize="sm" color="gray.600" maxW="400px">
                Passwords must be at least 8 characters long and contain at least one uppercase and lowercase letter, a number and a special character.
              </Text>
            </Box>
            <Box>
              <Button variant="outline" colorScheme="teal" size="sm" borderRadius="md" px={4}>
                Change password
              </Button>
            </Box>
          </Flex>
        </Box>

        {/* Two-factor authentication */}
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
            <Box flex="1" minW="250px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2} fontFamily="Georgia, serif">
                Two-factor<br />authentication
              </Text>
              <Text fontSize="sm" color="gray.600" maxW="300px">
                Make your account more secure by logging in with your email and password as well as authentication on your phone
              </Text>
            </Box>
            <Box flex="1" minW="250px" pt={1}>
              <HStack color="red.500" gap={2}>
                <ShieldAlert size={16} />
                <Text fontSize="sm">2FA disabled</Text>
              </HStack>
            </Box>
            <Box>
              <Button variant="outline" colorScheme="teal" size="sm" borderRadius="md" px={4}>
                Generate QR Code
              </Button>
            </Box>
          </Flex>
        </Box>

        {/* Customer support information */}
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
            <Box flex="1" minW="250px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2} fontFamily="Georgia, serif">
                Customer support<br />information
              </Text>
              <Text fontSize="sm" color="gray.600" maxW="300px">
                By providing this information, you'll help customer support better understand and diagnose the issue, leading to a faster and more effective resolution
              </Text>
            </Box>
            <Box flex="2" minW="350px" bg="gray.50" p={4} borderRadius="md" position="relative">
              <Grid templateColumns="120px 1fr" gap={3} fontSize="sm" color="gray.700">
                <Text>Practice ID:</Text>
                <Text>67474a2b442042e4f3907846</Text>
                
                <Text>User ID:</Text>
                <Text>67616880118da9dcbe9392ac</Text>
                
                <Text>User agent:</Text>
                <Text>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36</Text>
                
                <Text>Current version:</Text>
                <Text>9eb991add19880c9591f</Text>
                
                <Text>Latest version:</Text>
                <Text>f4cc4981e27f27847579</Text>
              </Grid>
              
              <Button 
                position="absolute" 
                top={4} 
                right={4} 
                variant="outline" 
                colorScheme="teal" 
                size="sm" 
                borderRadius="md"
              >
                <Copy size={14} style={{ marginRight: '8px' }} /> Copy
              </Button>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
}
