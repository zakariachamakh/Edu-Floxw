import { Box, Flex, Grid, Text, VStack, HStack, Badge, Button } from "@chakra-ui/react";
import { Plus, Bell, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

export function Dashboard() {
  return (
    <Box flex="1" maxW="1400px" mx="auto" w="full" bg="white" p={10} overflowY="auto" h="calc(100vh - 64px)">
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">Good morning, Zakaria! 🌤️</Text>
          <Text color="gray.500">Here's what's happening today.</Text>
        </Box>
        <HStack gap={4}>
          <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }}>
            <Box asChild mr={2}><Plus size={18} /></Box>
            New Learner
          </Button>
        </HStack>
      </Flex>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
        {/* Left Column */}
        <VStack align="stretch" gap={8}>
          {/* Quick Stats */}
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Box p={6} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text color="gray.500" fontSize="sm" fontWeight="medium" mb={2}>Today's Lessons</Text>
              <Text fontSize="3xl" fontWeight="bold">4</Text>
            </Box>
            <Box p={6} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text color="gray.500" fontSize="sm" fontWeight="medium" mb={2}>Active Learners</Text>
              <Text fontSize="3xl" fontWeight="bold">142</Text>
            </Box>
            <Box p={6} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text color="gray.500" fontSize="sm" fontWeight="medium" mb={2}>Pending Enquiries</Text>
              <Text fontSize="3xl" fontWeight="bold">12</Text>
            </Box>
          </Grid>

          {/* Today's Schedule */}
          <Box p={6} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="bold">Today's Schedule</Text>
              <Button variant="ghost" size="sm" color="#007D79">View Calendar</Button>
            </Flex>
            <VStack align="stretch" gap={4}>
              {[
                { time: "09:00 AM", course: "English A1", room: "Room 3", learners: 5, status: "completed" },
                { time: "11:00 AM", course: "English B2", room: "Online", learners: 8, status: "upcoming" },
                { time: "02:00 PM", course: "French Beginners", room: "Room 1", learners: 12, status: "upcoming" },
              ].map((lesson, i) => (
                <Flex key={i} p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.100" align="center" justify="space-between">
                  <HStack gap={4}>
                    <Box w="60px" textAlign="center">
                      <Text fontWeight="bold" color="gray.700">{lesson.time.split(" ")[0]}</Text>
                      <Text fontSize="xs" color="gray.500">{lesson.time.split(" ")[1]}</Text>
                    </Box>
                    <Box w="4px" h="40px" bg={lesson.status === "completed" ? "green.400" : "#007D79"} borderRadius="full" />
                    <Box>
                      <Text fontWeight="bold">{lesson.course}</Text>
                      <Text fontSize="sm" color="gray.500">{lesson.room} • {lesson.learners} learners</Text>
                    </Box>
                  </HStack>
                  <Button size="sm" variant={lesson.status === "completed" ? "outline" : "solid"} bg={lesson.status === "completed" ? "transparent" : "gray.100"}>
                    {lesson.status === "completed" ? "View Notes" : "Mark Attendance"}
                  </Button>
                </Flex>
              ))}
            </VStack>
          </Box>
        </VStack>

        {/* Right Column */}
        <VStack align="stretch" gap={8}>
          {/* Tasks */}
          <Box p={6} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="bold">Tasks</Text>
              <Badge bg="red.100" color="red.700" px={2} py={1} borderRadius="full">2 Overdue</Badge>
            </Flex>
            <VStack align="stretch" gap={4}>
              {[
                { title: "Call parent of Omar re: absence", due: "Today", priority: "high" },
                { title: "Upload homework for B2 class", due: "Tomorrow", priority: "medium" },
                { title: "Review new enrollment forms", due: "Tomorrow", priority: "low" },
              ].map((task, i) => (
                <Flex key={i} align="flex-start" gap={3}>
                  <Box mt={1} color="gray.300"><CheckCircle2 size={20} /></Box>
                  <Box>
                    <Text fontWeight="medium" fontSize="sm">{task.title}</Text>
                    <Text fontSize="xs" color={task.priority === "high" ? "red.500" : "gray.500"}>Due {task.due}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
            <Button w="full" mt={6} variant="outline" size="sm">View All Tasks</Button>
          </Box>

          {/* Alerts */}
          <Box p={6} bg="teal.50" borderRadius="xl" borderWidth="1px" borderColor="teal.100">
            <HStack mb={4} color="#007D79">
              <Box asChild><Bell size={20} /></Box>
              <Text fontWeight="bold">Needs Attention</Text>
            </HStack>
            <VStack align="stretch" gap={3}>
              <Box p={3} bg="white" borderRadius="md" shadow="sm">
                <Text fontSize="sm" fontWeight="medium">2 Lesson reports overdue</Text>
                <Text fontSize="xs" color="#007D79" mt={1} cursor="pointer">Complete now →</Text>
              </Box>
              <Box p={3} bg="white" borderRadius="md" shadow="sm">
                <Text fontSize="sm" fontWeight="medium">5 Invoices overdue</Text>
                <Text fontSize="xs" color="#007D79" mt={1} cursor="pointer">Send reminders →</Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}
