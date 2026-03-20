import { Box, Flex, Text, HStack, Button, Input, Table, Badge, Avatar, VStack } from "@chakra-ui/react";
import { Search, Filter, Plus, MoreHorizontal, Trash2, Edit, MessageSquare, FileText, CheckSquare, User, Mail, Phone, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../components/ui/menu";
import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, DialogCloseTrigger } from "../components/ui/dialog";
import { DrawerRoot, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerActionTrigger, DrawerCloseTrigger } from "../components/ui/drawer";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";

const DEMO_LEARNERS = [
  { id: 1, name: "Sarah Martinez", email: "sarah.m@example.com", phone: "+212 600 123456", status: "Active", course: "English B2", labels: [{ text: "VIP", color: "purple" }, { text: "Gold Star", color: "yellow" }], avatar: "https://i.pravatar.cc/150?u=1", lastVisit: "12 Oct 2023" },
  { id: 2, name: "Omar Hassan", email: "omar.h@example.com", phone: "+212 600 654321", status: "Active", course: "English A1", labels: [{ text: "Needs Follow-up", color: "red" }], avatar: "https://i.pravatar.cc/150?u=2", lastVisit: "15 Oct 2023" },
  { id: 3, name: "Yuki Tanaka", email: "yuki.t@example.com", phone: "+212 600 111222", status: "Inactive", course: "French Beginners", labels: [{ text: "Alumni", color: "gray" }], avatar: "https://i.pravatar.cc/150?u=3", lastVisit: "01 Sep 2023" },
  { id: 4, name: "David Chen", email: "david.c@example.com", phone: "+212 600 333444", status: "Active", course: "English A1", labels: [{ text: "Scholarship", color: "green" }], avatar: "https://i.pravatar.cc/150?u=4", lastVisit: "18 Oct 2023" },
  { id: 5, name: "Maria Silva", email: "maria.s@example.com", phone: "+212 600 555666", status: "Active", course: "Spanish C1", labels: [], avatar: "https://i.pravatar.cc/150?u=5", lastVisit: "20 Oct 2023" },
];

export function LearnersList() {
  const navigate = useNavigate();
  const [learners, setLearners] = useState(DEMO_LEARNERS);
  const [learnerToDelete, setLearnerToDelete] = useState<number | null>(null);
  const [isAddLearnerOpen, setIsAddLearnerOpen] = useState(false);
  
  const [statusTab, setStatusTab] = useState("Active");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [labelFilter, setLabelFilter] = useState("All Labels");

  const handleDelete = () => {
    if (learnerToDelete !== null) {
      setLearners(learners.filter(s => s.id !== learnerToDelete));
      setLearnerToDelete(null);
    }
  };

  const filteredLearners = learners.filter(learner => {
    if (statusTab !== "All" && learner.status !== statusTab) return false;
    if (courseFilter !== "All Courses" && learner.course !== courseFilter) return false;
    if (labelFilter !== "All Labels" && !learner.labels.some(l => l.text === labelFilter)) return false;
    return true;
  });

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white" direction="column" p={10} overflowY="auto" h="calc(100vh - 64px)">
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900">Learners</Text>
        <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsAddLearnerOpen(true)}>
          <Box asChild mr={2}><Plus size={18} /></Box>
          New Learner
        </Button>
      </Flex>

      {/* Status Segmented Control */}
      <Flex bg="gray.200" p={1} borderRadius="md" display="inline-flex" mb={6} alignSelf="flex-start">
        {["Active", "Inactive", "Lead", "All"].map(tab => (
          <Box 
            key={tab} 
            px={4}
            py={1.5}
            borderRadius="sm"
            bg={statusTab === tab ? "white" : "transparent"}
            color={statusTab === tab ? "gray.900" : "gray.600"}
            fontWeight={statusTab === tab ? "600" : "500"}
            fontSize="sm"
            cursor="pointer" 
            shadow={statusTab === tab ? "sm" : "none"}
            _hover={{ color: statusTab === tab ? "gray.900" : "gray.800" }}
            onClick={() => setStatusTab(tab)}
            transition="all 0.2s"
          >
            {tab}
          </Box>
        ))}
      </Flex>

      <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
        <Flex p={4} borderBottomWidth="1px" borderColor="gray.200" justify="space-between" align="center">
          <Box position="relative" w="full" maxW="400px">
            <Box position="absolute" left={3} top={2.5} color="gray.400">
              <Search size={18} />
            </Box>
            <Input pl={10} placeholder="Search learners by name, email, or phone..." borderRadius="md" size="sm" />
          </Box>
          
          <HStack gap={3}>
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="outline" size="sm" color="gray.600">
                  {courseFilter} <Box asChild ml={2}><ChevronDown size={14} /></Box>
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="All Courses" onClick={() => setCourseFilter("All Courses")}>All Classes</MenuItem>
                <MenuItem value="English A1" onClick={() => setCourseFilter("English A1")}>English A1</MenuItem>
                <MenuItem value="English B2" onClick={() => setCourseFilter("English B2")}>English B2</MenuItem>
                <MenuItem value="French Beginners" onClick={() => setCourseFilter("French Beginners")}>French Beginners</MenuItem>
                <MenuItem value="Spanish C1" onClick={() => setCourseFilter("Spanish C1")}>Spanish C1</MenuItem>
              </MenuContent>
            </MenuRoot>

            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="outline" size="sm" color="gray.600">
                  {labelFilter} <Box asChild ml={2}><ChevronDown size={14} /></Box>
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="All Labels" onClick={() => setLabelFilter("All Labels")}>All Labels</MenuItem>
                <MenuItem value="VIP" onClick={() => setLabelFilter("VIP")}>VIP</MenuItem>
                <MenuItem value="Gold Star" onClick={() => setLabelFilter("Gold Star")}>Gold Star</MenuItem>
                <MenuItem value="Needs Follow-up" onClick={() => setLabelFilter("Needs Follow-up")}>Needs Follow-up</MenuItem>
                <MenuItem value="Scholarship" onClick={() => setLabelFilter("Scholarship")}>Scholarship</MenuItem>
                <MenuItem value="Alumni" onClick={() => setLabelFilter("Alumni")}>Alumni</MenuItem>
              </MenuContent>
            </MenuRoot>
          </HStack>
        </Flex>

        <Table.Root variant="line">
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader>Learner</Table.ColumnHeader>
              <Table.ColumnHeader>Contact</Table.ColumnHeader>
              <Table.ColumnHeader>Class</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Labels</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredLearners.map((learner) => (
              <Table.Row key={learner.id} _hover={{ bg: "gray.50" }} cursor="pointer" onClick={() => navigate(`/learners/${learner.id}`)}>
                <Table.Cell>
                  <HStack gap={3}>
                    <Avatar.Root size="sm">
                      <Avatar.Image src={learner.avatar} />
                      <Avatar.Fallback name={learner.name} />
                    </Avatar.Root>
                    <Box>
                      <Text fontWeight="600" color="gray.900">{learner.name}</Text>
                      <Text fontSize="xs" color="gray.500">Last visit: {learner.lastVisit}</Text>
                    </Box>
                  </HStack>
                </Table.Cell>
                <Table.Cell>
                  <HStack color="gray.600" fontSize="sm" mb={1}>
                    <Mail size={14} />
                    <Text>{learner.email}</Text>
                  </HStack>
                  <HStack color="gray.500" fontSize="xs">
                    <Phone size={14} />
                    <Text>{learner.phone}</Text>
                  </HStack>
                </Table.Cell>
                <Table.Cell>
                  <Text fontSize="sm" fontWeight="500">{learner.course}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={learner.status === "Active" ? "green" : learner.status === "Lead" ? "blue" : "gray"} borderRadius="full" px={2.5} py={0.5} fontSize="xs" fontWeight="600">
                    <Box as="span" w={1.5} h={1.5} borderRadius="full" bg={learner.status === "Active" ? "green.500" : learner.status === "Lead" ? "blue.500" : "gray.500"} mr={1.5} display="inline-block" />
                    {learner.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={1.5} flexWrap="wrap">
                    {learner.labels.map(label => (
                      <Badge key={label.text} variant="subtle" colorPalette={label.color} borderRadius="full" px={2} py={0.5} fontSize="xs" fontWeight="600">
                        {label.text}
                      </Badge>
                    ))}
                  </HStack>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={18} />
                      </Button>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem value="view" onClick={(e) => { e.stopPropagation(); navigate(`/learners/${learner.id}`); }}>
                        <User size={16} /> View Profile
                      </MenuItem>
                      <MenuItem value="message" onClick={(e) => e.stopPropagation()}>
                        <MessageSquare size={16} /> Send Message
                      </MenuItem>
                      <MenuItem value="task" onClick={(e) => e.stopPropagation()}>
                        <CheckSquare size={16} /> Add Task
                      </MenuItem>
                      <MenuItem value="note" onClick={(e) => e.stopPropagation()}>
                        <FileText size={16} /> Add Note
                      </MenuItem>
                      <MenuItem value="edit" onClick={(e) => { e.stopPropagation(); navigate(`/learners/${learner.id}`); }}>
                        <Edit size={16} /> Edit Details
                      </MenuItem>
                      <MenuItem value="delete" color="red.500" onClick={(e) => { e.stopPropagation(); setLearnerToDelete(learner.id); }}>
                        <Trash2 size={16} /> Delete Learner
                      </MenuItem>
                    </MenuContent>
                  </MenuRoot>
                </Table.Cell>
              </Table.Row>
            ))}
            {filteredLearners.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center" py={8} color="gray.500">
                  No learners found matching these filters.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      <DialogRoot open={learnerToDelete !== null} onOpenChange={(e) => !e.open && setLearnerToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Text>Are you sure you want to delete this learner? This action cannot be undone.</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
               <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={handleDelete}>Delete Learner</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Add New Learner Drawer */}
      <DrawerRoot open={isAddLearnerOpen} onOpenChange={(e) => setIsAddLearnerOpen(e.open)} size="md">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add New Learner</DrawerTitle>
            <DrawerCloseTrigger />
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" gap={8}>
              {/* Learner Details */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800" fontFamily="serif" mb={4}>Learner Details</Text>
                <VStack align="stretch" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">First Name</Text>
                    <Input placeholder="Enter first name" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Last Name</Text>
                    <Input placeholder="Enter last name" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Email Address</Text>
                    <Input type="email" placeholder="Enter email address" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Phone Number</Text>
                    <Input type="tel" placeholder="Enter phone number" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Date of Birth</Text>
                    <Input type="date" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Class</Text>
                    <NativeSelectRoot>
                      <NativeSelectField items={["English A1", "English B2", "French Beginners", "Spanish C1"]} placeholder="Select class" />
                    </NativeSelectRoot>
                  </Box>
                </VStack>
              </Box>

              {/* Relationship Details */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800" fontFamily="serif" mb={4}>Primary Relationship (Optional)</Text>
                <VStack align="stretch" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Relationship Type</Text>
                    <NativeSelectRoot>
                      <NativeSelectField items={["Parent", "Guardian", "Sibling (Learner)", "Other Learner", "Other"]} placeholder="Select relationship type" />
                    </NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">First Name</Text>
                    <Input placeholder="Enter first name" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Last Name</Text>
                    <Input placeholder="Enter last name" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Email Address</Text>
                    <Input type="email" placeholder="Enter email address" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Phone Number</Text>
                    <Input type="tel" placeholder="Enter phone number" />
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsAddLearnerOpen(false)}>Save Learner</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
}
