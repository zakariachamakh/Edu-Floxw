import { useState } from "react";
import { Box, Flex, Text, HStack, VStack, Button, IconButton, Grid, Input, Textarea, Badge, Avatar, Table } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Filter, Plus, X, Users, MapPin, Clock, UserCheck, MessageSquare, AlertCircle, Check, Calendar as CalendarIcon, Search, CreditCard, CheckCircle2, XCircle, MoreHorizontal, Edit2, Trash2, Star } from "lucide-react";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../components/ui/menu";
import { DrawerRoot, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerActionTrigger, DrawerCloseTrigger } from "../components/ui/drawer";
import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, DialogCloseTrigger } from "../components/ui/dialog";

// Mock Data
const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM
const days = ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20", "Sat 21", "Sun 22"];

const initialEvents = [
  { id: 1, title: "English B2", time: "09:00 - 11:00", teacher: "Sarah Jenkins", room: "Room 101", color: "blue", enrolled: 12, capacity: 15, dayIndex: 1, top: "60px", height: "116px", type: "Group Class" },
  { id: 2, title: "Math 101", time: "11:00 - 12:00", teacher: "Michael Chen", room: "Online", color: "purple", enrolled: 8, capacity: 20, dayIndex: 2, top: "180px", height: "56px", type: "Lecture" },
  { id: 3, title: "Science Lab", time: "13:00 - 14:30", teacher: "Emma Watson", room: "Lab A", color: "green", enrolled: 15, capacity: 15, dayIndex: 4, top: "300px", height: "86px", type: "Practical" },
  { id: 4, title: "French A1", time: "10:00 - 11:30", teacher: "Sarah Jenkins", room: "Room 102", color: "orange", enrolled: 5, capacity: 10, dayIndex: 0, top: "120px", height: "86px", type: "Group Class" },
  { id: 5, title: "Physics", time: "14:00 - 16:00", teacher: "Michael Chen", room: "Lab B", color: "teal", enrolled: 18, capacity: 20, dayIndex: 1, top: "360px", height: "116px", type: "Practical" },
  { id: 6, title: "Piano Lesson", time: "15:00 - 16:00", teacher: "Emma Watson", room: "Music Room", color: "pink", enrolled: 1, capacity: 1, dayIndex: 3, top: "420px", height: "56px", type: "Private Lesson" },
  { id: 7, title: "English C1", time: "08:00 - 10:00", teacher: "Sarah Jenkins", room: "Room 101", color: "blue", enrolled: 10, capacity: 15, dayIndex: 5, top: "0px", height: "116px", type: "Group Class" },
  { id: 8, title: "Chemistry", time: "11:00 - 13:00", teacher: "Michael Chen", room: "Lab A", color: "green", enrolled: 12, capacity: 15, dayIndex: 6, top: "180px", height: "116px", type: "Practical" },
];

const mockLearners = [
  { id: 1, name: "Sarah Martinez", avatar: "https://i.pravatar.cc/150?u=1", status: "none" },
  { id: 2, name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?u=2", status: "none" },
  { id: 3, name: "Emily Davis", avatar: "https://i.pravatar.cc/150?u=3", status: "none" },
  { id: 4, name: "Michael Brown", avatar: "https://i.pravatar.cc/150?u=4", status: "none" },
  { id: 5, name: "Jessica Wilson", avatar: "https://i.pravatar.cc/150?u=5", status: "none" },
  { id: 6, name: "David Taylor", avatar: "https://i.pravatar.cc/150?u=6", status: "none" },
];

const initialHolidays = [
  { id: 1, name: "Spring Break", date: "2026-03-25", recurring: true },
  { id: 2, name: "Staff Training Day", date: "2026-04-02", recurring: false },
  { id: 3, name: "Public Holiday", date: "2026-03-18", recurring: true }, // Wednesday this week
];

export function Schedule() {
  const [view, setView] = useState("week"); // day, week, month
  const [events, setEvents] = useState(initialEvents);
  const [holidays, setHolidays] = useState(initialHolidays);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHolidayDrawerOpen, setIsHolidayDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof initialEvents[0] | null>(null);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [attendanceState, setAttendanceState] = useState(mockLearners);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [contextMenuEvent, setContextMenuEvent] = useState<typeof initialEvents[0] | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // New Booking State
  const [newBooking, setNewBooking] = useState({
    title: "",
    type: "group",
    teacher: "sarah",
    room: "101",
    startTime: "09:00",
    endTime: "10:00",
    dayIndex: 1
  });

  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    recurring: false
  });

  const handleCreateBooking = () => {
    const startHour = parseInt(newBooking.startTime.split(":")[0]);
    const startMin = parseInt(newBooking.startTime.split(":")[1]);
    const endHour = parseInt(newBooking.endTime.split(":")[0]);
    const endMin = parseInt(newBooking.endTime.split(":")[1]);
    
    const topPx = ((startHour - 8) * 60) + startMin;
    const heightPx = ((endHour - startHour) * 60) + (endMin - startMin);

    const newEvent = {
      id: Date.now(),
      title: newBooking.title || "New Booking",
      time: `${newBooking.startTime} - ${newBooking.endTime}`,
      teacher: newBooking.teacher === "sarah" ? "Sarah Jenkins" : newBooking.teacher === "michael" ? "Michael Chen" : "Emma Watson",
      room: newBooking.room === "101" ? "Room 101" : newBooking.room === "102" ? "Room 102" : "Online",
      color: "teal",
      enrolled: 0,
      capacity: 20,
      dayIndex: newBooking.dayIndex,
      top: `${topPx}px`,
      height: `${heightPx - 4}px`,
      type: newBooking.type === "group" ? "Group Class" : newBooking.type === "private" ? "Private Lesson" : "Consultation"
    };

    setEvents([...events, newEvent]);
    setIsDrawerOpen(false);
  };

  const handleAddHoliday = () => {
    if (!newHoliday.name || !newHoliday.date) return;
    setHolidays([...holidays, { id: Date.now(), ...newHoliday }]);
    setNewHoliday({ name: "", date: "", recurring: false });
  };

  const handleAttendanceToggle = (learnerId: number, status: string) => {
    setAttendanceState(prev => prev.map(s => s.id === learnerId ? { ...s, status } : s));
  };

  const markAllPresent = () => {
    setAttendanceState(prev => prev.map(s => ({ ...s, status: "present" })));
  };

  const calculateHours = () => {
    const presentCount = attendanceState.filter(s => s.status === "present" || s.status === "late").length;
    return presentCount * 1.5; // Assuming 1.5 hours per lesson
  };

  const calculateAttendanceRate = () => {
    const validStudents = attendanceState.filter(s => s.status !== "excused");
    if (validStudents.length === 0) return 0;
    const presentCount = validStudents.filter(s => s.status === "present" || s.status === "late").length;
    return Math.round((presentCount / validStudents.length) * 100);
  };

  const attendanceRate = calculateAttendanceRate();
  const rateColor = attendanceRate > 85 ? "green.500" : attendanceRate >= 70 ? "orange.500" : "red.500";

  const handleContextMenu = (e: React.MouseEvent, event: any) => {
    e.preventDefault();
    setContextMenuEvent(event);
  };

  const isHoliday = (dayIndex: number) => {
    // Mock logic: Wednesday (index 2) is a holiday
    return dayIndex === 2;
  };

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white" h="calc(100vh - 64px)" overflow="hidden" position="relative">
      {/* Schedule Sidebar */}
      <Box w="280px" borderRightWidth="1px" borderColor="gray.200" bg="#F7FAFC" display="flex" flexDirection="column" flexShrink={0}>
        <Box p={4} borderBottomWidth="1px" borderColor="gray.200">
          <Button w="full" bg="#007D79" color="white" _hover={{ bg: "#006666" }} onClick={() => setIsDrawerOpen(true)}>
            <Box asChild mr={2}><Plus size={16} /></Box>
            New Booking
          </Button>
        </Box>
        
        {/* Mini Calendar Placeholder */}
        <Box p={4} borderBottomWidth="1px" borderColor="gray.200" bg="white">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontWeight="bold" fontSize="sm" color="gray.800">March 2026</Text>
            <HStack gap={1}>
              <IconButton aria-label="Prev" variant="ghost" size="xs"><ChevronLeft size={16} /></IconButton>
              <IconButton aria-label="Next" variant="ghost" size="xs"><ChevronRight size={16} /></IconButton>
            </HStack>
          </Flex>
          <Grid templateColumns="repeat(7, 1fr)" gap={1} textAlign="center" fontSize="xs" color="gray.500" mb={2}>
            <Text>Mo</Text><Text>Tu</Text><Text>We</Text><Text>Th</Text><Text>Fr</Text><Text>Sa</Text><Text>Su</Text>
          </Grid>
          <Grid templateColumns="repeat(7, 1fr)" gap={1} textAlign="center" fontSize="sm">
            {Array.from({ length: 31 }, (_, i) => (
              <Box 
                key={i} p={1} borderRadius="full" 
                bg={i === 17 ? "#007D79" : "transparent"} 
                color={i === 17 ? "white" : "gray.700"}
                cursor="pointer" _hover={{ bg: i === 17 ? "#007D79" : "gray.100" }}
              >
                {i + 1}
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Filters */}
        <Box p={4} flex="1" overflowY="auto">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontWeight="bold" fontSize="sm" color="gray.700">Filters</Text>
            <Box asChild color="gray.400"><Filter size={14} /></Box>
          </Flex>
          
          <VStack align="stretch" gap={6}>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3} textTransform="uppercase" letterSpacing="wider">Teachers</Text>
              <VStack align="stretch" gap={3}>
                <Flex align="center" gap={3} cursor="pointer">
                  <Box w={3} h={3} borderRadius="sm" bg="blue.400" />
                  <Text fontSize="sm" color="gray.700">Sarah Jenkins</Text>
                </Flex>
                <Flex align="center" gap={3} cursor="pointer">
                  <Box w={3} h={3} borderRadius="sm" bg="purple.400" />
                  <Text fontSize="sm" color="gray.700">Michael Chen</Text>
                </Flex>
                <Flex align="center" gap={3} cursor="pointer">
                  <Box w={3} h={3} borderRadius="sm" bg="green.400" />
                  <Text fontSize="sm" color="gray.700">Emma Watson</Text>
                </Flex>
              </VStack>
            </Box>
            
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3} textTransform="uppercase" letterSpacing="wider">Locations</Text>
              <VStack align="stretch" gap={3}>
                <Flex align="center" gap={3}>
                  <input type="checkbox" defaultChecked />
                  <Text fontSize="sm" color="gray.700">Main Campus</Text>
                </Flex>
                <Flex align="center" gap={3}>
                  <input type="checkbox" defaultChecked />
                  <Text fontSize="sm" color="gray.700">Online</Text>
                </Flex>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Box>

      {/* Main Calendar Area */}
      <Box flex="1" display="flex" flexDirection="column" bg="white" overflow="hidden">
        {/* Calendar Header */}
        <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px" borderColor="gray.200">
          <HStack gap={4}>
            <Button variant="outline" size="sm" borderColor="gray.300" color="gray.700">Today</Button>
            <HStack gap={1}>
              <IconButton aria-label="Prev" variant="ghost" size="sm" color="gray.600"><ChevronLeft size={18} /></IconButton>
              <IconButton aria-label="Next" variant="ghost" size="sm" color="gray.600"><ChevronRight size={18} /></IconButton>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              {view === "day" ? "Monday, March 16, 2026" : view === "month" ? "March 2026" : "16 - 22 March 2026"}
            </Text>
          </HStack>
          
          <HStack gap={4}>
            <Button variant="outline" size="sm" onClick={() => setIsHolidayDrawerOpen(true)}>
              <Box asChild mr={2}><CalendarIcon size={16} /></Box>
              Manage Holidays
            </Button>
            <HStack gap={2} bg="gray.100" p={1} borderRadius="md">
              <Button 
                variant={view === "day" ? "solid" : "ghost"} 
                bg={view === "day" ? "#007D79" : "transparent"} 
                color={view === "day" ? "white" : "gray.600"} 
                size="sm" h="8" px={4} 
                onClick={() => setView("day")}
              >Day</Button>
              <Button 
                variant={view === "week" ? "solid" : "ghost"} 
                bg={view === "week" ? "#007D79" : "transparent"} 
                color={view === "week" ? "white" : "gray.600"} 
                size="sm" h="8" px={4} 
                onClick={() => setView("week")}
              >Week</Button>
              <Button 
                variant={view === "month" ? "solid" : "ghost"} 
                bg={view === "month" ? "#007D79" : "transparent"} 
                color={view === "month" ? "white" : "gray.600"} 
                size="sm" h="8" px={4} 
                onClick={() => setView("month")}
              >Month</Button>
            </HStack>
          </HStack>
        </Flex>

        {/* Calendar Grid */}
        <Box flex="1" overflowY="auto" position="relative">
          {view === "week" && (
            <Flex minW="800px">
              {/* Time Column */}
              <Box w="60px" flexShrink={0} borderRightWidth="1px" borderColor="gray.200" bg="white" zIndex={2} position="sticky" left={0}>
                <Box h="50px" borderBottomWidth="1px" borderColor="gray.200" />
                {timeSlots.map(time => (
                  <Box key={time} h="60px" borderBottomWidth="1px" borderColor="gray.100" position="relative">
                    <Text position="absolute" top="-10px" right="8px" fontSize="xs" color="gray.400" fontWeight="medium">
                      {time}:00
                    </Text>
                  </Box>
                ))}
              </Box>

              {/* Days Columns */}
              <Flex flex="1">
                {days.map((day, dayIndex) => (
                  <Box key={day} flex="1" borderRightWidth="1px" borderColor="gray.200" minW="120px" bg={isHoliday(dayIndex) ? "repeating-linear-gradient(45deg, #f7fafc, #f7fafc 10px, #edf2f7 10px, #edf2f7 20px)" : "white"}>
                    {/* Day Header */}
                    <Box h="50px" borderBottomWidth="1px" borderColor="gray.200" p={2} textAlign="center" bg={dayIndex === 2 ? "#E6F2F2" : "white"} position="sticky" top={0} zIndex={1}>
                      <Text fontSize="xs" fontWeight={dayIndex === 2 ? "bold" : "medium"} color={dayIndex === 2 ? "#007D79" : "gray.500"} textTransform="uppercase" letterSpacing="wider">
                        {day.split(' ')[0]}
                      </Text>
                      <Text fontSize="xl" fontWeight={dayIndex === 2 ? "bold" : "normal"} color={dayIndex === 2 ? "#007D79" : "gray.800"}>
                        {day.split(' ')[1]}
                      </Text>
                    </Box>
                    
                    {/* Time Slots */}
                    <Box position="relative">
                      {isHoliday(dayIndex) && (
                        <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0} display="flex" alignItems="center" justifyContent="center">
                          <Text color="gray.400" fontWeight="bold" fontSize="xl" transform="rotate(-90deg)" opacity={0.5}>Public Holiday</Text>
                        </Box>
                      )}
                      {timeSlots.map(time => (
                        <Box key={time} h="60px" borderBottomWidth="1px" borderColor="gray.100" _hover={{ bg: "gray.50" }} cursor="pointer" onClick={() => setIsDrawerOpen(true)} />
                      ))}
                      
                      {/* Render Events */}
                      {events.filter(e => e.dayIndex === dayIndex).map(event => (
                        <Box 
                          key={event.id}
                          position="absolute" top={event.top} left="4px" right="4px" height={event.height} 
                          bg={`${event.color}.50`} borderLeftWidth="4px" borderColor={`${event.color}.400`} 
                          borderRadius="md" p={2} shadow="sm" cursor="pointer" 
                          _hover={{ shadow: "md", transform: "translateY(-1px)" }} transition="all 0.2s"
                          onClick={() => setSelectedEvent(event)}
                          onContextMenu={(e) => handleContextMenu(e, event)}
                          zIndex={1}
                        >
                          <Text fontSize="xs" fontWeight="bold" color={`${event.color}.800`} lineClamp={1}>{event.title}</Text>
                          <Text fontSize="xs" color={`${event.color}.600`}>{event.time}</Text>
                          {parseInt(event.height) > 60 && (
                            <Text fontSize="xs" color={`${event.color}.600`} mt={1} lineClamp={1}>{event.teacher}</Text>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Flex>
          )}

          {view === "day" && (
            <Flex minW="800px">
              {/* Time Column */}
              <Box w="60px" flexShrink={0} borderRightWidth="1px" borderColor="gray.200" bg="white" zIndex={2} position="sticky" left={0}>
                {timeSlots.map(time => (
                  <Box key={time} h="100px" borderBottomWidth="1px" borderColor="gray.100" position="relative">
                    <Text position="absolute" top="-10px" right="8px" fontSize="xs" color="gray.400" fontWeight="medium">
                      {time}:00
                    </Text>
                  </Box>
                ))}
              </Box>

              {/* Single Day Column */}
              <Box flex="1" position="relative">
                {timeSlots.map(time => (
                  <Box key={time} h="100px" borderBottomWidth="1px" borderColor="gray.100" _hover={{ bg: "gray.50" }} cursor="pointer" onClick={() => setIsDrawerOpen(true)} />
                ))}
                
                {/* Render Events for Day 1 (Tuesday) */}
                {events.filter(e => e.dayIndex === 1).map(event => {
                  const topNum = parseInt(event.top) * (100/60); // scale top
                  const heightNum = parseInt(event.height) * (100/60); // scale height
                  return (
                    <Box 
                      key={event.id}
                      position="absolute" top={`${topNum}px`} left="16px" right="16px" height={`${heightNum}px`} 
                      bg={`${event.color}.50`} borderLeftWidth="4px" borderColor={`${event.color}.400`} 
                      borderRadius="md" p={4} shadow="sm" cursor="pointer" 
                      _hover={{ shadow: "md", transform: "translateY(-1px)" }} transition="all 0.2s"
                      onClick={() => setSelectedEvent(event)}
                      onContextMenu={(e) => handleContextMenu(e, event)}
                    >
                      <Flex justify="space-between">
                        <Box>
                          <Text fontSize="md" fontWeight="bold" color={`${event.color}.800`}>{event.title}</Text>
                          <Text fontSize="sm" color={`${event.color}.600`}>{event.time}</Text>
                        </Box>
                        <Box textAlign="right">
                          <Text fontSize="sm" color={`${event.color}.800`} fontWeight="medium">{event.teacher}</Text>
                          <Text fontSize="sm" color={`${event.color}.600`}>{event.room}</Text>
                        </Box>
                      </Flex>
                    </Box>
                  );
                })}
              </Box>
            </Flex>
          )}

          {view === "month" && (
            <Flex direction="column" h="full">
              <Grid templateColumns="repeat(7, 1fr)" borderBottomWidth="1px" borderColor="gray.200" bg="gray.50">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <Box key={day} p={2} textAlign="center">
                    <Text fontSize="sm" fontWeight="bold" color="gray.600" textTransform="uppercase">{day}</Text>
                  </Box>
                ))}
              </Grid>
              <Grid templateColumns="repeat(7, 1fr)" templateRows="repeat(5, 1fr)" flex="1">
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 1; // start from 1st on Tuesday
                  const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                  const isToday = dayNum === 18;
                  const isHol = dayNum === 18 || dayNum === 25;
                  
                  return (
                    <Box 
                      key={i} 
                      borderRightWidth="1px" 
                      borderBottomWidth="1px" 
                      borderColor="gray.200" 
                      p={2}
                      bg={isHol ? "gray.50" : "white"}
                      cursor={isCurrentMonth ? "pointer" : "default"}
                      _hover={isCurrentMonth ? { bg: "gray.50" } : {}}
                      onClick={() => isCurrentMonth && setView("day")}
                    >
                      <Flex justify="flex-end" mb={1}>
                        <Flex 
                          w={6} h={6} 
                          align="center" justify="center" 
                          borderRadius="full" 
                          bg={isToday ? "#007D79" : "transparent"}
                          color={isToday ? "white" : isCurrentMonth ? "gray.700" : "gray.300"}
                          fontWeight={isToday ? "bold" : "normal"}
                        >
                          {isCurrentMonth ? dayNum : ""}
                        </Flex>
                      </Flex>
                      {isCurrentMonth && dayNum % 3 === 0 && (
                        <VStack align="stretch" gap={1}>
                          <Box bg="blue.100" color="blue.800" fontSize="xs" px={2} py={0.5} borderRadius="sm" truncate>English B2</Box>
                          <Box bg="green.100" color="green.800" fontSize="xs" px={2} py={0.5} borderRadius="sm" truncate>Science Lab</Box>
                        </VStack>
                      )}
                      {isHol && (
                        <Box bg="gray.200" color="gray.700" fontSize="xs" px={2} py={0.5} borderRadius="sm" mt={1} truncate>Public Holiday</Box>
                      )}
                    </Box>
                  );
                })}
              </Grid>
            </Flex>
          )}
        </Box>
      </Box>

      {/* --- OVERLAYS & MODALS --- */}

      {/* Context Menu for Bulk Operations */}
      {contextMenuEvent && (
        <>
          <Box position="fixed" inset={0} zIndex={100} onClick={() => setContextMenuEvent(null)} onContextMenu={(e) => { e.preventDefault(); setContextMenuEvent(null); }} />
          <Box 
            position="absolute" 
            top="50%" left="50%" 
            bg="white" 
            borderRadius="md" 
            shadow="lg" 
            borderWidth="1px" 
            borderColor="gray.200" 
            zIndex={101}
            minW="200px"
            py={2}
          >
            <VStack align="stretch" gap={0}>
              <Box px={4} py={2} _hover={{ bg: "gray.50" }} cursor="pointer" onClick={() => setContextMenuEvent(null)}>
                <Text fontSize="sm">Edit this lesson only</Text>
              </Box>
              <Box px={4} py={2} _hover={{ bg: "gray.50" }} cursor="pointer" onClick={() => setContextMenuEvent(null)}>
                <Text fontSize="sm">Edit all future lessons</Text>
              </Box>
              <Box h="1px" bg="gray.200" my={1} />
              <Box px={4} py={2} _hover={{ bg: "red.50" }} cursor="pointer" color="red.600" onClick={() => { setContextMenuEvent(null); setIsCancelDialogOpen(true); }}>
                <Text fontSize="sm">Cancel this lesson</Text>
              </Box>
              <Box px={4} py={2} _hover={{ bg: "red.50" }} cursor="pointer" color="red.600" onClick={() => { setContextMenuEvent(null); setIsCancelDialogOpen(true); }}>
                <Text fontSize="sm">Cancel all future lessons from this date</Text>
              </Box>
            </VStack>
          </Box>
        </>
      )}

      {/* Cancel Dialog */}
      <DialogRoot open={isCancelDialogOpen} onOpenChange={(e) => setIsCancelDialogOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Lesson</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Text fontSize="sm" color="gray.700">Are you sure you want to cancel this lesson? This action cannot be undone.</Text>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Reason (Optional)</Text>
                <Textarea placeholder="e.g. Teacher sick" />
              </Box>
              <Checkbox defaultChecked>Notify students via email</Checkbox>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>Keep Lesson</Button>
            <Button colorPalette="red" onClick={() => setIsCancelDialogOpen(false)}>Cancel Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Holiday Drawer */}
      <DrawerRoot open={isHolidayDrawerOpen} onOpenChange={(e) => setIsHolidayDrawerOpen(e.open)} size="md">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Holiday Calendar</DrawerTitle>
            <DrawerCloseTrigger />
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" gap={8}>
              <Box p={4} bg="gray.50" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                <Text fontWeight="bold" mb={4}>Add Holiday</Text>
                <Grid templateColumns="1fr 1fr" gap={4} mb={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Holiday Name</Text>
                    <Input bg="white" value={newHoliday.name} onChange={e => setNewHoliday({...newHoliday, name: e.target.value})} />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Date</Text>
                    <Input type="date" bg="white" value={newHoliday.date} onChange={e => setNewHoliday({...newHoliday, date: e.target.value})} />
                  </Box>
                </Grid>
                <Flex align="center" justify="space-between" mb={4}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">Recurring yearly</Text>
                  <Switch checked={newHoliday.recurring} onCheckedChange={e => setNewHoliday({...newHoliday, recurring: e.checked})} />
                </Flex>
                <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} w="full" onClick={handleAddHoliday}>
                  <Box asChild mr={2}><Plus size={16} /></Box> Add Holiday
                </Button>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={4}>Existing Holidays</Text>
                <Table.Root variant="line" size="sm">
                  <Table.Header bg="gray.50">
                    <Table.Row>
                      <Table.ColumnHeader>Date</Table.ColumnHeader>
                      <Table.ColumnHeader>Holiday Name</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {holidays.map(holiday => (
                      <Table.Row key={holiday.id}>
                        <Table.Cell>{holiday.date}</Table.Cell>
                        <Table.Cell>
                          {holiday.name}
                          {holiday.recurring && <Badge ml={2} colorPalette="blue" variant="subtle" fontSize="2xs">Yearly</Badge>}
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          <HStack gap={1} justify="flex-end">
                            <IconButton variant="ghost" size="xs" aria-label="Edit"><Box asChild><Edit2 size={14} /></Box></IconButton>
                            <IconButton variant="ghost" size="xs" aria-label="Delete" color="red.500"><Box asChild><Trash2 size={14} /></Box></IconButton>
                          </HStack>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild><Button variant="outline">Close</Button></DrawerActionTrigger>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>

      {/* 1. Side Drawer: New Class */}
      {isDrawerOpen && (
        <>
          <Box position="fixed" inset={0} bg="blackAlpha.400" zIndex={40} onClick={() => setIsDrawerOpen(false)} />
          <Box 
            position="fixed" top={0} right={0} bottom={0} w="450px" bg="white" zIndex={50} shadow="2xl"
            display="flex" flexDirection="column" animation="slideInRight 0.3s ease-out"
          >
            <Flex justify="space-between" align="center" p={5} borderBottomWidth="1px" borderColor="gray.200">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">New Booking</Text>
              <IconButton aria-label="Close" variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)}>
                <X size={20} />
              </IconButton>
            </Flex>
            
            <Box flex="1" overflowY="auto" p={6}>
              <VStack align="stretch" gap={5}>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Booking Title</Text>
                  <Input 
                    value={newBooking.title}
                    onChange={(e) => setNewBooking({...newBooking, title: e.target.value})}
                    placeholder="e.g. Advanced Mathematics / Consultation" 
                    borderRadius="md" 
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Learner / Client</Text>
                  <Flex align="center" position="relative">
                    <Box position="absolute" left={3} color="gray.400">
                      <Search size={16} />
                    </Box>
                    <Input pl={10} placeholder="Search by name or email..." borderRadius="md" />
                  </Flex>
                </Box>
                
                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Day of Week</Text>
                    <NativeSelectRoot>
                      <NativeSelectField 
                        value={newBooking.dayIndex}
                        onChange={(e) => setNewBooking({...newBooking, dayIndex: parseInt(e.target.value)})}
                      >
                        <option value={0}>Monday</option>
                        <option value={1}>Tuesday</option>
                        <option value={2}>Wednesday</option>
                        <option value={3}>Thursday</option>
                        <option value={4}>Friday</option>
                        <option value={5}>Saturday</option>
                        <option value={6}>Sunday</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Type</Text>
                    <NativeSelectRoot>
                      <NativeSelectField 
                        value={newBooking.type}
                        onChange={(e) => setNewBooking({...newBooking, type: e.target.value})}
                      >
                        <option value="group">Group Class</option>
                        <option value="private">Private Lesson</option>
                        <option value="consultation">Consultation</option>
                        <option value="exam">Examination</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                </Grid>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Start Time</Text>
                    <Input 
                      type="time" 
                      borderRadius="md" 
                      value={newBooking.startTime}
                      onChange={(e) => setNewBooking({...newBooking, startTime: e.target.value})}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>End Time</Text>
                    <Input 
                      type="time" 
                      borderRadius="md" 
                      value={newBooking.endTime}
                      onChange={(e) => setNewBooking({...newBooking, endTime: e.target.value})}
                    />
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Staff / Teacher</Text>
                  <NativeSelectRoot>
                    <NativeSelectField 
                      value={newBooking.teacher}
                      onChange={(e) => setNewBooking({...newBooking, teacher: e.target.value})}
                    >
                      <option value="sarah">Sarah Jenkins</option>
                      <option value="michael">Michael Chen</option>
                      <option value="emma">Emma Watson</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Box>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Location / Room</Text>
                    <NativeSelectRoot>
                      <NativeSelectField 
                        value={newBooking.room}
                        onChange={(e) => setNewBooking({...newBooking, room: e.target.value})}
                      >
                        <option value="101">Room 101</option>
                        <option value="102">Room 102</option>
                        <option value="online">Online (Zoom)</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Payment Status</Text>
                    <NativeSelectRoot>
                      <NativeSelectField defaultValue="unpaid">
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                        <option value="deposit">Deposit Paid</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Recurrence</Text>
                  <NativeSelectRoot>
                    <NativeSelectField defaultValue="none">
                      <option value="none">Does not repeat</option>
                      <option value="weekly">Weekly on Wednesdays</option>
                      <option value="custom">Custom...</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={1.5}>Notes (Optional)</Text>
                  <Textarea placeholder="Add any specific instructions..." borderRadius="md" rows={3} />
                </Box>

                <Flex align="center" justify="space-between" p={3} bg="gray.50" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">Send Confirmation Email</Text>
                    <Text fontSize="xs" color="gray.500">Notify the learner/client about this booking</Text>
                  </Box>
                  <Switch defaultChecked colorScheme="teal" />
                </Flex>
              </VStack>
            </Box>
            
            <Box p={5} borderTopWidth="1px" borderColor="gray.200" bg="gray.50">
              <Flex justify="flex-end" gap={3}>
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} onClick={handleCreateBooking}>Create Booking</Button>
              </Flex>
            </Box>
          </Box>
        </>
      )}

      {/* 2. Popover Modal: Event Quick View */}
      {selectedEvent && !isAttendanceOpen && (
        <>
          <Box position="fixed" inset={0} bg="blackAlpha.300" zIndex={40} onClick={() => setSelectedEvent(null)} />
          <Box 
            position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" 
            bg="white" borderRadius="xl" shadow="2xl" w="400px" zIndex={50} overflow="hidden"
          >
            <Box bg={`${selectedEvent.color}.500`} p={4} color="white" position="relative">
              <IconButton aria-label="Close" variant="ghost" size="sm" position="absolute" top={2} right={2} color="white" _hover={{ bg: "whiteAlpha.200" }} onClick={() => setSelectedEvent(null)}>
                <X size={20} />
              </IconButton>
              <Badge bg="whiteAlpha.300" color="white" mb={2} border="none">{selectedEvent.type}</Badge>
              <Text fontSize="xl" fontWeight="bold">{selectedEvent.title}</Text>
              <Text fontSize="sm" opacity={0.9}>{selectedEvent.time}</Text>
            </Box>
            
            <VStack align="stretch" p={5} gap={4}>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Flex align="center" gap={3}>
                  <Box color="gray.400"><Users size={18} /></Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Teacher</Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.800">{selectedEvent.teacher}</Text>
                  </Box>
                </Flex>
                <Flex align="center" gap={3}>
                  <Box color="gray.400"><MapPin size={18} /></Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Location</Text>
                    <Text fontSize="sm" fontWeight="medium" color="gray.800">{selectedEvent.room}</Text>
                  </Box>
                </Flex>
              </Grid>

              <Box bg="gray.50" p={3} borderRadius="md" borderWidth="1px" borderColor="gray.200">
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">Enrollment</Text>
                  <Text fontSize="sm" fontWeight="bold" color={selectedEvent.enrolled >= selectedEvent.capacity ? "red.500" : "green.600"}>
                    {selectedEvent.enrolled} / {selectedEvent.capacity}
                  </Text>
                </Flex>
                <Box w="full" bg="gray.200" h="6" borderRadius="full" overflow="hidden" position="relative">
                  <Box w={`${(selectedEvent.enrolled / selectedEvent.capacity) * 100}%`} bg={selectedEvent.enrolled >= selectedEvent.capacity ? "red.400" : "green.400"} h="full" />
                </Box>
              </Box>

              <Grid templateColumns="1fr 1fr" gap={3} mt={2}>
                <Button 
                  bg="#007D79" color="white" _hover={{ bg: "#006666" }} 
                  onClick={() => setIsAttendanceOpen(true)}
                >
                  <Box asChild mr={2}><UserCheck size={16} /></Box>
                  Attendance
                </Button>
                <Button variant="outline" borderColor="gray.300" color="gray.700">
                  <Box asChild mr={2}><MessageSquare size={16} /></Box>
                  Message All
                </Button>
                <Button variant="outline" borderColor="gray.300" color="gray.700" gridColumn="span 2">
                  <Box asChild mr={2}><CreditCard size={16} /></Box>
                  View Payments / Invoices
                </Button>
              </Grid>
              <Button variant="ghost" color="gray.500" size="sm">Edit Booking Details</Button>
            </VStack>
          </Box>
        </>
      )}

      {/* 3. Modal: Take Attendance */}
      {isAttendanceOpen && selectedEvent && !isReportOpen && (
        <>
          <Box position="fixed" inset={0} bg="blackAlpha.500" zIndex={60} onClick={() => setIsAttendanceOpen(false)} />
          <Box 
            position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" 
            bg="white" borderRadius="xl" shadow="2xl" w="600px" maxH="90vh" zIndex={70} display="flex" flexDirection="column"
          >
            <Flex justify="space-between" align="center" p={5} borderBottomWidth="1px" borderColor="gray.200">
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">Take Attendance</Text>
                <Text fontSize="sm" color="gray.500">{selectedEvent.title} • {selectedEvent.time}</Text>
              </Box>
              <HStack gap={4}>
                <Button size="sm" variant="outline" onClick={markAllPresent}>Mark All Present</Button>
                <IconButton aria-label="Close" variant="ghost" size="sm" onClick={() => setIsAttendanceOpen(false)}>
                  <X size={20} />
                </IconButton>
              </HStack>
            </Flex>
            
            <Box flex="1" overflowY="auto" p={2}>
              {attendanceState.map((learner) => (
                <Flex key={learner.id} align="center" justify="space-between" p={3} _hover={{ bg: "gray.50" }} borderRadius="md">
                  <Flex align="center" gap={3}>
                    <Avatar.Root size="sm">
                      <Avatar.Image src={learner.avatar} />
                      <Avatar.Fallback name={learner.name} />
                    </Avatar.Root>
                    <Text fontSize="sm" fontWeight="medium" color="gray.800">{learner.name}</Text>
                  </Flex>
                  
                  <HStack gap={1} bg="gray.100" p={1} borderRadius="md">
                    <Button 
                      size="sm" h="8" px={3} 
                      bg={learner.status === "present" ? "green.500" : "transparent"} 
                      color={learner.status === "present" ? "white" : "gray.600"}
                      _hover={{ bg: learner.status === "present" ? "green.600" : "gray.200" }}
                      onClick={() => handleAttendanceToggle(learner.id, "present")}
                    >
                      <Box asChild mr={1}><CheckCircle2 size={14} /></Box> Present
                    </Button>
                    <Button 
                      size="sm" h="8" px={3} 
                      bg={learner.status === "late" ? "orange.400" : "transparent"} 
                      color={learner.status === "late" ? "white" : "gray.600"}
                      _hover={{ bg: learner.status === "late" ? "orange.500" : "gray.200" }}
                      onClick={() => handleAttendanceToggle(learner.id, "late")}
                    >
                      <Box asChild mr={1}><Clock size={14} /></Box> Late
                    </Button>
                    <Button 
                      size="sm" h="8" px={3} 
                      bg={learner.status === "absent" ? "red.500" : "transparent"} 
                      color={learner.status === "absent" ? "white" : "gray.600"}
                      _hover={{ bg: learner.status === "absent" ? "red.600" : "gray.200" }}
                      onClick={() => handleAttendanceToggle(learner.id, "absent")}
                    >
                      <Box asChild mr={1}><XCircle size={14} /></Box> Absent
                    </Button>
                    <Button 
                      size="sm" h="8" px={3} 
                      bg={learner.status === "excused" ? "gray.500" : "transparent"} 
                      color={learner.status === "excused" ? "white" : "gray.600"}
                      _hover={{ bg: learner.status === "excused" ? "gray.600" : "gray.200" }}
                      onClick={() => handleAttendanceToggle(learner.id, "excused")}
                    >
                      <Box asChild mr={1}><CalendarIcon size={14} /></Box> Excused
                    </Button>
                  </HStack>
                </Flex>
              ))}
            </Box>
            
            <Box p={5} borderTopWidth="1px" borderColor="gray.200" bg="gray.50">
              <Flex justify="space-between" align="center" mb={4}>
                <HStack gap={4}>
                  <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="bold">Hours Taught</Text>
                    <Text fontSize="lg" fontWeight="bold">{calculateHours()}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="bold">Attendance Rate</Text>
                    <Text fontSize="lg" fontWeight="bold" color={rateColor}>{attendanceRate}%</Text>
                  </Box>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  {attendanceState.filter(s => s.status !== "none").length} / {attendanceState.length} marked
                </Text>
              </Flex>
              <Flex justify="space-between" align="center" p={3} bg="#E6F4F1" borderRadius="md" mb={4}>
                <Text fontSize="sm" fontWeight="medium" color="#007D79">Add a lesson report?</Text>
                <HStack gap={2}>
                  <Button size="sm" variant="outline" bg="white" onClick={() => {
                    setIsAttendanceOpen(false);
                    setSelectedEvent(null);
                  }}>Later</Button>
                  <Button size="sm" bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsReportOpen(true)}>Yes</Button>
                </HStack>
              </Flex>
              <Flex justify="flex-end">
                <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} onClick={() => {
                  setIsAttendanceOpen(false);
                  setSelectedEvent(null);
                }}>
                  Save Attendance
                </Button>
              </Flex>
            </Box>
          </Box>
        </>
      )}

      {/* 4. Drawer: Lesson Report */}
      <DrawerRoot open={isReportOpen} onOpenChange={(e) => {
        setIsReportOpen(e.open);
        if (!e.open) {
          setIsAttendanceOpen(false);
          setSelectedEvent(null);
        }
      }} size="md">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Lesson Report</DrawerTitle>
            <DrawerCloseTrigger />
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" gap={6}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Lesson Topic</Text>
                <Input placeholder="e.g. Present Perfect vs Past Simple" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Objectives Met</Text>
                <NativeSelectRoot>
                  <NativeSelectField>
                    <option value="all">All objectives met</option>
                    <option value="partial">Partial objectives met</option>
                    <option value="none">None met</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Class Performance</Text>
                <HStack gap={1}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Box asChild key={star} cursor="pointer" color={star <= 4 ? "#007D79" : "gray.300"}>
                      <Star fill={star <= 4 ? "currentColor" : "none"} />
                    </Box>
                  ))}
                </HStack>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>Per-student notes</Text>
                <VStack align="stretch" gap={3}>
                  {attendanceState.filter(s => s.status === "present" || s.status === "late").map(learner => (
                    <Box key={learner.id} p={3} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                      <Text fontSize="sm" fontWeight="medium" mb={2}>{learner.name}</Text>
                      <Textarea placeholder="Notes for this student..." size="sm" rows={2} />
                    </Box>
                  ))}
                </VStack>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Homework Assigned</Text>
                <Input placeholder="e.g. Workbook pages 12-14" />
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline">Save as Draft</Button>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => {
              setIsReportOpen(false);
              setIsAttendanceOpen(false);
              setSelectedEvent(null);
            }}>Submit Report</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </Flex>
  );
}
