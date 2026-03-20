import { Box, Flex, Text, HStack, VStack, Button, Badge, Avatar, Grid, Table, Input, Textarea } from "@chakra-ui/react";
import { Mail, Phone, Calendar, FileText, CreditCard, MoreHorizontal, CheckCircle2, Circle, Trash2, Printer, Edit, Plus, Search, ChevronDown, Download, MessageSquare, ChevronRight, Flag, Clock, IdCard, Lock, Users } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../components/ui/menu";
import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, DialogCloseTrigger } from "../components/ui/dialog";
import { DrawerRoot, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerActionTrigger, DrawerCloseTrigger } from "../components/ui/drawer";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import { toaster } from "../components/ui/toaster";

export function LearnerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string, id: string | number, name: string } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditLearnerOpen, setIsEditLearnerOpen] = useState(false);
  const [isLearnerCardOpen, setIsLearnerCardOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    assignee: "Zakaria C.",
    dueDate: "",
    type: "General",
    priority: "Unset",
    comments: ""
  });
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up on absence",
      dueDate: "2026-03-18",
      type: "Follow-up",
      priority: "High",
      status: "Pending",
      assignee: "Zakaria C.",
      assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
      overdue: false,
      comments: ""
    },
    {
      id: 2,
      title: "Send progress report",
      dueDate: "2026-03-25",
      type: "Admin",
      priority: "Medium",
      status: "Pending",
      assignee: "Sarah M.",
      assigneeAvatar: "https://i.pravatar.cc/150?u=sarah",
      overdue: false,
      comments: ""
    },
    {
      id: 3,
      title: "Prepare exam materials",
      dueDate: "2026-03-10",
      type: "Material",
      priority: "Low",
      status: "Completed",
      assignee: "Zakaria C.",
      assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
      overdue: true,
      comments: ""
    }
  ]);
  const [addModalType, setAddModalType] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddRelationshipOpen, setIsAddRelationshipOpen] = useState(false);
  const [addRelStep, setAddRelStep] = useState<1 | 2 | 3>(1);
  const [addRelSearchQuery, setAddRelSearchQuery] = useState("");
  const [addRelSelectedContact, setAddRelSelectedContact] = useState<any>(null);
  const [addRelNewContact, setAddRelNewContact] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    email: "",
    phone: "",
    createAsParent: false,
    createAsStudent: false,
    createAsContact: true,
    sendInvite: false,
  });
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const [scheduleClasses, setScheduleClasses] = useState([
    { id: 1, subject: "English", className: "English B2 - Grammar", teacher: "Zakaria Chamakh", date: "2026-03-19", time: "10:00", duration: "60 mins", status: "Scheduled", subscription: "English B2 (Monthly)" },
    { id: 2, subject: "Math", className: "Calculus 101", teacher: "Sarah M.", date: "2026-03-20", time: "14:00", duration: "90 mins", status: "Scheduled", subscription: "Math Tutoring" },
    { id: 3, subject: "Physics", className: "Physics Basics", teacher: "John D.", date: "2026-03-21", time: "11:00", duration: "60 mins", status: "Completed", subscription: "One-off Class" },
    { id: 4, subject: "English", className: "English B2 - Speaking", teacher: "Zakaria Chamakh", date: "2026-03-22", time: "15:00", duration: "60 mins", status: "Scheduled", subscription: "English B2 (Monthly)" },
    { id: 5, subject: "History", className: "World History II", teacher: "Emily R.", date: "2026-03-23", time: "09:00", duration: "45 mins", status: "Scheduled", subscription: "History Bundle" },
    { id: 6, subject: "Computer Science", className: "Intro to Python", teacher: "Michael T.", date: "2026-03-24", time: "16:00", duration: "120 mins", status: "Scheduled", subscription: "Coding Bootcamp" },
    { id: 7, subject: "English", className: "English B2 - Writing", teacher: "Zakaria Chamakh", date: "2026-03-12", time: "10:00", duration: "60 mins", status: "Completed", subscription: "English B2 (Monthly)" },
    { id: 8, subject: "Math", className: "Algebra II", teacher: "Sarah M.", date: "2026-03-15", time: "14:00", duration: "90 mins", status: "Completed", subscription: "Math Tutoring" },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, date: "2026-03-18", className: "English B2 - Grammar", status: "Present", notes: "Arrived 5 mins early" },
    { id: 2, date: "2026-03-15", className: "Calculus 101", status: "Late", notes: "10 mins late due to traffic" },
    { id: 3, date: "2026-03-12", className: "Physics Basics", status: "Absent", notes: "Sick leave, doctor's note provided" },
    { id: 4, date: "2026-03-10", className: "English B2 - Speaking", status: "Excused", notes: "Family emergency" },
    { id: 5, date: "2026-03-08", className: "World History II", status: "Present", notes: "Participated well in discussion" },
    { id: 6, date: "2026-03-05", className: "Intro to Python", status: "Present", notes: "Completed coding exercise early" },
    { id: 7, date: "2026-03-01", className: "English B2 - Writing", status: "Late", notes: "5 mins late" },
    { id: 8, date: "2026-02-25", className: "Algebra II", status: "Present", notes: "" },
  ]);

  const [grades, setGrades] = useState([
    { id: 1, subject: "English", assignment: "Midterm Exam", type: "Exam", weight: "30%", date: "2026-03-10", score: "85/100", grade: "B+", feedback: "Good grammar, needs work on vocabulary." },
    { id: 2, subject: "Math", assignment: "Quiz 1", type: "Quiz", weight: "10%", date: "2026-03-05", score: "92/100", grade: "A-", feedback: "Excellent problem solving." },
    { id: 3, subject: "Physics", assignment: "Lab Report", type: "Project", weight: "20%", date: "2026-02-28", score: "78/100", grade: "C+", feedback: "Data analysis was a bit weak." },
    { id: 4, subject: "History", assignment: "Essay on WWII", type: "Homework", weight: "15%", date: "2026-02-20", score: "88/100", grade: "B+", feedback: "Strong arguments, well-structured." },
    { id: 5, subject: "Computer Science", assignment: "Python Project 1", type: "Project", weight: "25%", date: "2026-02-15", score: "95/100", grade: "A", feedback: "Clean code and good logic." },
    { id: 6, subject: "English", assignment: "Speaking Test", type: "Exam", weight: "20%", date: "2026-02-10", score: "90/100", grade: "A-", feedback: "Fluent delivery, minor pronunciation errors." },
  ]);

  const [subscriptions, setSubscriptions] = useState([
    { id: 1, plan: "English B2 (Monthly)", status: "Active", amount: "£130.00 GBP", billingCycle: "Monthly", created: "Feb 16, 2026" },
    { id: 2, plan: "Math Tutoring", status: "Paused", amount: "£85.00 GBP", billingCycle: "Weekly", created: "Jan 10, 2026" }
  ]);

  const [payments, setPayments] = useState([
    { id: "INV-001", status: "Paid", amount: "£130.00 GBP", description: "English B2 (Monthly)", billing: "Auto", created: "Mar 16, 2026", dueDate: "Mar 16, 2026" },
    { id: "INV-002", status: "Draft", amount: "£149.00 GBP", description: "IELTS Preparation", billing: "Manual", created: "Mar 16, 2026", dueDate: "Mar 23, 2026" },
    { id: "INV-003", status: "Past due", amount: "£85.00 GBP", description: "Math Tutoring", billing: "Manual", created: "Mar 01, 2026", dueDate: "Mar 10, 2026" },
    { id: "INV-004", status: "Paid", amount: "£130.00 GBP", description: "English B2 (Monthly)", billing: "Auto", created: "Feb 16, 2026", dueDate: "Feb 16, 2026" },
    { id: "INV-005", status: "Paid", amount: "£50.00 GBP", description: "Registration Fee", billing: "Manual", created: "Jan 15, 2026", dueDate: "Jan 20, 2026" },
    { id: "INV-006", status: "Paid", amount: "£130.00 GBP", description: "English B2 (Monthly)", billing: "Auto", created: "Jan 16, 2026", dueDate: "Jan 16, 2026" },
  ]);

  const [notes, setNotes] = useState([
    { id: 1, date: "2026-03-18", author: "Zakaria Chamakh", type: "Behavioral", content: "Sarah was very engaged in today's class.", visibility: "Internal Only", tags: "positive" },
    { id: 2, date: "2026-03-10", author: "Sarah M.", type: "Academic", content: "Struggling with advanced calculus concepts. Recommended extra tutoring.", visibility: "Share with Parents", tags: "tutoring, math" },
    { id: 3, date: "2026-02-25", author: "Admin", type: "General", content: "Parent called to update emergency contact number.", visibility: "Internal Only", tags: "admin, contact" },
    { id: 4, date: "2026-02-15", author: "John D.", type: "Academic", content: "Excellent performance in the physics lab.", visibility: "Share with Parents", tags: "positive, physics" },
    { id: 5, date: "2026-02-01", author: "Emily R.", type: "Behavioral", content: "A bit distracted during the history lecture.", visibility: "Internal Only", tags: "attention" },
    { id: 6, date: "2026-01-20", author: "Admin", type: "General", content: "Learner enrolled in the English B2 course.", visibility: "Internal Only", tags: "enrollment" },
  ]);

  const [isAssignClassOpen, setIsAssignClassOpen] = useState(false);
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAddAttendanceOpen, setIsAddAttendanceOpen] = useState(false);
  const [conflictAlert, setConflictAlert] = useState<{ isOpen: boolean, message: string, duplicateId?: number }>({ isOpen: false, message: "" });
  
  const [assignClassData, setAssignClassData] = useState({ subject: "English", className: "", teacher: "Zakaria Chamakh", date: "", time: "", duration: "60 mins", subscription: "English B2 (Monthly)" });
  const [addGradeData, setAddGradeData] = useState({ subject: "English", assignment: "", type: "Exam", date: "", score: "", grade: "", weight: "", feedback: "" });
  const [addNoteData, setAddNoteData] = useState({ type: "General", content: "", visibility: "Internal Only", tags: "" });
  const [addAttendanceData, setAddAttendanceData] = useState({ date: "", time: "", duration: "", className: "", status: "Present", notes: "" });

  const handleDelete = () => {
    // Handle delete logic here
    setIsDeleteDialogOpen(false);
    navigate("/learners");
  };

  const handleItemDelete = () => {
    // Handle item delete logic here
    setItemToDelete(null);
  };

  const handleOpenAddModal = (type: string) => {
    if (type === "Relationship") {
      setAddRelStep(1);
      setAddRelSearchQuery("");
      setAddRelSelectedContact(null);
      setAddRelNewContact({
        firstName: "",
        lastName: "",
        relationship: "",
        email: "",
        phone: "",
        createAsParent: false,
        createAsStudent: false,
        createAsContact: true,
        sendInvite: false,
      });
      setIsAddRelationshipOpen(true);
    } else if (type === "Class") {
      setIsAssignClassOpen(true);
    } else if (type === "Grade") {
      setIsAddGradeOpen(true);
    } else if (type === "Note") {
      setIsAddNoteOpen(true);
    } else if (type === "Attendance") {
      setIsAddAttendanceOpen(true);
    } else {
      setAddModalType(type);
      setIsAddModalOpen(true);
    }
  };

  const handleAssignClass = () => {
    // Check for conflicts
    const conflict = scheduleClasses.find(c => c.date === assignClassData.date && c.time === assignClassData.time);
    if (conflict) {
      if (conflict.subject === assignClassData.subject && conflict.className === assignClassData.className) {
        setConflictAlert({ isOpen: true, message: `Duplicate class detected: ${conflict.className} at ${conflict.time} on ${conflict.date}. Do you want to merge them?`, duplicateId: conflict.id });
      } else {
        setConflictAlert({ isOpen: true, message: `Time conflict detected: Learner is already attending ${conflict.className} at ${conflict.time} on ${conflict.date}.` });
      }
      return;
    }
    
    const newClass = {
      id: Math.max(0, ...scheduleClasses.map(c => c.id)) + 1,
      ...assignClassData,
      status: "Scheduled"
    };
    setScheduleClasses([...scheduleClasses, newClass]);
    setIsAssignClassOpen(false);
  };

  const handleMergeDuplicate = () => {
    // Merge duplicate (just keep one, so we just close the modal and don't add)
    setConflictAlert({ isOpen: false, message: "" });
    setIsAssignClassOpen(false);
  };

  const handleAddGrade = () => {
    const newGrade = {
      id: Math.max(0, ...grades.map(g => g.id)) + 1,
      ...addGradeData
    };
    setGrades([...grades, newGrade]);
    setIsAddGradeOpen(false);
  };

  const handleAddNote = () => {
    const newNote = {
      id: Math.max(0, ...notes.map(n => n.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      author: "Current User",
      ...addNoteData
    };
    setNotes([newNote, ...notes]);
    setIsAddNoteOpen(false);
  };

  const handleAddAttendance = () => {
    const newAttendance = {
      id: Math.max(0, ...attendanceRecords.map(a => a.id)) + 1,
      ...addAttendanceData
    };
    setAttendanceRecords([newAttendance, ...attendanceRecords]);
    setIsAddAttendanceOpen(false);
  };

  const handleTaskSave = () => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskFormData } : t));
    } else {
      const newTask = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
        title: taskFormData.title,
        dueDate: taskFormData.dueDate,
        type: taskFormData.type,
        priority: taskFormData.priority,
        status: "Pending",
        assignee: taskFormData.assignee,
        assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
        overdue: false,
        comments: taskFormData.comments
      };
      setTasks([...tasks, newTask]);
    }
    setIsTaskModalOpen(false);
  };

  const handleTaskEdit = (task: any) => {
    setEditingTask(task);
    setTaskFormData({
      title: task.title,
      assignee: task.assignee,
      dueDate: task.dueDate,
      type: task.type || "General",
      priority: task.priority,
      comments: task.comments || ""
    });
    setIsTaskModalOpen(true);
  };

  const handleTaskCreate = () => {
    setEditingTask(null);
    setTaskFormData({
      title: "",
      assignee: "Zakaria C.",
      dueDate: "",
      type: "General",
      priority: "Unset",
      comments: ""
    });
    setIsTaskModalOpen(true);
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } 
        : task
    ));
  };

  // Demo data for ID 1
  const learner = {
    id: 1,
    name: "Sarah Martinez",
    email: "sarah.m@example.com",
    phone: "+212 600 123456",
    status: "Active",
    course: "English B2",
    labels: [{ text: "VIP", color: "purple" }, { text: "Gold Star", color: "yellow" }],
    avatar: "https://i.pravatar.cc/150?u=1",
    age: 14,
    parent: "Maria Martinez",
    enrolled: "Sep 2024",
    attendance: "92%",
    balance: "$150.00",
    lastLesson: "Yesterday",
    idNumber: "9YB8GGI1QI"
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "attendance", label: "Attendance" },
    { id: "grades", label: "Grades" },
    { id: "fees", label: "Fees & Payments" },
    { id: "notes", label: "Notes" },
    { id: "tasks", label: "Tasks" }
  ];

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white" h="calc(100vh - 64px)">
      {/* Left Sidebar */}
      <Box w="250px" borderRightWidth="1px" borderColor="gray.200" bg="#F7FAFC" py={6} overflowY="auto" h="calc(100vh - 64px)">
        <Button 
          variant="ghost" 
          justifyContent="flex-start" 
          px={6} 
          mb={4} 
          color="#007D79" 
          fontWeight="bold" 
          fontSize="sm"
          onClick={() => navigate("/learners")}
          _hover={{ bg: "transparent", color: "#00635f" }}
        >
          BACK
        </Button>
        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={4} px={6} letterSpacing="wider">
          LEARNER PROFILE
        </Text>
        <VStack align="stretch" gap={0}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <Flex
                key={tab.id}
                align="center"
                justify="space-between"
                py={2.5}
                px={6}
                bg={isActive ? "#E6F2F2" : "transparent"}
                color={isActive ? "#007D79" : "gray.700"}
                cursor="pointer"
                _hover={{ bg: isActive ? "#E6F2F2" : "gray.100" }}
                onClick={() => setActiveTab(tab.id)}
              >
                <Text fontSize="sm" fontWeight={isActive ? "500" : "400"}>{tab.label}</Text>
                {isActive && <ChevronRight size={16} />}
              </Flex>
            );
          })}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" overflowY="auto" p={8}>
        {/* Header Card */}
        <Box bg="white" p={8} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200" mb={6}>
          <Flex justify="space-between" align="flex-start">
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="#2d3748" fontFamily="Georgia, serif" mb={2}>
                {learner.name.toUpperCase()}
              </Text>
              <HStack color="gray.600" fontSize="sm" separator={<Text mx={2} color="gray.300">|</Text>} mb={6}>
                <Text>{learner.enrolled}</Text>
                <Text>{learner.age} years</Text>
                <Text>Parent: {learner.parent}</Text>
                <Text>{learner.idNumber}</Text>
              </HStack>

              <Text fontWeight="bold" color="gray.900" mb={2} fontSize="sm">Labels</Text>
              <HStack mb={4}>
                <Button variant="ghost" size="xs" color="#007D79" px={1} minW="auto"><Edit size={14} /></Button>
                {learner.labels.map(label => (
                  <Badge key={label.text} variant="subtle" colorPalette={label.color} borderRadius="md" px={2} py={0.5} textTransform="none" fontSize="xs" fontWeight="medium">
                    {label.text}
                  </Badge>
                ))}
              </HStack>

              <VStack align="start" gap={2} color="gray.700" fontSize="sm" mt={4}>
                <HStack><Box asChild color="gray.500"><Phone size={16} /></Box><Text>{learner.phone} (Home)</Text></HStack>
                <HStack><Box asChild color="gray.500"><Mail size={16} /></Box><Text>{learner.email}</Text></HStack>
              </VStack>
            </Box>

            <HStack gap={2}>
              <Button variant="outline" size="sm" color="#007D79" borderColor="#007D79" onClick={() => handleOpenAddModal("Print")}><Printer size={16} /></Button>
              <Button variant="outline" size="sm" color="#007D79" borderColor="#007D79" onClick={() => setIsLearnerCardOpen(true)}><IdCard size={16} /></Button>
              <Button variant="outline" size="sm" color="#007D79" borderColor="#007D79" onClick={() => setIsEditLearnerOpen(true)}><Edit size={16} /></Button>
              <MenuRoot>
                <MenuTrigger asChild>
                  <Button variant="outline" size="sm" color="#007D79" borderColor="#007D79"><MoreHorizontal size={16} /></Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="merge">Merge</MenuItem>
                  <MenuItem value="block">Block</MenuItem>
                  <MenuItem value="warning">Set warning</MenuItem>
                  <MenuItem value="export">Export learner data</MenuItem>
                  <MenuItem value="archive">Archive</MenuItem>
                  <MenuItem value="delete" color="red.500" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 size={16} /> Delete
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            </HStack>
          </Flex>
        </Box>

        {/* Tab Content Area */}
        {activeTab === 'overview' && (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
              <Text fontWeight="bold" color="gray.900" mb={4} fontSize="lg" fontFamily="Georgia, serif">Performance</Text>
              <VStack align="stretch" gap={4} separator={<Box borderBottomWidth="1px" borderColor="gray.100" />}>
                <Flex justify="space-between" align="center" py={2}>
                  <Text color="gray.600" fontSize="sm">Attendance Rate</Text>
                  <Text fontWeight="medium" color="gray.900">{learner.attendance}</Text>
                </Flex>
                <Flex justify="space-between" align="center" py={2}>
                  <Text color="gray.600" fontSize="sm">Current Course</Text>
                  <Text fontWeight="medium" color="gray.900">{learner.course}</Text>
                </Flex>
                <Flex justify="space-between" align="center" py={2}>
                  <Text color="gray.600" fontSize="sm">Last Lesson</Text>
                  <Text fontWeight="medium" color="gray.900">{learner.lastLesson}</Text>
                </Flex>
              </VStack>
            </Box>

            <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
              <Text fontWeight="bold" color="gray.900" mb={4} fontSize="lg" fontFamily="Georgia, serif">Financial</Text>
              <VStack align="stretch" gap={4} separator={<Box borderBottomWidth="1px" borderColor="gray.100" />}>
                <Flex justify="space-between" align="center" py={2}>
                  <Text color="gray.600" fontSize="sm">Outstanding Balance</Text>
                  <Text fontWeight="medium" color="red.600">{learner.balance}</Text>
                </Flex>
              </VStack>
            </Box>

            <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontWeight="bold" color="gray.900" fontSize="lg" fontFamily="Georgia, serif">Relationships</Text>
                <Button variant="ghost" size="sm" color="#007D79" onClick={() => setIsAddRelationshipOpen(true)}>
                  <Plus size={16} /> Add
                </Button>
              </Flex>
              <VStack align="stretch" gap={4} separator={<Box borderBottomWidth="1px" borderColor="gray.100" />}>
                <Flex justify="space-between" align="center" py={2}>
                  <Box>
                    <Text fontWeight="medium" color="gray.900">{learner.parent}</Text>
                    <Text color="gray.500" fontSize="xs">Parent</Text>
                  </Box>
                  <Button variant="ghost" size="xs" color="#007D79"><Edit size={14} /></Button>
                </Flex>
              </VStack>
            </Box>
          </Grid>
        )}

        {activeTab === 'schedule' && (
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
            <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif" mb={6}>Schedule</Text>
            <Flex justify="space-between" align="center" mb={6}>
              <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }} onClick={() => handleOpenAddModal("Class")}>Assign Class</Button>
              <HStack gap={3}>
                <Button variant="outline" size="sm" color="gray.600">
                  <Search size={14} style={{ marginRight: '8px' }} /> Find class
                </Button>
                <Button variant="outline" size="sm" color="gray.600">Display all</Button>
                <Button variant="outline" size="sm" color="gray.600"><Printer size={14} style={{ marginRight: '8px' }} /> Print all</Button>
              </HStack>
            </Flex>
            <Table.Root variant="line">
              <Table.Header>
                <Table.Row bg="gray.50">
                  <Table.ColumnHeader>Subject</Table.ColumnHeader>
                  <Table.ColumnHeader>Class</Table.ColumnHeader>
                  <Table.ColumnHeader>Teacher</Table.ColumnHeader>
                  <Table.ColumnHeader>Date/Time</Table.ColumnHeader>
                  <Table.ColumnHeader>Duration</Table.ColumnHeader>
                  <Table.ColumnHeader>Subscription</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {scheduleClasses.map((cls) => (
                  <Table.Row key={cls.id}>
                    <Table.Cell fontWeight="medium">{cls.subject}</Table.Cell>
                    <Table.Cell>{cls.className}</Table.Cell>
                    <Table.Cell>{cls.teacher}</Table.Cell>
                    <Table.Cell>{cls.date}, {cls.time}</Table.Cell>
                    <Table.Cell>{cls.duration}</Table.Cell>
                    <Table.Cell>{cls.subscription || "N/A"}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={cls.status === 'Completed' ? 'gray' : 'green'} variant="subtle">
                        {cls.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button variant="ghost" size="sm" color="gray.500"><MoreHorizontal size={16} /></Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem value="edit"><Edit size={16} /> Edit</MenuItem>
                          <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'class', id: cls.id, name: `${cls.className} on ${cls.date}` })}>
                            <Trash2 size={16} /> Delete
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {activeTab === 'attendance' && (
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
            <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif" mb={6}>Attendance</Text>
            <Flex justify="space-between" align="center" mb={6}>
              <HStack gap={2}>
                <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }} onClick={() => handleOpenAddModal("Attendance")}>Record Attendance</Button>
              </HStack>
              <HStack gap={3}>
                <Button variant="outline" size="sm" color="gray.600">All</Button>
                <Button variant="outline" size="sm" color="gray.600">Date <ChevronDown size={14} style={{ marginLeft: '4px' }} /></Button>
              </HStack>
            </Flex>
            <Table.Root variant="line">
              <Table.Header>
                <Table.Row bg="gray.50">
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader>Class</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Notes</Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {attendanceRecords.map((record) => (
                  <Table.Row key={record.id}>
                    <Table.Cell>{record.date}</Table.Cell>
                    <Table.Cell fontWeight="medium">{record.className}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={record.status === 'Present' ? 'green' : record.status === 'Absent' ? 'red' : record.status === 'Late' ? 'yellow' : 'gray'} variant="subtle">
                        {record.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{record.notes}</Table.Cell>
                    <Table.Cell textAlign="right">
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button variant="ghost" size="sm" color="gray.500"><MoreHorizontal size={16} /></Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem value="edit"><Edit size={16} /> Edit</MenuItem>
                          <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'attendance record', id: record.id, name: `Attendance on ${record.date}` })}>
                            <Trash2 size={16} /> Delete
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {activeTab === 'grades' && (
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
            <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif" mb={6}>Grades</Text>
            <Flex justify="space-between" align="center" mb={6}>
              <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }} onClick={() => handleOpenAddModal("Grade")}>New Grade</Button>
              <HStack gap={3}>
                <Button variant="outline" size="sm" color="gray.600">Date created <ChevronDown size={14} style={{ marginLeft: '4px' }} /></Button>
              </HStack>
            </Flex>
            <VStack align="stretch" gap={4}>
              {grades.map((grade) => (
                <Box key={grade.id} p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md" _hover={{ bg: "gray.50" }}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="medium" color="gray.900">{grade.assignment}</Text>
                      <Text fontSize="sm" color="gray.500">{grade.subject} | {grade.type} ({grade.weight}) | Assessed on {grade.date}</Text>
                      {grade.feedback && <Text fontSize="sm" color="gray.600" mt={1}>"{grade.feedback}"</Text>}
                    </Box>
                    <HStack gap={4}>
                      <Badge colorPalette="blue" fontSize="sm" px={3} py={1}>{grade.grade}</Badge>
                      <Badge colorPalette="green" fontSize="sm" px={3} py={1}>{grade.score}</Badge>
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button variant="ghost" size="sm" color="gray.500"><MoreHorizontal size={16} /></Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem value="edit"><Edit size={16} /> Edit</MenuItem>
                          <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'grade', id: grade.id, name: grade.assignment })}>
                            <Trash2 size={16} /> Delete
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </HStack>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {activeTab === 'fees' && (
          <VStack align="stretch" gap={6}>
            {/* Subscriptions Section */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
              <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif" mb={6}>Active Subscriptions</Text>
              <Flex justify="space-between" align="center" mb={6}>
                <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }}>Create Subscription</Button>
              </Flex>
              <Table.Root variant="line">
                <Table.Header>
                  <Table.Row bg="gray.50">
                    <Table.ColumnHeader>Plan / Class</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Amount</Table.ColumnHeader>
                    <Table.ColumnHeader>Billing Cycle</Table.ColumnHeader>
                    <Table.ColumnHeader>Created</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {subscriptions.map((sub) => (
                    <Table.Row key={sub.id}>
                      <Table.Cell fontWeight="medium">{sub.plan}</Table.Cell>
                      <Table.Cell><Badge colorPalette={sub.status === 'Active' ? 'green' : 'orange'} variant="subtle">{sub.status}</Badge></Table.Cell>
                      <Table.Cell>{sub.amount}</Table.Cell>
                      <Table.Cell>{sub.billingCycle}</Table.Cell>
                      <Table.Cell>{sub.created}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <MenuRoot>
                          <MenuTrigger asChild>
                            <Button variant="ghost" size="sm" color="gray.500"><MoreHorizontal size={16} /></Button>
                          </MenuTrigger>
                          <MenuContent>
                            <MenuItem value="edit"><Edit size={16} /> Edit Subscription</MenuItem>
                            <MenuItem value="cancel" color="red.500"><Trash2 size={16} /> Cancel Subscription</MenuItem>
                          </MenuContent>
                        </MenuRoot>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

            {/* Invoices Section */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
              <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif" mb={6}>Payment History & Invoices</Text>
              <Flex justify="space-between" align="center" mb={6}>
                <HStack gap={2}>
                  <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }}>Create Invoice</Button>
                </HStack>
                <HStack gap={3}>
                  <NativeSelectRoot size="sm" width="150px">
                    <NativeSelectField items={["All invoices", "Draft", "Open", "Past due", "Paid"]} defaultValue="All invoices" />
                  </NativeSelectRoot>
                  <Button variant="outline" size="sm" color="gray.600">Filter <ChevronDown size={14} style={{ marginLeft: '4px' }} /></Button>
                </HStack>
              </Flex>
              <Table.Root variant="line">
                <Table.Header>
                  <Table.Row bg="gray.50">
                    <Table.ColumnHeader>Amount</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Invoice Number</Table.ColumnHeader>
                    <Table.ColumnHeader>Description</Table.ColumnHeader>
                    <Table.ColumnHeader>Billing</Table.ColumnHeader>
                    <Table.ColumnHeader>Due Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Created</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {payments.map((payment) => (
                    <Table.Row key={payment.id}>
                      <Table.Cell fontWeight="medium">{payment.amount}</Table.Cell>
                      <Table.Cell>
                        <Badge 
                          colorPalette={payment.status === 'Paid' ? 'green' : payment.status === 'Draft' ? 'gray' : 'red'} 
                          variant="subtle" 
                          display="flex" 
                          alignItems="center" 
                          gap={1} 
                          w="fit-content"
                        >
                          {payment.status} {payment.status === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell color="gray.500">{payment.id}</Table.Cell>
                      <Table.Cell>{payment.description}</Table.Cell>
                      <Table.Cell>{payment.billing}</Table.Cell>
                      <Table.Cell>{payment.dueDate}</Table.Cell>
                      <Table.Cell>{payment.created}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <MenuRoot>
                          <MenuTrigger asChild>
                            <Button variant="ghost" size="sm" color="gray.500"><MoreHorizontal size={16} /></Button>
                          </MenuTrigger>
                          <MenuContent>
                            {payment.status === 'Draft' ? (
                              <>
                                <MenuItem value="edit"><Edit size={16} /> Edit Draft</MenuItem>
                                <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'invoice', id: payment.id, name: payment.id })}><Trash2 size={16} /> Delete</MenuItem>
                              </>
                            ) : (
                              <>
                                <MenuItem value="view" onClick={() => setIsReceiptModalOpen(true)}><FileText size={16} /> View Invoice</MenuItem>
                                <MenuItem value="download"><Download size={16} /> Download PDF</MenuItem>
                              </>
                            )}
                          </MenuContent>
                        </MenuRoot>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </VStack>
        )}

        {activeTab === 'notes' && (
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
            <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif" mb={6}>Notes</Text>
            <Flex justify="space-between" align="center" mb={6}>
              <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }} onClick={() => handleOpenAddModal("Note")}>New note</Button>
              <HStack gap={3}>
                <Button variant="outline" size="sm" color="gray.600">All</Button>
                <Button variant="outline" size="sm" color="gray.600">Date Created <ChevronDown size={14} style={{ marginLeft: '4px' }} /></Button>
              </HStack>
            </Flex>
            <VStack align="stretch" gap={4}>
              {notes.map((note) => (
                <Box key={note.id} p={5} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Flex justify="space-between" align="flex-start" mb={3}>
                    <Box>
                      <HStack gap={2} mb={1}>
                        <Badge colorPalette={note.type === 'Behavioral' ? 'purple' : note.type === 'Academic' ? 'blue' : note.type === 'Administrative' ? 'orange' : 'gray'} variant="subtle">
                          {note.type}
                        </Badge>
                        {note.visibility && (
                          <Badge colorPalette={note.visibility === 'Internal Only' ? 'red' : 'green'} variant="outline">
                            {note.visibility === 'Internal Only' ? <Lock size={12} style={{marginRight: 4}}/> : <Users size={12} style={{marginRight: 4}}/>}
                            {note.visibility}
                          </Badge>
                        )}
                      </HStack>
                      <Text fontSize="sm" color="gray.500">{note.author}, {note.date}</Text>
                    </Box>
                    <HStack gap={2}>
                      <Button variant="ghost" size="sm" color="gray.500" px={2}><Edit size={14} /></Button>
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button variant="ghost" size="sm" color="gray.500" px={2}><MoreHorizontal size={14} /></Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'note', id: note.id, name: `Note from ${note.date}` })}>
                            <Trash2 size={16} /> Delete
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </HStack>
                  </Flex>
                  <Text color="gray.700" fontSize="sm" mb={3}>
                    {note.content}
                  </Text>
                  {note.tags && (
                    <HStack gap={2} mt={2}>
                      {note.tags.split(',').map((tag, index) => (
                        <Badge key={index} colorPalette="gray" variant="surface" size="sm">
                          #{tag.trim()}
                        </Badge>
                      ))}
                    </HStack>
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {activeTab === 'tasks' && (
          <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
            <Flex p={4} borderBottomWidth="1px" borderColor="gray.200" justify="space-between" align="center">
              <Box position="relative" w="full" maxW="400px">
                <Box position="absolute" left={3} top={2.5} color="gray.400">
                  <Search size={18} />
                </Box>
                <Input pl={10} placeholder="Search tasks..." borderRadius="md" size="sm" />
              </Box>
              <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }} onClick={handleTaskCreate}>
                <Plus size={16} style={{ marginRight: '8px' }} /> New Task
              </Button>
            </Flex>

            <Table.Root variant="line">
              <Table.Header>
                <Table.Row bg="gray.50">
                  <Table.ColumnHeader w="40px"></Table.ColumnHeader>
                  <Table.ColumnHeader>Task</Table.ColumnHeader>
                  <Table.ColumnHeader>Assignee</Table.ColumnHeader>
                  <Table.ColumnHeader>Type</Table.ColumnHeader>
                  <Table.ColumnHeader>Due Date</Table.ColumnHeader>
                  <Table.ColumnHeader>Priority</Table.ColumnHeader>
                  <Table.ColumnHeader w="40px" textAlign="right">Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tasks.map((task) => (
                  <Table.Row key={task.id} _hover={{ bg: "gray.50" }} opacity={task.status === "Completed" ? 0.6 : 1}>
                    <Table.Cell>
                      <Box 
                        cursor="pointer" 
                        color={task.status === "Completed" ? "green.500" : "gray.300"}
                        _hover={{ color: task.status === "Completed" ? "green.600" : "gray.400" }}
                        onClick={() => toggleTaskStatus(task.id)}
                      >
                        {task.status === "Completed" ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                      </Box>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontWeight="500" color={task.status === "Completed" ? "gray.500" : "gray.900"} textDecoration={task.status === "Completed" ? "line-through" : "none"}>
                        {task.title}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack>
                        <Avatar.Root size="xs">
                          <Avatar.Image src={task.assigneeAvatar} />
                          <Avatar.Fallback name={task.assignee} />
                        </Avatar.Root>
                        <Text fontSize="sm">{task.assignee}</Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">{task.type}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack color={task.overdue && task.status !== "Completed" ? "red.500" : "gray.600"} fontSize="sm">
                        <Clock size={14} />
                        <Text fontWeight={task.overdue && task.status !== "Completed" ? "600" : "400"}>{task.dueDate}</Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack color={task.priority === "High" ? "red.500" : task.priority === "Medium" ? "orange.500" : task.priority === "Low" ? "blue.500" : "gray.400"}>
                        <Flag size={14} fill={task.priority === "High" || task.priority === "Medium" || task.priority === "Low" ? "currentColor" : "none"} />
                        <Text fontSize="sm">{task.priority === "High" ? "H" : task.priority === "Medium" ? "M" : task.priority === "Low" ? "L" : "Unset"}</Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button variant="ghost" size="sm" color="gray.400" _hover={{ color: "gray.700" }}>
                            <MoreHorizontal size={18} />
                          </Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem value="edit" onClick={() => handleTaskEdit(task)}>
                            <Edit size={16} /> Edit Task
                          </MenuItem>
                          <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'task', id: task.id, name: task.title })}>
                            <Trash2 size={16} /> Delete Task
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {activeTab === 'relationships' && (
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
            <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
              <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif">Family & Relationships</Text>
              <HStack gap={4}>
                <Button bg="#007D79" color="white" size="sm" _hover={{ bg: "#00635f" }} onClick={() => handleOpenAddModal("Relationship")}>
                  <Plus size={16} /> Add Family Member
                </Button>
              </HStack>
            </Flex>

            {/* Combined Billing Shortcut */}
            <Box mb={6} p={4} bg="gray.50" borderRadius="md" borderWidth="1px" borderColor="gray.200">
              <Flex justify="space-between" align="center">
                <VStack align="start" gap={1}>
                  <Text fontWeight="semibold" color="gray.800">Family Billing</Text>
                  <Text fontSize="sm" color="gray.600">Family has 2 enrolled students. Total outstanding balance: $450.00</Text>
                </VStack>
                <Button variant="outline" size="sm" colorPalette="blue" onClick={() => toaster.create({ title: "Feature coming soon", type: "info" })}>
                  <FileText size={16} /> Create Family Invoice
                </Button>
              </Flex>
            </Box>

            {/* Family Card */}
            <Box mb={8} p={5} borderRadius="md" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <HStack mb={4} gap={3}>
                <Users size={20} color="#007D79" />
                <Text fontSize="lg" fontWeight="semibold" color="gray.800">Martinez Family</Text>
              </HStack>
              
              <Table.Root variant="line">
                <Table.Header>
                  <Table.Row bg="gray.50">
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Relationship</Table.ColumnHeader>
                    <Table.ColumnHeader>Contact Info</Table.ColumnHeader>
                    <Table.ColumnHeader>Emergency Contact</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="right"></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <HStack gap={3}>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name="Maria Martinez" />
                        </Avatar.Root>
                        <Text fontWeight="medium" color="blue.600" cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => navigate('/learners/2')}>Maria Martinez</Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell><Badge colorPalette="blue" variant="subtle">Mother</Badge></Table.Cell>
                    <Table.Cell>
                      <VStack align="start" gap={0}>
                        <Text fontSize="sm">maria.m@example.com</Text>
                        <Text fontSize="xs" color="gray.500">+212 600 123456</Text>
                      </VStack>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette="green" variant="subtle">Yes</Badge>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button variant="ghost" size="sm" color="gray.500"><MoreHorizontal size={16} /></Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem value="edit"><Edit size={16} /> Edit</MenuItem>
                          <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'relationship', id: 1, name: 'Maria Martinez' })}>
                            <Trash2 size={16} /> Remove
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <HStack gap={3}>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name="Carlos Martinez" />
                        </Avatar.Root>
                        <Text fontWeight="medium" color="blue.600" cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => navigate('/learners/3')}>Carlos Martinez</Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell><Badge colorPalette="blue" variant="subtle">Father</Badge></Table.Cell>
                    <Table.Cell>
                      <VStack align="start" gap={0}>
                        <Text fontSize="sm">carlos.m@example.com</Text>
                        <Text fontSize="xs" color="gray.500">+212 600 123457</Text>
                      </VStack>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette="green" variant="subtle">Yes</Badge>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button variant="ghost" size="sm" color="gray.500"><MoreHorizontal size={16} /></Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem value="edit"><Edit size={16} /> Edit</MenuItem>
                          <MenuItem value="delete" color="red.500" onClick={() => setItemToDelete({ type: 'relationship', id: 2, name: 'Carlos Martinez' })}>
                            <Trash2 size={16} /> Remove
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>

            {/* Smart Suggestions */}
            <Box p={4} bg="#E6F4F1" borderRadius="md" borderLeftWidth="3px" borderLeftColor="#007D79">
              <HStack mb={3}>
                <Users size={18} color="#007D79" />
                <Text fontWeight="semibold" color="gray.800">Suggested connections</Text>
              </HStack>
              <VStack align="stretch" gap={3}>
                <Flex justify="space-between" align="center" bg="white" p={3} borderRadius="md" shadow="sm">
                  <HStack>
                    <Avatar.Root size="sm"><Avatar.Fallback name="Omar Martinez" /></Avatar.Root>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="medium" fontSize="sm">Omar Martinez shares last name — could be a sibling?</Text>
                      <Text fontSize="xs" color="gray.500">Learner</Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Button size="xs" variant="outline" colorPalette="blue">Link</Button>
                    <Button size="xs" variant="ghost" color="gray.500">Dismiss</Button>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center" bg="white" p={3} borderRadius="md" shadow="sm">
                  <HStack>
                    <Avatar.Root size="sm"><Avatar.Fallback name="Sofia Martinez" /></Avatar.Root>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="medium" fontSize="sm">Sofia Martinez shares emergency contact — could be a sibling?</Text>
                      <Text fontSize="xs" color="gray.500">Learner</Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Button size="xs" variant="outline" colorPalette="blue">Link</Button>
                    <Button size="xs" variant="ghost" color="gray.500">Dismiss</Button>
                  </HStack>
                </Flex>
              </VStack>
            </Box>
          </Box>
        )}
      </Box>

      {/* Assign Class Modal */}
      <DialogRoot open={isAssignClassOpen} onOpenChange={(e) => setIsAssignClassOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Class</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Subject</Text>
                <Input value={assignClassData.subject} onChange={(e) => setAssignClassData({...assignClassData, subject: e.target.value})} placeholder="e.g. English" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Class Name</Text>
                <Input value={assignClassData.className} onChange={(e) => setAssignClassData({...assignClassData, className: e.target.value})} placeholder="e.g. English B2 - Grammar" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Teacher</Text>
                <Input value={assignClassData.teacher} onChange={(e) => setAssignClassData({...assignClassData, teacher: e.target.value})} placeholder="e.g. Zakaria Chamakh" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Subscription / Bundle</Text>
                <NativeSelectRoot>
                  <NativeSelectField value={assignClassData.subscription} onChange={(e) => setAssignClassData({...assignClassData, subscription: e.currentTarget.value})} items={["English B2 (Monthly)", "IELTS Preparation", "Math Tutoring", "One-off Class"]} />
                </NativeSelectRoot>
              </Box>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Date</Text>
                  <Input type="date" value={assignClassData.date} onChange={(e) => setAssignClassData({...assignClassData, date: e.target.value})} />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Time</Text>
                  <Input type="time" value={assignClassData.time} onChange={(e) => setAssignClassData({...assignClassData, time: e.target.value})} />
                </Box>
              </Grid>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Duration</Text>
                <Input value={assignClassData.duration} onChange={(e) => setAssignClassData({...assignClassData, duration: e.target.value})} placeholder="e.g. 60 mins" />
              </Box>
              {conflictAlert.isOpen && (
                <Box p={3} bg="red.50" color="red.700" borderRadius="md" borderWidth="1px" borderColor="red.200">
                  <Text fontSize="sm" mb={2}>{conflictAlert.message}</Text>
                  {conflictAlert.duplicateId && (
                    <Button size="sm" colorPalette="red" onClick={handleMergeDuplicate}>Merge Duplicate</Button>
                  )}
                </Box>
              )}
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleAssignClass}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Add Grade Modal */}
      <DialogRoot open={isAddGradeOpen} onOpenChange={(e) => setIsAddGradeOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Grade</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Subject</Text>
                  <Input value={addGradeData.subject} onChange={(e) => setAddGradeData({...addGradeData, subject: e.target.value})} placeholder="e.g. English" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Type</Text>
                  <NativeSelectRoot>
                    <NativeSelectField value={addGradeData.type} onChange={(e) => setAddGradeData({...addGradeData, type: e.currentTarget.value})} items={["Exam", "Quiz", "Homework", "Project", "Participation"]} />
                  </NativeSelectRoot>
                </Box>
              </Grid>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Assignment Name</Text>
                <Input value={addGradeData.assignment} onChange={(e) => setAddGradeData({...addGradeData, assignment: e.target.value})} placeholder="e.g. Midterm Exam" />
              </Box>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Date</Text>
                  <Input type="date" value={addGradeData.date} onChange={(e) => setAddGradeData({...addGradeData, date: e.target.value})} />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Weight (%)</Text>
                  <Input type="number" value={addGradeData.weight} onChange={(e) => setAddGradeData({...addGradeData, weight: e.target.value})} placeholder="e.g. 20" />
                </Box>
              </Grid>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Score</Text>
                  <Input value={addGradeData.score} onChange={(e) => setAddGradeData({...addGradeData, score: e.target.value})} placeholder="e.g. 85/100" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Grade</Text>
                  <Input value={addGradeData.grade} onChange={(e) => setAddGradeData({...addGradeData, grade: e.target.value})} placeholder="e.g. B+" />
                </Box>
              </Grid>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Feedback</Text>
                <Textarea value={addGradeData.feedback} onChange={(e) => setAddGradeData({...addGradeData, feedback: e.target.value})} placeholder="Enter feedback..." rows={3} />
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleAddGrade}>Save Grade</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Add Note Modal */}
      <DialogRoot open={isAddNoteOpen} onOpenChange={(e) => setIsAddNoteOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Type</Text>
                  <NativeSelectRoot>
                    <NativeSelectField value={addNoteData.type} onChange={(e) => setAddNoteData({...addNoteData, type: e.currentTarget.value})} items={["General", "Behavioral", "Academic", "Administrative"]} />
                  </NativeSelectRoot>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Visibility</Text>
                  <NativeSelectRoot>
                    <NativeSelectField value={addNoteData.visibility} onChange={(e) => setAddNoteData({...addNoteData, visibility: e.currentTarget.value})} items={["Internal Only", "Share with Learner", "Share with Parents", "Public"]} />
                  </NativeSelectRoot>
                </Box>
              </Grid>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Tags (comma separated)</Text>
                <Input value={addNoteData.tags} onChange={(e) => setAddNoteData({...addNoteData, tags: e.target.value})} placeholder="e.g. urgent, follow-up, medical" />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Content</Text>
                <Textarea value={addNoteData.content} onChange={(e) => setAddNoteData({...addNoteData, content: e.target.value})} placeholder="Enter note content..." rows={5} />
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleAddNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Add Attendance Modal */}
      <DialogRoot open={isAddAttendanceOpen} onOpenChange={(e) => setIsAddAttendanceOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Attendance</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Class Name</Text>
                <NativeSelectRoot>
                  <NativeSelectField value={addAttendanceData.className} onChange={(e) => setAddAttendanceData({...addAttendanceData, className: e.currentTarget.value})} items={scheduleClasses.map(c => c.className)} placeholder="Select a class" />
                </NativeSelectRoot>
              </Box>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Date</Text>
                  <Input type="date" value={addAttendanceData.date} onChange={(e) => setAddAttendanceData({...addAttendanceData, date: e.target.value})} />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Time</Text>
                  <Input type="time" value={addAttendanceData.time} onChange={(e) => setAddAttendanceData({...addAttendanceData, time: e.target.value})} />
                </Box>
              </Grid>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Duration</Text>
                  <Input value={addAttendanceData.duration} onChange={(e) => setAddAttendanceData({...addAttendanceData, duration: e.target.value})} placeholder="e.g. 60 mins" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Status</Text>
                  <NativeSelectRoot>
                    <NativeSelectField value={addAttendanceData.status} onChange={(e) => setAddAttendanceData({...addAttendanceData, status: e.currentTarget.value})} items={["Present", "Absent", "Late", "Excused"]} />
                  </NativeSelectRoot>
                </Box>
              </Grid>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Notes / Reason</Text>
                <Textarea value={addAttendanceData.notes} onChange={(e) => setAddAttendanceData({...addAttendanceData, notes: e.target.value})} placeholder="Optional notes or reason for absence..." rows={3} />
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleAddAttendance}>Save Attendance</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Generic Add Modal */}
      <DialogRoot open={isAddModalOpen} onOpenChange={(e) => setIsAddModalOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New {addModalType}</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Title / Description</Text>
                <Input placeholder={`Enter ${addModalType.toLowerCase()} details...`} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Date</Text>
                <Input type="date" />
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsAddModalOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Item Delete Confirmation Dialog */}
      <DialogRoot open={!!itemToDelete} onOpenChange={(e) => { if (!e.open) setItemToDelete(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {itemToDelete?.type}</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Text>Are you sure you want to delete <strong>{itemToDelete?.name}</strong>? This action cannot be undone.</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={handleItemDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Delete Confirmation Dialog */}
      <DialogRoot open={isDeleteDialogOpen} onOpenChange={(e) => setIsDeleteDialogOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Text>Are you sure you want to delete <strong>{learner.name}</strong>? This action cannot be undone and will remove all associated records including attendance, grades, and billing history.</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={handleDelete}>Delete Learner</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Add Relationship Drawer */}
      <DrawerRoot open={isAddRelationshipOpen} onOpenChange={(e) => setIsAddRelationshipOpen(e.open)} size="md">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Family Member</DrawerTitle>
            <DrawerCloseTrigger />
          </DrawerHeader>
          <DrawerBody>
            {addRelStep === 1 && (
              <VStack align="stretch" gap={6}>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Search existing contacts</Text>
                  <Input 
                    placeholder="Search by name, email, or phone..." 
                    value={addRelSearchQuery}
                    onChange={(e) => setAddRelSearchQuery(e.target.value)}
                  />
                </Box>
                
                {addRelSearchQuery.length > 0 && (
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={2} color="gray.600">Results</Text>
                    {addRelSearchQuery.toLowerCase().includes("maria") ? (
                      <Flex justify="space-between" align="center" p={3} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="gray.50">
                        <HStack>
                          <Avatar.Root size="sm"><Avatar.Fallback name="Maria Martinez" /></Avatar.Root>
                          <VStack align="start" gap={0}>
                            <Text fontWeight="medium" fontSize="sm">Maria Martinez</Text>
                            <Text fontSize="xs" color="gray.500">Parent (already in system)</Text>
                          </VStack>
                        </HStack>
                        <Button size="sm" colorPalette="blue" onClick={() => {
                          setAddRelSelectedContact({ name: "Maria Martinez", type: "Parent" });
                          setAddRelStep(2);
                        }}>Link</Button>
                      </Flex>
                    ) : (
                      <VStack align="center" py={6} bg="gray.50" borderRadius="md" borderWidth="1px" borderColor="gray.200" borderStyle="dashed">
                        <Text color="gray.500" fontSize="sm">No match found</Text>
                        <Button mt={2} size="sm" bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setAddRelStep(3)}>
                          Create New Contact
                        </Button>
                      </VStack>
                    )}
                  </Box>
                )}
              </VStack>
            )}

            {addRelStep === 2 && addRelSelectedContact && (
              <VStack align="stretch" gap={6}>
                <Box p={4} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.100">
                  <Text fontSize="sm" color="blue.800">Linking <strong>{addRelSelectedContact.name}</strong> to Sarah Martinez.</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Confirm Relationship Type</Text>
                  <NativeSelectRoot>
                    <NativeSelectField items={["Mother", "Father", "Guardian", "Sibling", "Other"]} defaultValue="Mother" />
                  </NativeSelectRoot>
                </Box>
              </VStack>
            )}

            {addRelStep === 3 && (
              <VStack align="stretch" gap={6}>
                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">First Name</Text>
                    <Input 
                      placeholder="Enter first name" 
                      value={addRelNewContact.firstName}
                      onChange={(e) => setAddRelNewContact({...addRelNewContact, firstName: e.target.value})}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Last Name</Text>
                    <Input 
                      placeholder="Enter last name" 
                      value={addRelNewContact.lastName}
                      onChange={(e) => setAddRelNewContact({...addRelNewContact, lastName: e.target.value})}
                    />
                  </Box>
                </Grid>
                
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Relationship to student</Text>
                  <NativeSelectRoot>
                    <NativeSelectField 
                      items={["Mother", "Father", "Guardian", "Sibling", "Other"]} 
                      placeholder="Select relationship"
                      value={addRelNewContact.relationship}
                      onChange={(e) => setAddRelNewContact({...addRelNewContact, relationship: e.currentTarget.value})}
                    />
                  </NativeSelectRoot>
                </Box>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Email Address</Text>
                    <Input 
                      type="email" 
                      placeholder="Enter email" 
                      value={addRelNewContact.email}
                      onChange={(e) => setAddRelNewContact({...addRelNewContact, email: e.target.value})}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Phone Number</Text>
                    <Input 
                      type="tel" 
                      placeholder="Enter phone" 
                      value={addRelNewContact.phone}
                      onChange={(e) => setAddRelNewContact({...addRelNewContact, phone: e.target.value})}
                    />
                  </Box>
                </Grid>

                <Box pt={4} borderTopWidth="1px" borderColor="gray.200">
                  <Text fontSize="sm" fontWeight="600" mb={3} color="gray.800">Also create as:</Text>
                  <VStack align="start" gap={3}>
                    <Checkbox 
                      checked={addRelNewContact.createAsParent}
                      onCheckedChange={(e) => setAddRelNewContact({...addRelNewContact, createAsParent: !!e.checked})}
                    >
                      Parent account
                    </Checkbox>
                    {addRelNewContact.createAsParent && (
                      <Box pl={6} w="full">
                        <Flex justify="space-between" align="center" p={3} bg="gray.50" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                          <Text fontSize="sm" color="gray.700">Send portal invitation?</Text>
                          <Switch 
                            checked={addRelNewContact.sendInvite}
                            onCheckedChange={(e) => setAddRelNewContact({...addRelNewContact, sendInvite: !!e.checked})}
                          />
                        </Flex>
                      </Box>
                    )}
                    <Checkbox 
                      checked={addRelNewContact.createAsStudent}
                      onCheckedChange={(e) => setAddRelNewContact({...addRelNewContact, createAsStudent: !!e.checked})}
                    >
                      Student account
                    </Checkbox>
                    <Checkbox 
                      checked={addRelNewContact.createAsContact}
                      onCheckedChange={(e) => setAddRelNewContact({...addRelNewContact, createAsContact: !!e.checked})}
                    >
                      Contact only
                    </Checkbox>
                  </VStack>
                </Box>
              </VStack>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {
              if (addRelStep > 1) {
                setAddRelStep(1);
                setAddRelSearchQuery("");
              } else {
                setIsAddRelationshipOpen(false);
              }
            }}>
              {addRelStep > 1 ? "Back" : "Cancel"}
            </Button>
            {addRelStep === 1 && (
              <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setAddRelStep(3)}>Skip & Create New</Button>
            )}
            {addRelStep === 2 && (
              <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => {
                setIsAddRelationshipOpen(false);
                toaster.create({ title: "Relationship linked successfully", type: "success" });
              }}>Done</Button>
            )}
            {addRelStep === 3 && (
              <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => {
                setIsAddRelationshipOpen(false);
                toaster.create({ title: "New contact created and linked", type: "success" });
              }}>Create Contact</Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>

      {/* Edit Learner Drawer */}
      <DrawerRoot open={isEditLearnerOpen} onOpenChange={(e) => setIsEditLearnerOpen(e.open)} size="md">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit {learner.name}</DrawerTitle>
            <DrawerCloseTrigger />
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" gap={8}>
              {/* Basic details */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800" fontFamily="serif" mb={4}>Basic details</Text>
                <VStack align="stretch" gap={4}>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">First name *</Text>
                      <Input defaultValue={learner.name.split(" ")[0]} />
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Last name *</Text>
                      <Input defaultValue={learner.name.split(" ")[1] || ""} />
                    </Box>
                  </Grid>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Birth surname (optional)</Text>
                      <Input />
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Title (optional)</Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Mr", "Mrs", "Ms", "Miss", "Dr"]} placeholder="Select title" />
                      </NativeSelectRoot>
                    </Box>
                  </Grid>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Sex at birth</Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Female", "Male", "Other"]} defaultValue="Female" />
                      </NativeSelectRoot>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Gender (optional)</Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Female", "Male", "Other"]} defaultValue="Female" />
                      </NativeSelectRoot>
                    </Box>
                  </Grid>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Date of birth (optional)</Text>
                      <Input type="date" defaultValue="2000-02-15" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Comments (optional)</Text>
                      <Textarea rows={3} />
                    </Box>
                  </Grid>
                </VStack>
              </Box>

              {/* Contact Details */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800" fontFamily="serif" mb={4}>Contact Details</Text>
                <VStack align="stretch" gap={4}>
                  <Grid templateColumns="1fr 2fr" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Phone type</Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Home", "Mobile", "Work"]} defaultValue="Home" />
                      </NativeSelectRoot>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Phone number</Text>
                      <Input defaultValue={learner.phone} />
                    </Box>
                  </Grid>
                  <Button variant="outline" size="sm" alignSelf="flex-start" color="#007D79" borderColor="#007D79">
                    Add another phone number
                  </Button>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Email (optional)</Text>
                    <Input type="email" defaultValue={learner.email} />
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsEditLearnerOpen(false)}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>

      {/* Task Modal */}
      <DialogRoot open={isTaskModalOpen} onOpenChange={(e) => setIsTaskModalOpen(e.open)} size="lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit task" : "New task"}</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={5}>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">
                  <Text as="span" color="red.500">*</Text> Task name
                </Text>
                <Input value={taskFormData.title} onChange={(e) => setTaskFormData({...taskFormData, title: e.target.value})} placeholder="Task subject" />
              </Box>
              
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">
                  <Text as="span" color="red.500">*</Text> Assign to
                </Text>
                <Box position="relative">
                  <select
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '0 12px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: 'white',
                      color: taskFormData.assignee ? '#1A202C' : '#A0AEC0',
                      appearance: 'none',
                      outline: 'none'
                    }}
                    value={taskFormData.assignee}
                    onChange={(e: any) => setTaskFormData({...taskFormData, assignee: e.target.value})}
                  >
                    <option value="" disabled>Select user</option>
                    <option value="Zakaria C.">Zakaria C.</option>
                    <option value="Sarah M.">Sarah M.</option>
                  </select>
                  <Box position="absolute" right={3} top={2.5} color="gray.400" pointerEvents="none">
                    <ChevronDown size={16} />
                  </Box>
                </Box>
              </Box>

              <Flex gap={4}>
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Due date</Text>
                  <Input type="date" value={taskFormData.dueDate} onChange={(e) => setTaskFormData({...taskFormData, dueDate: e.target.value})} color={taskFormData.dueDate ? "gray.900" : "gray.500"} />
                </Box>
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Type</Text>
                  <Box position="relative">
                    <select
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: 'white',
                        color: taskFormData.type ? '#1A202C' : '#A0AEC0',
                        appearance: 'none',
                        outline: 'none'
                      }}
                      value={taskFormData.type}
                      onChange={(e: any) => setTaskFormData({...taskFormData, type: e.target.value})}
                    >
                      <option value="" disabled>Select type</option>
                      <option value="General">General</option>
                      <option value="Admin">Admin</option>
                      <option value="Invoice">Invoice</option>
                      <option value="Placement">Placement</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Material">Material</option>
                    </select>
                    <Box position="absolute" right={3} top={2.5} color="gray.400" pointerEvents="none">
                      <ChevronDown size={16} />
                    </Box>
                  </Box>
                </Box>
              </Flex>

              <Box>
                <Text fontSize="sm" fontWeight="500" mb={2} color="gray.700">Priority</Text>
                <HStack gap={4}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    color={taskFormData.priority === "High" ? "red.600" : "gray.600"}
                    bg={taskFormData.priority === "High" ? "red.50" : "transparent"}
                    onClick={() => setTaskFormData({...taskFormData, priority: "High"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-red-500)" fill={taskFormData.priority === "High" ? "var(--chakra-colors-red-500)" : "none"} style={{ marginRight: '8px' }} />
                    High
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    color={taskFormData.priority === "Medium" ? "orange.600" : "gray.600"}
                    bg={taskFormData.priority === "Medium" ? "orange.50" : "transparent"}
                    onClick={() => setTaskFormData({...taskFormData, priority: "Medium"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-orange-500)" fill={taskFormData.priority === "Medium" ? "var(--chakra-colors-orange-500)" : "none"} style={{ marginRight: '8px' }} />
                    Medium
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    color={taskFormData.priority === "Low" ? "blue.600" : "gray.600"}
                    bg={taskFormData.priority === "Low" ? "blue.50" : "transparent"}
                    onClick={() => setTaskFormData({...taskFormData, priority: "Low"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-blue-500)" fill={taskFormData.priority === "Low" ? "var(--chakra-colors-blue-500)" : "none"} style={{ marginRight: '8px' }} />
                    Low
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    color={taskFormData.priority === "Unset" ? "gray.800" : "gray.500"}
                    bg={taskFormData.priority === "Unset" ? "gray.100" : "transparent"}
                    onClick={() => setTaskFormData({...taskFormData, priority: "Unset"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-gray-400)" fill={taskFormData.priority === "Unset" ? "var(--chakra-colors-gray-400)" : "none"} style={{ marginRight: '8px' }} />
                    Unset
                  </Button>
                </HStack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Comments</Text>
                <Input 
                  value={taskFormData.comments} 
                  onChange={(e) => setTaskFormData({...taskFormData, comments: e.target.value})} 
                  placeholder="Write a note" 
                />
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleTaskSave}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Learner Card Modal */}
      <DialogRoot open={isLearnerCardOpen} onOpenChange={(e) => setIsLearnerCardOpen(e.open)} size="lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Learner Card Preview</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Flex direction="column" gap={6} align="center" py={4} bg="gray.50" borderRadius="md">
              {/* Front of Card */}
              <Box w="350px" h="220px" bg="white" borderRadius="xl" shadow="md" overflow="hidden" position="relative" border="1px solid" borderColor="gray.200">
                <Box h="60px" bg="#007D79" w="full" position="absolute" top={0} left={0} />
                <Flex direction="column" h="full" pt="30px" px={6} pb={4} position="relative" zIndex={1}>
                  <Flex justify="space-between" align="flex-start" w="full">
                    <Avatar.Root size="xl" borderWidth="4px" borderColor="white" shadow="sm">
                      <Avatar.Image src={learner.avatar} />
                      <Avatar.Fallback name={learner.name} />
                    </Avatar.Root>
                    <Box textAlign="right" color="white" mt={-2}>
                      <Text fontWeight="bold" fontSize="lg">LANGUAGE</Text>
                      <Text fontSize="xs" opacity={0.9}>ACADEMY</Text>
                    </Box>
                  </Flex>
                  <Box mt={4}>
                    <Text fontSize="xl" fontWeight="bold" color="gray.900">{learner.name}</Text>
                    <Text fontSize="sm" color="#007D79" fontWeight="600" mb={2}>Learner ID: {learner.id.toString().padStart(6, '0')}</Text>
                    <Grid templateColumns="1fr 1fr" gap={2} mt={2}>
                      <Box>
                        <Text fontSize="xs" color="gray.500" textTransform="uppercase">Course</Text>
                        <Text fontSize="sm" fontWeight="500">{learner.course}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="gray.500" textTransform="uppercase">Valid Until</Text>
                        <Text fontSize="sm" fontWeight="500">Dec 2026</Text>
                      </Box>
                    </Grid>
                  </Box>
                </Flex>
              </Box>

              {/* Back of Card */}
              <Box w="350px" h="220px" bg="white" borderRadius="xl" shadow="md" overflow="hidden" border="1px solid" borderColor="gray.200" p={6}>
                <VStack align="stretch" h="full" justify="space-between">
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.900" mb={2}>Emergency Contact</Text>
                    <Text fontSize="sm" color="gray.700">Maria Martinez (Parent)</Text>
                    <Text fontSize="sm" color="gray.700">+212 600 987654</Text>
                  </Box>
                  <Box>
                    <Box h="40px" w="full" bg="gray.100" borderRadius="sm" display="flex" alignItems="center" justifyContent="center" mb={2}>
                      <Text fontSize="xs" color="gray.400" letterSpacing="widest">||| || ||| |||| | ||| ||</Text>
                    </Box>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                      If found, please return to Language Academy.<br/>
                      123 Education St, City, Country
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }}>
              <Download size={16} style={{ marginRight: '8px' }} /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
      {/* Receipt Modal */}
      <DialogRoot open={isReceiptModalOpen} onOpenChange={(e) => setIsReceiptModalOpen(e.open)} size="lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receipt Preview</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Box bg="gray.50" p={8} borderRadius="md" border="1px solid" borderColor="gray.200">
              <Flex justify="space-between" align="flex-start" mb={8}>
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color="#007D79" mb={1}>LANGUAGE ACADEMY</Text>
                  <Text color="gray.500" fontSize="sm">123 Education St, City, Country</Text>
                  <Text color="gray.500" fontSize="sm">contact@languageacademy.com</Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="xl" fontWeight="bold" color="gray.900" mb={1}>RECEIPT</Text>
                  <Text color="gray.500" fontSize="sm">Date: Mar 16, 2026</Text>
                  <Text color="gray.500" fontSize="sm">Receipt #: REC-2026-042</Text>
                </Box>
              </Flex>

              <Box mb={8}>
                <Text fontWeight="bold" color="gray.900" mb={2}>Billed To:</Text>
                <Text color="gray.700">{learner.parent}</Text>
                <Text color="gray.700">Parent of {learner.name}</Text>
                <Text color="gray.700">{learner.email}</Text>
              </Box>

              <Table.Root variant="line" mb={8}>
                <Table.Header>
                  <Table.Row bg="gray.100">
                    <Table.ColumnHeader>Description</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>English B2 - Monthly Subscription (Mar 2026)</Table.Cell>
                    <Table.Cell textAlign="right">£130.00</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>

              <Flex justify="flex-end">
                <Box w="200px">
                  <Flex justify="space-between" mb={2}>
                    <Text color="gray.600">Subtotal</Text>
                    <Text color="gray.900">£130.00</Text>
                  </Flex>
                  <Flex justify="space-between" mb={2}>
                    <Text color="gray.600">Tax (0%)</Text>
                    <Text color="gray.900">£0.00</Text>
                  </Flex>
                  <Flex justify="space-between" pt={2} borderTopWidth="2px" borderColor="gray.200">
                    <Text fontWeight="bold" color="gray.900">Total Paid</Text>
                    <Text fontWeight="bold" color="#007D79">£130.00</Text>
                  </Flex>
                </Box>
              </Flex>

              <Box mt={12} pt={6} borderTopWidth="1px" borderColor="gray.200" textAlign="center">
                <Text color="gray.500" fontSize="sm">Thank you for your payment!</Text>
              </Box>
            </Box>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }}>
              <Download size={16} style={{ marginRight: '8px' }} /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
}

