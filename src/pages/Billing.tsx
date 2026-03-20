import { Box, Flex, Text, Button, VStack, HStack, Grid } from "@chakra-ui/react";
import { CreditCard, Download } from "lucide-react";

export function Billing() {
  return (
    <Box flex="1" maxW="1400px" mx="auto" w="full" bg="white" p={10} overflowY="auto" h="calc(100vh - 64px)">
      <Text fontSize="3xl" fontWeight="bold" color="gray.800" mb={8} fontFamily="Georgia, serif">
        Billing
      </Text>

      <VStack gap={6} align="stretch">
        {/* Current Plan */}
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
            <Box flex="1" minW="250px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2} fontFamily="Georgia, serif">
                Current Plan
              </Text>
              <Text fontSize="sm" color="gray.600" maxW="300px">
                Your current subscription plan and details.
              </Text>
            </Box>
            <Box flex="1" minW="250px" pt={1}>
              <Text fontSize="sm" fontWeight="bold" color="gray.800">
                Professional Plan
              </Text>
              <Text fontSize="sm" color="gray.600">
                $49.00 / month
              </Text>
              <Text fontSize="xs" color="gray.500" mt={1}>
                Next billing date: April 18, 2026
              </Text>
            </Box>
            <Box>
              <Button variant="outline" colorScheme="teal" size="sm" borderRadius="md" px={4}>
                Change Plan
              </Button>
            </Box>
          </Flex>
        </Box>

        {/* Payment Method */}
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
            <Box flex="1" minW="250px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2} fontFamily="Georgia, serif">
                Payment Method
              </Text>
              <Text fontSize="sm" color="gray.600" maxW="300px">
                Manage your payment details.
              </Text>
            </Box>
            <Box flex="1" minW="250px" pt={1}>
              <HStack gap={3}>
                <Box p={2} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
                  <CreditCard size={20} color="gray.600" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" color="gray.800">
                    Visa ending in 4242
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Expires 12/2028
                  </Text>
                </Box>
              </HStack>
            </Box>
            <Box>
              <Button variant="outline" colorScheme="teal" size="sm" borderRadius="md" px={4}>
                Update Method
              </Button>
            </Box>
          </Flex>
        </Box>

        {/* Billing History */}
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.100">
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4} mb={4}>
            <Box flex="1" minW="250px">
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2} fontFamily="Georgia, serif">
                Billing History
              </Text>
              <Text fontSize="sm" color="gray.600" maxW="300px">
                View and download past invoices.
              </Text>
            </Box>
          </Flex>
          
          <Box border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden">
            <Grid templateColumns="1fr 1fr 1fr auto" gap={4} p={4} bg="gray.50" borderBottom="1px solid" borderColor="gray.200" fontWeight="bold" fontSize="sm" color="gray.700">
              <Text>Date</Text>
              <Text>Amount</Text>
              <Text>Status</Text>
              <Text>Invoice</Text>
            </Grid>
            
            {[
              { date: "Mar 18, 2026", amount: "$49.00", status: "Paid" },
              { date: "Feb 18, 2026", amount: "$49.00", status: "Paid" },
              { date: "Jan 18, 2026", amount: "$49.00", status: "Paid" },
            ].map((invoice, idx) => (
              <Grid key={idx} templateColumns="1fr 1fr 1fr auto" gap={4} p={4} borderBottom={idx < 2 ? "1px solid" : "none"} borderColor="gray.100" fontSize="sm" alignItems="center">
                <Text color="gray.800">{invoice.date}</Text>
                <Text color="gray.800">{invoice.amount}</Text>
                <Text color="green.600" fontWeight="500">{invoice.status}</Text>
                <Button variant="ghost" size="sm" colorScheme="teal">
                  <Download size={14} style={{ marginRight: '8px' }} /> Download
                </Button>
              </Grid>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
