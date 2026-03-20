import { Box, Flex, Text, HStack, VStack, Button, Input, Grid, Badge, Avatar, Table, Textarea, IconButton } from "@chakra-ui/react";
import { Plus, Search, Mail, MessageSquare, FileText, Bell, MoreHorizontal, CheckCircle2, Clock, XCircle, Calendar, Send, Paperclip, Smile } from "lucide-react";
import { useState } from "react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../components/ui/menu";
import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, DialogCloseTrigger } from "../components/ui/dialog";
import { DrawerRoot, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerActionTrigger, DrawerCloseTrigger } from "../components/ui/drawer";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";

const MOCK_ANNOUNCEMENTS = [
  { id: 1, subject: "Spring Break Schedule Change", recipients: "All Students", channel: ["Email"], date: "Mar 15, 2026", status: "Sent", openRate: "85%" },
  { id: 2, subject: "Parent-Teacher Conference Reminder", recipients: "All Parents", channel: ["Email", "SMS"], date: "Mar 18, 2026", status: "Scheduled", openRate: "-" },
  { id: 3, subject: "New Term Registration Open", recipients: "All Students", channel: ["Email", "In-App"], date: "Mar 20, 2026", status: "Draft", openRate: "-" },
  { id: 4, subject: "School Closure Due to Weather", recipients: "All Students, All Parents", channel: ["Email", "SMS", "In-App"], date: "Feb 10, 2026", status: "Sent", openRate: "92%" },
  { id: 5, subject: "Monthly Newsletter - March", recipients: "All Parents", channel: ["Email"], date: "Mar 01, 2026", status: "Sent", openRate: "64%" },
  { id: 6, subject: "Exam Schedule Released", recipients: "All Students", channel: ["Email", "In-App"], date: "Feb 28, 2026", status: "Sent", openRate: "78%" },
  { id: 7, subject: "Staff Meeting Agenda", recipients: "All Teachers", channel: ["Email"], date: "Mar 19, 2026", status: "Scheduled", openRate: "-" },
  { id: 8, subject: "Policy Update 2026", recipients: "All Students, All Parents", channel: ["Email"], date: "Jan 15, 2026", status: "Sent", openRate: "55%" },
];

const MOCK_CONVERSATIONS = [
  { id: 1, name: "Maria Martinez", role: "Parent", avatar: "https://i.pravatar.cc/150?u=1", lastMessage: "Thanks for the update on Sarah's progress.", time: "10:30 AM", unread: true },
  { id: 2, name: "David Chen", role: "Student", avatar: "https://i.pravatar.cc/150?u=2", lastMessage: "Can I submit the assignment tomorrow?", time: "Yesterday", unread: true },
  { id: 3, name: "Emma Wilson", role: "Teacher", avatar: "https://i.pravatar.cc/150?u=3", lastMessage: "I've uploaded the new materials for next week.", time: "Yesterday", unread: false },
  { id: 4, name: "Carlos Rodriguez", role: "Parent", avatar: "https://i.pravatar.cc/150?u=4", lastMessage: "We will be out of town next week.", time: "Mar 15", unread: false },
  { id: 5, name: "Sophie Taylor", role: "Student", avatar: "https://i.pravatar.cc/150?u=5", lastMessage: "Thank you!", time: "Mar 14", unread: false },
  { id: 6, name: "James Anderson", role: "Parent", avatar: "https://i.pravatar.cc/150?u=6", lastMessage: "How do I pay the invoice?", time: "Mar 12", unread: false },
];

const MOCK_MESSAGES = [
  { id: 1, sender: "them", text: "Hi, I wanted to check on Sarah's progress in the English B2 class.", time: "10:15 AM" },
  { id: 2, sender: "me", text: "Hello Maria! Sarah is doing wonderfully. She's very active in class discussions.", time: "10:20 AM" },
  { id: 3, sender: "them", text: "That's great to hear. Is there any specific area she needs to work on?", time: "10:22 AM" },
  { id: 4, sender: "me", text: "Her vocabulary is excellent, but she could practice her writing a bit more. I've attached some extra worksheets she can do at home.", time: "10:25 AM", attachment: { name: "Writing_Practice_B2.pdf", size: "1.2 MB" } },
  { id: 5, sender: "them", text: "Thanks for the update on Sarah's progress. I'll make sure she works on those.", time: "10:30 AM" },
];

function AnnouncementsTab() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [scheduleLater, setScheduleLater] = useState(false);

  return (
    <Box flex="1" p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" fontFamily="Georgia, serif">Announcements</Text>
        <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsComposeOpen(true)}>
          <Box asChild mr={2}><Plus size={18} /></Box>
          New Announcement
        </Button>
      </Flex>

      <Box p={6} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
        <Table.Root variant="line">
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader>Subject</Table.ColumnHeader>
              <Table.ColumnHeader>Recipients</Table.ColumnHeader>
              <Table.ColumnHeader>Channel</Table.ColumnHeader>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Open Rate</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {MOCK_ANNOUNCEMENTS.map((announcement) => (
              <Table.Row key={announcement.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell fontWeight="medium">{announcement.subject}</Table.Cell>
                <Table.Cell color="gray.600">{announcement.recipients}</Table.Cell>
                <Table.Cell>
                  <HStack gap={1}>
                    {announcement.channel.includes("Email") && <Mail size={14} color="#4A5568" />}
                    {announcement.channel.includes("SMS") && <MessageSquare size={14} color="#4A5568" />}
                    {announcement.channel.includes("In-App") && <Bell size={14} color="#4A5568" />}
                  </HStack>
                </Table.Cell>
                <Table.Cell color="gray.600">{announcement.date}</Table.Cell>
                <Table.Cell>
                  <Badge 
                    colorPalette={announcement.status === "Sent" ? "green" : announcement.status === "Scheduled" ? "blue" : "gray"} 
                    variant="subtle"
                  >
                    {announcement.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell color="gray.600">{announcement.openRate}</Table.Cell>
                <Table.Cell textAlign="right">
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <IconButton variant="ghost" size="sm" aria-label="Actions">
                        <MoreHorizontal size={16} />
                      </IconButton>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem value="view">View</MenuItem>
                      <MenuItem value="edit">Edit</MenuItem>
                      <MenuItem value="duplicate">Duplicate</MenuItem>
                      <MenuItem value="delete" color="red.500">Delete</MenuItem>
                    </MenuContent>
                  </MenuRoot>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Compose Drawer */}
      <DrawerRoot open={isComposeOpen} onOpenChange={(e) => setIsComposeOpen(e.open)} size="lg">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>New Announcement</DrawerTitle>
            <DrawerCloseTrigger />
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" gap={6}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Subject</Text>
                <Input placeholder="Enter announcement subject..." size="sm" />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>Recipients</Text>
                <HStack gap={2} mb={3}>
                  <Button size="sm" variant="outline">All Students</Button>
                  <Button size="sm" variant="outline">All Teachers</Button>
                  <Button size="sm" variant="outline">All Parents</Button>
                </HStack>
                <Text fontSize="sm" color="gray.500" mb={1}>Or select specific:</Text>
                <NativeSelectRoot size="sm">
                  <NativeSelectField placeholder="Select Class/Course..." />
                </NativeSelectRoot>
                <Text fontSize="xs" color="gray.500" mt={2}>Sending to: 0 recipients</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>Channel</Text>
                <HStack gap={4}>
                  <Checkbox defaultChecked>Email</Checkbox>
                  <Checkbox>SMS</Checkbox>
                  <Checkbox>In-App Notification</Checkbox>
                </HStack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Message</Text>
                <Textarea minH="200px" placeholder="Write your announcement..." />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Attachments</Text>
                <Flex 
                  borderWidth="2px" 
                  borderStyle="dashed" 
                  borderColor="gray.200" 
                  borderRadius="md" 
                  p={6} 
                  align="center" 
                  justify="center"
                  bg="gray.50"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  <VStack gap={1}>
                    <Paperclip size={20} color="#718096" />
                    <Text fontSize="sm" color="gray.500">Drop files here or click to upload</Text>
                    <Text fontSize="xs" color="gray.400">Max: 10MB per file, 25MB total</Text>
                  </VStack>
                </Flex>
              </Box>

              <Box>
                <Flex align="center" justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">Schedule for later</Text>
                  <Switch checked={scheduleLater} onCheckedChange={(e) => setScheduleLater(e.checked)} />
                </Flex>
                {scheduleLater && (
                  <HStack gap={4}>
                    <Input type="date" size="sm" />
                    <Input type="time" size="sm" />
                  </HStack>
                )}
              </Box>

              <Box>
                <Checkbox>Send confirmation email to me</Checkbox>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button variant="outline">Save as Draft</Button>
            <Button 
              bg="#007D79" 
              color="white" 
              _hover={{ bg: "#00635f" }}
              onClick={() => {
                setIsComposeOpen(false);
                setIsPreviewOpen(true);
              }}
            >
              {scheduleLater ? "Schedule" : "Send Now"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>

      {/* Preview Dialog */}
      <DialogRoot open={isPreviewOpen} onOpenChange={(e) => setIsPreviewOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Announcement</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Box p={4} bg="gray.50" borderRadius="md">
                <Text fontSize="sm" fontWeight="bold">Recipients: <Text as="span" fontWeight="normal">45 users</Text></Text>
                <Text fontSize="sm" fontWeight="bold">Channels: <Text as="span" fontWeight="normal">Email</Text></Text>
              </Box>
              <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={6}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>Subject goes here</Text>
                <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
                  Message body preview will appear here.
                </Text>
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsPreviewOpen(false);
              setIsComposeOpen(true);
            }}>Back to Edit</Button>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsPreviewOpen(false)}>
              Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}

function MessagesTab() {
  const [activeConversation, setActiveConversation] = useState(MOCK_CONVERSATIONS[0]);

  return (
    <Flex flex="1" h="full" overflow="hidden">
      {/* Left Column - Conversation List */}
      <Box w="280px" borderRightWidth="1px" borderColor="gray.200" bg="white" display="flex" flexDirection="column">
        <Box p={4} borderBottomWidth="1px" borderColor="gray.200">
          <Box position="relative">
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400">
              <Search size={16} />
            </Box>
            <Input pl={9} placeholder="Search messages..." size="sm" borderRadius="full" bg="gray.50" />
          </Box>
          <HStack mt={4} gap={4}>
            <Text fontSize="sm" fontWeight="bold" color="#007D79" borderBottomWidth="2px" borderColor="#007D79" pb={1}>All</Text>
            <Text fontSize="sm" color="gray.500" cursor="pointer" pb={1}>Unread</Text>
            <Text fontSize="sm" color="gray.500" cursor="pointer" pb={1}>Archived</Text>
          </HStack>
        </Box>
        <Box flex="1" overflowY="auto">
          {MOCK_CONVERSATIONS.map((conv) => (
            <Flex 
              key={conv.id} 
              p={4} 
              borderBottomWidth="1px" 
              borderColor="gray.100" 
              cursor="pointer"
              bg={activeConversation.id === conv.id ? "gray.50" : conv.unread ? "blue.50" : "white"}
              _hover={{ bg: "gray.50" }}
              onClick={() => setActiveConversation(conv)}
              align="center"
              gap={3}
            >
              <Box position="relative">
                <Avatar.Root size="md">
                  <Avatar.Image src={conv.avatar} />
                  <Avatar.Fallback name={conv.name} />
                </Avatar.Root>
                {conv.unread && (
                  <Box position="absolute" top={0} right={0} w={3} h={3} bg="blue.500" borderRadius="full" border="2px solid white" />
                )}
              </Box>
              <Box flex="1" overflow="hidden">
                <Flex justify="space-between" align="center" mb={1}>
                  <Text fontSize="sm" fontWeight={conv.unread ? "bold" : "medium"} color="gray.900" truncate>{conv.name}</Text>
                  <Text fontSize="xs" color={conv.unread ? "blue.500" : "gray.500"}>{conv.time}</Text>
                </Flex>
                <Text fontSize="xs" color={conv.unread ? "gray.800" : "gray.500"} truncate>{conv.lastMessage}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
        <Box p={4} borderTopWidth="1px" borderColor="gray.200">
          <Button w="full" bg="#007D79" color="white" _hover={{ bg: "#00635f" }}>
            <Box asChild mr={2}><Plus size={16} /></Box>
            New Message
          </Button>
        </Box>
      </Box>

      {/* Center Column - Message Thread */}
      <Flex flex="1" direction="column" bg="gray.50">
        <Flex p={4} bg="white" borderBottomWidth="1px" borderColor="gray.200" align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Avatar.Root size="sm">
              <Avatar.Image src={activeConversation.avatar} />
              <Avatar.Fallback name={activeConversation.name} />
            </Avatar.Root>
            <Box>
              <Text fontSize="sm" fontWeight="bold">{activeConversation.name}</Text>
              <Flex align="center" gap={1}>
                <Box w={2} h={2} bg="green.500" borderRadius="full" />
                <Text fontSize="xs" color="gray.500">Online</Text>
              </Flex>
            </Box>
          </Flex>
          <HStack gap={2}>
            <IconButton variant="ghost" size="sm" aria-label="Call"><Box asChild><MessageSquare size={16} /></Box></IconButton>
            <IconButton variant="ghost" size="sm" aria-label="More"><Box asChild><MoreHorizontal size={16} /></Box></IconButton>
          </HStack>
        </Flex>

        <Box flex="1" overflowY="auto" p={6}>
          <Flex justify="center" mb={6}>
            <Badge variant="subtle" colorPalette="gray" fontSize="xs">Today</Badge>
          </Flex>
          <VStack align="stretch" gap={4}>
            {MOCK_MESSAGES.map((msg) => (
              <Flex key={msg.id} justify={msg.sender === "me" ? "flex-end" : "flex-start"}>
                <Box maxW="70%">
                  <Box 
                    bg={msg.sender === "me" ? "#E6F4F1" : "white"} 
                    color="gray.800" 
                    p={3} 
                    borderRadius="lg" 
                    borderTopRightRadius={msg.sender === "me" ? "sm" : "lg"}
                    borderTopLeftRadius={msg.sender === "them" ? "sm" : "lg"}
                    boxShadow="sm"
                  >
                    <Text fontSize="sm">{msg.text}</Text>
                    {msg.attachment && (
                      <Flex mt={2} p={2} bg="white" borderRadius="md" borderWidth="1px" borderColor="gray.200" align="center" gap={2}>
                        <FileText size={16} color="#007D79" />
                        <Box>
                          <Text fontSize="xs" fontWeight="medium">{msg.attachment.name}</Text>
                          <Text fontSize="10px" color="gray.500">{msg.attachment.size}</Text>
                        </Box>
                      </Flex>
                    )}
                  </Box>
                  <Text fontSize="xs" color="gray.500" mt={1} textAlign={msg.sender === "me" ? "right" : "left"}>
                    {msg.time}
                  </Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>

        <Box p={4} bg="white" borderTopWidth="1px" borderColor="gray.200">
          <Flex gap={2} align="flex-end">
            <Box flex="1" position="relative">
              <Textarea 
                placeholder="Type a message..." 
                minH="40px" 
                maxH="120px" 
                resize="none" 
                borderRadius="md" 
                pb={8}
              />
              <HStack position="absolute" bottom={2} left={2} gap={1}>
                <IconButton variant="ghost" size="xs" aria-label="Attach file"><Box asChild><Paperclip size={14} /></Box></IconButton>
                <IconButton variant="ghost" size="xs" aria-label="Emoji"><Box asChild><Smile size={14} /></Box></IconButton>
              </HStack>
            </Box>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} h="auto" py={3}>
              <Box asChild><Send size={16} /></Box>
            </Button>
          </Flex>
          <Text fontSize="xs" color="gray.400" mt={1} textAlign="right">Press Enter to send</Text>
        </Box>
      </Flex>

      {/* Right Column - Contact Info */}
      <Box w="260px" borderLeftWidth="1px" borderColor="gray.200" bg="white" p={6} overflowY="auto">
        <VStack gap={4} align="center" mb={6}>
          <Avatar.Root size="2xl">
            <Avatar.Image src={activeConversation.avatar} />
            <Avatar.Fallback name={activeConversation.name} />
          </Avatar.Root>
          <Box textAlign="center">
            <Text fontSize="lg" fontWeight="bold">{activeConversation.name}</Text>
            <Text fontSize="sm" color="gray.500">{activeConversation.role}</Text>
          </Box>
        </VStack>

        <VStack align="stretch" gap={4}>
          <Box>
            <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={2}>Contact Info</Text>
            <Text fontSize="sm" color="gray.800" mb={1}>maria.m@example.com</Text>
            <Text fontSize="sm" color="gray.800">+44 7700 900077</Text>
          </Box>
          
          {activeConversation.role === "Parent" && (
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={2}>Linked Student</Text>
              <Text fontSize="sm" color="#007D79" cursor="pointer" _hover={{ textDecoration: "underline" }}>Sarah Martinez</Text>
            </Box>
          )}

          <Box>
            <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={2}>Shared Files</Text>
            <Flex align="center" gap={2} p={2} bg="gray.50" borderRadius="md" cursor="pointer" _hover={{ bg: "gray.100" }}>
              <FileText size={16} color="gray.500" />
              <Text fontSize="sm" truncate>Writing_Practice_B2.pdf</Text>
            </Flex>
          </Box>

          <Button variant="outline" w="full" mt={4}>View Profile</Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export function Communications() {
  const [activeTab, setActiveTab] = useState("announcements");

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white" direction="row" overflow="hidden" h="calc(100vh - 64px)">
      {/* Sidebar */}
      <Box w="280px" borderRightWidth="1px" borderColor="gray.200" bg="gray.50" p={6} overflowY="auto">
        <Text fontSize="xl" fontWeight="bold" fontFamily="Georgia, serif" mb={6}>Communications</Text>
        
        <VStack align="stretch" gap={1}>
          <Flex 
            align="center" 
            justify="space-between" 
            p={3} 
            borderRadius="md" 
            cursor="pointer"
            bg={activeTab === "announcements" ? "#E6F4F1" : "transparent"}
            color={activeTab === "announcements" ? "#007D79" : "gray.700"}
            borderLeftWidth={activeTab === "announcements" ? "3px" : "0px"}
            borderColor="#007D79"
            _hover={{ bg: activeTab === "announcements" ? "#E6F4F1" : "gray.100" }}
            onClick={() => setActiveTab("announcements")}
          >
            <HStack gap={3}>
              <Mail size={18} />
              <Text fontSize="sm" fontWeight={activeTab === "announcements" ? "bold" : "medium"}>Announcements</Text>
            </HStack>
            <Badge bg="gray.200" color="gray.700" borderRadius="full">12</Badge>
          </Flex>

          <Flex 
            align="center" 
            justify="space-between" 
            p={3} 
            borderRadius="md" 
            cursor="pointer"
            bg={activeTab === "messages" ? "#E6F4F1" : "transparent"}
            color={activeTab === "messages" ? "#007D79" : "gray.700"}
            borderLeftWidth={activeTab === "messages" ? "3px" : "0px"}
            borderColor="#007D79"
            _hover={{ bg: activeTab === "messages" ? "#E6F4F1" : "gray.100" }}
            onClick={() => setActiveTab("messages")}
          >
            <HStack gap={3}>
              <MessageSquare size={18} />
              <Text fontSize="sm" fontWeight={activeTab === "messages" ? "bold" : "medium"}>Messages</Text>
            </HStack>
            <Badge bg="red.500" color="white" borderRadius="full">2</Badge>
          </Flex>

          <Flex 
            align="center" 
            p={3} 
            borderRadius="md" 
            cursor="pointer"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
          >
            <HStack gap={3}>
              <FileText size={18} />
              <Text fontSize="sm" fontWeight="medium">Email Templates</Text>
            </HStack>
          </Flex>

          <Flex 
            align="center" 
            p={3} 
            borderRadius="md" 
            cursor="pointer"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
          >
            <HStack gap={3}>
              <Bell size={18} />
              <Text fontSize="sm" fontWeight="medium">Notification Rules</Text>
            </HStack>
          </Flex>
        </VStack>
      </Box>

      {/* Main Content */}
      {activeTab === "announcements" && <AnnouncementsTab />}
      {activeTab === "messages" && <MessagesTab />}
    </Flex>
  );
}
