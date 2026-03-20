import { useState } from "react";
import { Box, Flex, Text, VStack, Button, Input, Grid, Badge, HStack, IconButton, Table, Avatar } from "@chakra-ui/react";
import { ChevronRight, Plus, Edit2, Trash2, Search, Upload, Mail, CreditCard, FileText, Link as LinkIcon, Key, Check, IdCard, Printer, Download, Info, Banknote, List, MoreHorizontal, X } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { Field } from "../components/ui/field";
import { Checkbox } from "../components/ui/checkbox";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, DialogCloseTrigger } from "../components/ui/dialog";

const sidebarItems = [
  "General", "Branding", "Portal settings", "Branches", "Prospects", "Glossary",
  "Roles", "Users", "Availability", 
  "Access groups", "Academic settings", "Assessments and materials", 
  "Online booking", "SMS and email templates", "Learner settings", 
  "Invoice and payment", "Labels", "Letter templates", "Lesson templates", 
  "Questionnaires", "Integrations", "API Access"
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("General");
  const [brandColor, setBrandColor] = useState("#007D79");
  const [brandLogo, setBrandLogo] = useState<string | null>(null);

  // Demo Data State
  const [roles, setRoles] = useState([
    { id: 1, name: "Administrator", description: "Full access to all system settings and data.", usersCount: 3 },
    { id: 2, name: "Teacher", description: "Can manage their own schedule, classes, and learners.", usersCount: 24 },
    { id: 3, name: "Staff", description: "Can manage bookings and learner records, no access to billing.", usersCount: 8 },
  ]);
  const [editingRole, setEditingRole] = useState<any>(null);

  const [users, setUsers] = useState([
    { id: 1, name: "Sarah Jenkins", email: "sarah@eduflow.com", role: "Administrator", status: "Active" },
    { id: 2, name: "Michael Chen", email: "michael@eduflow.com", role: "Teacher", status: "Active" },
    { id: 3, name: "Emma Watson", email: "emma@eduflow.com", role: "Staff", status: "Pending" },
  ]);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [locations, setLocations] = useState([
    { 
      id: 1, 
      name: "Main Campus", 
      address: "123 Education Blvd, Cityville", 
      isPrimary: true,
      classrooms: [
        { id: 1, name: "Room 101", capacity: 30, resources: "Projector, Whiteboard", status: "Active" },
        { id: 2, name: "Room 102", capacity: 25, resources: "Smartboard", status: "Active" },
        { id: 3, name: "Science Lab", capacity: 20, resources: "Lab Equipment, Projector", status: "Maintenance" }
      ]
    },
    { 
      id: 2, 
      name: "Downtown Annex", 
      address: "45 Learning Way, Downtown", 
      isPrimary: false,
      classrooms: [
        { id: 4, name: "Room A", capacity: 15, resources: "Whiteboard", status: "Active" }
      ]
    },
  ]);
  const [editingLocation, setEditingLocation] = useState<any>(null);

  const [clinicianAvailability, setClinicianAvailability] = useState([
    {
      id: 1,
      clinicianId: 2,
      name: "Michael Chen",
      color: "blue",
      schedule: {
        Monday: [{ start: "09:00", end: "18:00", room: "Room 101" }],
        Tuesday: [{ start: "09:00", end: "18:00", room: "Room 101" }],
        Wednesday: [{ start: "09:00", end: "18:00", room: "Room 101" }],
        Thursday: [],
        Friday: [{ start: "09:00", end: "18:00", room: "Room 101" }],
        Saturday: [],
        Sunday: []
      }
    }
  ]);
  const [editingClinician, setEditingClinician] = useState<any>(null);

  const [accessGroups, setAccessGroups] = useState([
    { id: 1, name: "Public", description: "Any member of this group can see all records", members: 3, color: "gray" },
    { id: 2, name: "Michael Chen", description: "Default group for Michael Chen", members: 1, color: "blue" },
    { id: 3, name: "Sarah Jenkins", description: "Default group for Sarah Jenkins", members: 1, color: "green" },
  ]);
  const [editingAccessGroup, setEditingAccessGroup] = useState<any>(null);

  const [templates, setTemplates] = useState([
    { id: 1, name: "Appointment confirmation email", type: "System", channel: "Email", status: "Active", category: "Confirmations" },
    { id: 2, name: "Appointment confirmation WhatsApp", type: "System", channel: "WhatsApp", status: "Active", category: "Confirmations" },
    { id: 3, name: "Appointment reminder email", type: "System", channel: "Email", status: "Active", category: "Reminders" },
    { id: 4, name: "Appointment reminder WhatsApp", type: "System", channel: "WhatsApp", status: "Inactive", category: "Reminders" },
    { id: 5, name: "Appointment cancellation email", type: "System", channel: "Email", status: "Active", category: "Cancellations" },
    { id: 6, name: "Invoice payment reminder", type: "System", channel: "Email", status: "Inactive", category: "Invoicing" },
  ]);

  const [academicTerms, setAcademicTerms] = useState([
    { id: 1, name: "Fall 2026", startDate: "2026-09-01", endDate: "2026-12-15", status: "Active" },
    { id: 2, name: "Spring 2027", startDate: "2027-01-10", endDate: "2027-05-20", status: "Upcoming" },
  ]);

  const [learnerUpgrades, setLearnerUpgrades] = useState([
    { id: 1, name: "Alice Smith", currentClass: "Grade 10", nextClass: "Grade 11", status: "Pending", selected: true },
    { id: 2, name: "Bob Johnson", currentClass: "Grade 10", nextClass: "Grade 11", status: "Pending", selected: true },
    { id: 3, name: "Charlie Brown", currentClass: "Grade 10", nextClass: "Grade 10", status: "Excluded", selected: false },
  ]);

  const [labels, setLabels] = useState([
    { id: 1, name: "Discharged", color: "#E34433" },
    { id: 2, name: "Waiting List", color: "#F5D027" },
    { id: 3, name: "Insured", color: "#64A853" },
    { id: 4, name: "Self-pay", color: "#8B5CF6" },
    { id: 5, name: "class_1", color: "#C0CA33" },
    { id: 6, name: "class_2", color: "#D81B60" },
  ]);

  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [editingLabel, setEditingLabel] = useState<any>(null);

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Website Integration", prefix: "pk_live_8f92...", created: "Oct 12, 2025", lastUsed: "Today" }
  ]);

  const [itemToDelete, setItemToDelete] = useState<{ type: string, id: number, name: string } | null>(null);

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    switch (itemToDelete.type) {
      case 'role':
        setRoles(roles.filter(r => r.id !== itemToDelete.id));
        break;
      case 'user':
        setUsers(users.filter(u => u.id !== itemToDelete.id));
        break;
      case 'location':
        setLocations(locations.filter(l => l.id !== itemToDelete.id));
        break;
      case 'label':
        setLabels(labels.filter(l => l.id !== itemToDelete.id));
        break;
      case 'api_key':
        setApiKeys(apiKeys.filter(k => k.id !== itemToDelete.id));
        break;
      // Add more cases as needed
    }
    
    setItemToDelete(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Manage your school's core details, localization preferences, and basic configurations here.
              </Text>
            </Box>
            {/* Card 1 */}
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1.5fr" gap={12}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={3}>School details</Text>
                  <Text fontSize="sm" color="gray.600">
                    Enter your school's details. This information will appear on reports, emails and receipts.
                  </Text>
                </Box>
                <VStack align="stretch" gap={6}>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Academy ID</Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      This is the unique identifier for your academy. You may need to use it as a reference when contacting EduFlow about your account. The academy ID can't be changed.
                    </Text>
                    <Text fontSize="sm" fontFamily="mono" color="gray.800">67474a2b442042e4f3907846</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>School name *</Text>
                    <Input defaultValue="EduFlow Staging" borderRadius="md" />
                  </Box>
                </VStack>
              </Grid>
            </Box>

            {/* Card 2 */}
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1.5fr" gap={12}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={3}>Define the name and email address learners will see</Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    Enter a sender name for emails to help learners and contacts to recognise the sender.
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={6}>
                    Outgoing email addresses are what your learners will see when they receive communications.
                  </Text>
                  
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={3}>How sender name will appear for learners</Text>
                  <Flex align="center" gap={3} p={3} bg="gray.50" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                    <Box w={8} h={8} borderRadius="full" bg="blue.100" color="blue.600" display="flex" alignItems="center" justifyContent="center" fontWeight="bold">
                      E
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="bold">EduFlow Staging</Text>
                      <Text fontSize="xs" color="gray.500">example@email.com</Text>
                    </Box>
                  </Flex>
                  <Flex justify="space-between" px={12} mt={2}>
                    <Text fontSize="xs" color="gray.400">Sender name</Text>
                    <Text fontSize="xs" color="gray.400">Email address</Text>
                  </Flex>
                </Box>
                <VStack align="stretch" gap={6}>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Email sender name</Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>Choose how your sender name will display to learners and contacts</Text>
                    <Input defaultValue="EduFlow Staging" borderRadius="md" />
                  </Box>
                  
                  <Box pt={4}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Define the outgoing email addresses</Text>
                    <Text fontSize="sm" color="gray.600" mb={4}>
                      You must have an email entered for the General email. If you leave other email boxes blank, then all emails will default to the General email.
                    </Text>
                    
                    <Grid templateColumns="1fr 1fr" gap={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>General email</Text>
                        <Input defaultValue="chris@piranhadesigns.com" borderRadius="md" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Invoice email</Text>
                        <Input borderRadius="md" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Lesson email</Text>
                        <Input borderRadius="md" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Material email</Text>
                        <Input borderRadius="md" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Letter email</Text>
                        <Input borderRadius="md" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Assessment email</Text>
                        <Input borderRadius="md" />
                      </Box>
                    </Grid>
                  </Box>
                </VStack>
              </Grid>
            </Box>
            {/* Card 3: Localization */}
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1.5fr" gap={12}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={3}>Localization</Text>
                  <Text fontSize="sm" color="gray.600">
                    Choose your local currency and date format. These will affect how information is displayed on screen and printed.
                  </Text>
                </Box>
                <VStack align="stretch" gap={6}>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Date format</Text>
                    <NativeSelectRoot><NativeSelectField items={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} defaultValue="DD/MM/YYYY" /></NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Time zone</Text>
                    <NativeSelectRoot><NativeSelectField items={["Europe/London", "America/New_York", "Africa/Casablanca"]} defaultValue="Europe/London" /></NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Time format</Text>
                    <NativeSelectRoot><NativeSelectField items={["12-hour (AM/PM)", "24-hour"]} defaultValue="24-hour" /></NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Currency</Text>
                    <NativeSelectRoot><NativeSelectField items={["British Pound (£)", "US Dollar ($)", "Moroccan Dirham (د.م.)", "Euro (€)"]} defaultValue="British Pound (£)" /></NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Currency symbol side</Text>
                    <NativeSelectRoot><NativeSelectField items={["Left", "Right"]} defaultValue="Left" /></NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Currency format</Text>
                    <NativeSelectRoot><NativeSelectField items={["1,234.56", "1.234,56", "1 234.56"]} defaultValue="1,234.56" /></NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>People's name format</Text>
                    <NativeSelectRoot><NativeSelectField items={["FirstName LastName", "LastName, FirstName"]} defaultValue="FirstName LastName" /></NativeSelectRoot>
                  </Box>
                </VStack>
              </Grid>
            </Box>
          </VStack>
        );

      case "Portal settings":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Configure what information students and related contacts can see when they log into their respective portals.
              </Text>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1.5fr" gap={12}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={3}>Portal settings</Text>
                  <Text fontSize="sm" color="gray.600">Set what to show or hide in your school portal.</Text>
                </Box>
                <VStack align="stretch" gap={8}>
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Start date for attendance</Text>
                    <Input type="date" borderRadius="md" />
                  </Box>
                  
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Students</Text>
                    <VStack align="stretch" gap={4}>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide payments</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide assignments</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide class grades</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide lesson grades</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Allow partial payment</Text></Flex>
                    </VStack>
                  </Box>
  
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Related contacts</Text>
                    <VStack align="stretch" gap={4}>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide payments</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide assignments</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide class grades</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Hide lesson grades</Text></Flex>
                      <Flex align="center" gap={3}><Switch colorScheme="teal" /> <Text fontSize="sm">Allow partial payment</Text></Flex>
                    </VStack>
                  </Box>
                </VStack>
              </Grid>
            </Box>
          </VStack>
        );
      case "Prospects":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Customize prospect statuses and manage how prospects are handled when they convert to enrolled students.
              </Text>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1.5fr" gap={12}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={3}>Prospect statuses</Text>
                  <Text fontSize="sm" color="gray.600">Customise the list of prospect statuses.</Text>
                </Box>
                <VStack align="stretch" gap={6}>
                  <Flex justify="space-between" align="center" pb={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">Hide default statuses</Text>
                    <Switch colorScheme="teal" />
                  </Flex>
                  <Box>
                    <Grid templateColumns="1fr 1fr" gap={4} mb={2}>
                      <Text fontSize="sm" fontWeight="bold" color="gray.600">TNG ID</Text>
                      <Text fontSize="sm" fontWeight="bold" color="gray.600">Your prospect statuses</Text>
                    </Grid>
                    </Box>
                </VStack>
              </Grid>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1.5fr" gap={12}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={3}>Delete enrolled prospect</Text>
                  <Text fontSize="sm" color="gray.600">If enabled, the prospect will be automatically deleted when converted to student</Text>
                </Box>
                <VStack align="stretch" gap={6}>
                  <Flex justify="space-between" align="center">
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">Automatically delete prospect when converted to student?</Text>
                    <Switch colorScheme="teal" />
                  </Flex>
                </VStack>
              </Grid>
            </Box>
          </VStack>
        );
      case "Glossary":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Rename system terms to match your school's terminology. These changes will be reflected throughout the platform.
              </Text>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1.5fr" gap={12}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={3}>Glossary</Text>
                  <Text fontSize="sm" color="gray.600">Rename terms to match your environment's terminology.</Text>
                </Box>
                <VStack align="stretch" gap={8}>
                  {/* Class */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Class</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center" mb={4}>
                      <Text fontSize="sm" fontWeight="medium">Rename Class to</Text>
                      <Input defaultValue="Class" borderRadius="md" />
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename Classes to</Text>
                      <Input defaultValue="Classes" borderRadius="md" />
                    </Grid>
                  </Box>
                  {/* Lesson */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Lesson</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center" mb={4}>
                      <Text fontSize="sm" fontWeight="medium">Rename Lesson to</Text>
                      <Input defaultValue="Lesson" borderRadius="md" />
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename Lessons to</Text>
                      <Input defaultValue="Lessons" borderRadius="md" />
                    </Grid>
                  </Box>
                  {/* Student */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Student</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center" mb={4}>
                      <Text fontSize="sm" fontWeight="medium">Rename Student to</Text>
                      <Input defaultValue="Learner" borderRadius="md" />
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename Students to</Text>
                      <Input defaultValue="Learners" borderRadius="md" />
                    </Grid>
                  </Box>
                  {/* Teacher */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Teacher</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center" mb={4}>
                      <Text fontSize="sm" fontWeight="medium">Rename Teacher to</Text>
                      <Input defaultValue="Teacher" borderRadius="md" />
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename Teachers to</Text>
                      <Input defaultValue="Teachers" borderRadius="md" />
                    </Grid>
                  </Box>
                  {/* Staff */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Staff</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center" mb={4}>
                      <Text fontSize="sm" fontWeight="medium">Rename Staff member to</Text>
                      <Input defaultValue="Staff member" borderRadius="md" />
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename Staff to</Text>
                      <Input defaultValue="Staff" borderRadius="md" />
                    </Grid>
                  </Box>
                  {/* Calendar */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Calendar</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename Calendar to</Text>
                      <Input defaultValue="Calendar" borderRadius="md" />
                    </Grid>
                  </Box>
                  {/* Classroom */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">Classroom</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename classroom to</Text>
                      <Input defaultValue="Classroom" borderRadius="md" />
                    </Grid>
                  </Box>
                  {/* School & Branch */}
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4} pb={2} borderBottomWidth="1px" borderColor="gray.200">School & Branch</Text>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center" mb={4}>
                      <Text fontSize="sm" fontWeight="medium">Rename School to</Text>
                      <Input defaultValue="Academy" borderRadius="md" />
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6} alignItems="center">
                      <Text fontSize="sm" fontWeight="medium">Rename Branch to</Text>
                      <Input defaultValue="Branch" borderRadius="md" />
                    </Grid>
                  </Box>
                </VStack>
              </Grid>
            </Box>
          </VStack>
        );
      case "Branding":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Customize the look and feel of your school's portal and communications by uploading your logo and selecting brand colors.
              </Text>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>Academy Logo</Text>
              <Flex align="center" gap={6}>
                <Box w="120px" h="120px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center" border="2px dashed" borderColor="gray.300" overflow="hidden">
                  {brandLogo ? (
                    <img src={brandLogo} alt="Academy Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <Upload size={32} color="gray" />
                  )}
                </Box>
                <VStack align="start">
                  <Button size="sm" bg={brandColor} color="white" _hover={{ opacity: 0.9 }} onClick={() => setBrandLogo("https://picsum.photos/seed/academy/200/200")}>Upload Logo (Demo)</Button>
                  <Button size="sm" variant="ghost" colorScheme="red" onClick={() => setBrandLogo(null)}>Remove Logo</Button>
                  <Text fontSize="xs" color="gray.500">Recommended size: 400x400px. Max size: 2MB.</Text>
                </VStack>
              </Flex>
              <Box borderBottomWidth="1px" borderColor="gray.200" my={8} />
              <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>Brand Colors</Text>
              <Grid templateColumns="1fr 1fr" gap={6}>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Primary Color</Text>
                  <Flex gap={3}>
                    <Box w={10} h={10} bg={brandColor} borderRadius="md" shadow="sm" />
                    <Input value={brandColor} onChange={(e) => setBrandColor(e.target.value)} w="150px" />
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Secondary Color</Text>
                  <Flex gap={3}>
                    <Box w={10} h={10} bg="#E6F2F2" borderRadius="md" shadow="sm" />
                    <Input defaultValue="#E6F2F2" w="150px" />
                  </Flex>
                </Box>
              </Grid>
            </Box>

            {/* Document Example Preview */}
            <Box>
              <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">Document examples</Text>
              </Flex>
              
              <VStack gap={8} align="stretch">
                <Box bg="white" p={10} borderRadius="md" borderWidth="1px" borderColor="gray.200" shadow="sm" maxW="800px">
                {/* Header */}
                <Flex justify="space-between" align="flex-start" mb={8}>
                  <Text fontSize="3xl" fontWeight="normal" color="gray.800">Invoice #1</Text>
                  {brandLogo ? (
                    <img src={brandLogo} alt="Logo" style={{ height: '60px', objectFit: 'contain' }} />
                  ) : (
                    <Text fontSize="3xl" fontWeight="serif" letterSpacing="widest" color={brandColor}>HERACLES</Text>
                  )}
                </Flex>

                <Box borderBottomWidth="1px" borderColor="gray.300" mb={8} />

                {/* Details Grid */}
                <Grid templateColumns="1fr 1fr" gap={8} mb={8}>
                  <Grid templateColumns="100px 1fr" gap={2} alignContent="start">
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">Issued:</Text>
                    <Text fontSize="sm" color="gray.700">May 1st, 2024</Text>
                    
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mt={4}>To:</Text>
                    <Box mt={4}>
                      <Text fontSize="sm" color="gray.700">Test Patient</Text>
                      <Text fontSize="sm" color="gray.700">10 Main Road</Text>
                      <Text fontSize="sm" color="gray.700">London</Text>
                      <Text fontSize="sm" color="gray.700">S3 8LE</Text>
                      <Text fontSize="sm" color="gray.700">GB</Text>
                    </Box>
                  </Grid>
                  
                  <Grid templateColumns="100px 1fr" gap={2} alignContent="start">
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">From:</Text>
                    <Text fontSize="sm" color="gray.700">Semble</Text>
                  </Grid>
                </Grid>

                <Grid templateColumns="1fr 1fr" gap={8} mb={8}>
                  <Grid templateColumns="100px 1fr" gap={2}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">Patient:</Text>
                    <Text fontSize="sm" color="gray.700">Test Patient</Text>
                  </Grid>
                  <Grid templateColumns="100px 1fr" gap={2}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">Practitioner:</Text>
                    <Text fontSize="sm" color="gray.700">Dr. Semble</Text>
                  </Grid>
                </Grid>

                <Box borderBottomWidth="1px" borderColor="gray.300" mb={4} />

                {/* Items Table */}
                <Grid templateColumns="3fr 1fr 1fr 1fr" gap={4} mb={2} py={2}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">Item</Text>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" textAlign="right">Quantity</Text>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" textAlign="right">Price</Text>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" textAlign="right">Total</Text>
                </Grid>
                
                <Grid templateColumns="3fr 1fr 1fr 1fr" gap={4} mb={8}>
                  <Text fontSize="sm" color="gray.700">Adults consultation 01/05/2024</Text>
                  <Text fontSize="sm" color="gray.700" textAlign="right">1</Text>
                  <Text fontSize="sm" color="gray.700" textAlign="right">100.00</Text>
                  <Text fontSize="sm" color="gray.700" textAlign="right">£100.00</Text>
                </Grid>
              </Box>

              {/* Receipt Example */}
              <Box bg="white" p={10} borderRadius="md" borderWidth="1px" borderColor="gray.200" shadow="sm" maxW="800px">
                <Flex justify="space-between" align="flex-start" mb={8}>
                  <Box>
                    {brandLogo ? (
                      <img src={brandLogo} alt="Logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '8px' }} />
                    ) : (
                      <Text fontSize="2xl" fontWeight="bold" color={brandColor} letterSpacing="tight">EduFlow</Text>
                    )}
                    <Text fontSize="sm" color="gray.500">123 Education Lane</Text>
                    <Text fontSize="sm" color="gray.500">Learning City, LC 12345</Text>
                    <Text fontSize="sm" color="gray.500">contact@eduflow.example.com</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="3xl" fontWeight="light" color="gray.300" textTransform="uppercase" letterSpacing="widest">Receipt</Text>
                    <Text fontWeight="medium" mt={2}>Receipt #: REC-2024-089</Text>
                    <Text fontSize="sm" color="gray.500">Date: Oct 12, 2024</Text>
                  </Box>
                </Flex>

                <Box borderBottomWidth="1px" borderColor="gray.200" w="full" mb={6} />

                <Flex justify="space-between" mb={8}>
                  <Box>
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="bold" mb={1}>Billed To</Text>
                    <Text fontWeight="bold">Jane Doe</Text>
                    <Text fontSize="sm" color="gray.600">Parent of John Doe</Text>
                    <Text fontSize="sm" color="gray.600">jane.doe@example.com</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="xs" color="gray.500" textTransform="uppercase" fontWeight="bold" mb={1}>Payment Method</Text>
                    <Text fontWeight="medium">Credit Card</Text>
                    <Text fontSize="sm" color="gray.600">**** **** **** 4242</Text>
                  </Box>
                </Flex>

                <Table.Root variant="line" size="sm" mb={6}>
                  <Table.Header>
                    <Table.Row bg="gray.50">
                      <Table.ColumnHeader>Description</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">Qty</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Text fontWeight="medium">October Tuition</Text>
                        <Text fontSize="xs" color="gray.500">Course: English B2</Text>
                      </Table.Cell>
                      <Table.Cell textAlign="center">1</Table.Cell>
                      <Table.Cell textAlign="right">$150.00</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Text fontWeight="medium">Materials Fee</Text>
                        <Text fontSize="xs" color="gray.500">Textbook and workbook</Text>
                      </Table.Cell>
                      <Table.Cell textAlign="center">1</Table.Cell>
                      <Table.Cell textAlign="right">$25.00</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>

                <Flex justify="flex-end">
                  <Box w="250px">
                    <Flex justify="space-between" mb={2}>
                      <Text color="gray.500">Subtotal</Text>
                      <Text>$175.00</Text>
                    </Flex>
                    <Flex justify="space-between" mb={2}>
                      <Text color="gray.500">Tax (0%)</Text>
                      <Text>$0.00</Text>
                    </Flex>
                    <Box borderBottomWidth="1px" borderColor="gray.200" w="full" my={2} />
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold" fontSize="lg">Total Paid</Text>
                      <Text fontWeight="bold" fontSize="xl" color="green.600">$175.00</Text>
                    </Flex>
                  </Box>
                </Flex>

                <Box mt={10} textAlign="center">
                  <Text color="gray.500" fontSize="sm">Thank you for your payment!</Text>
                </Box>
              </Box>

              {/* Learner Card Example */}
              <Box bg="white" p={10} borderRadius="md" borderWidth="1px" borderColor="gray.200" shadow="sm" maxW="800px">
                <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>Learner ID Card</Text>
                <Flex justify="center" p={4}>
                  <Box 
                    w="350px" 
                    h="220px" 
                    borderRadius="xl" 
                    overflow="hidden" 
                    boxShadow="xl" 
                    position="relative"
                    bgGradient="to-br"
                    gradientFrom={brandColor}
                    gradientTo="gray.800"
                    color="white"
                  >
                    {/* Card Header */}
                    <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px" borderColor="whiteAlpha.300" bg="whiteAlpha.200">
                      {brandLogo ? (
                        <img src={brandLogo} alt="Logo" style={{ height: '20px', objectFit: 'contain' }} />
                      ) : (
                        <Text fontWeight="bold" letterSpacing="widest" fontSize="sm">EDUFLOW ACADEMY</Text>
                      )}
                      <Box asChild opacity={0.8}><IdCard size={20} /></Box>
                    </Flex>
                    
                    {/* Card Body */}
                    <Flex p={4} gap={4} align="center" h="calc(100% - 53px)">
                      <Avatar.Root size="2xl" borderRadius="md" borderWidth="2px" borderColor="white">
                        <Avatar.Image src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        <Avatar.Fallback name="Learner Name" color="black" />
                      </Avatar.Root>
                      
                      <Box flex="1">
                        <Text fontSize="xs" color="whiteAlpha.700" textTransform="uppercase" mb={0.5}>Learner Name</Text>
                        <Text fontWeight="bold" fontSize="lg" lineHeight="1.2" mb={2}>John Doe</Text>
                        
                        <Grid templateColumns="1fr 1fr" gap={2}>
                          <Box>
                            <Text fontSize="2xs" color="whiteAlpha.700" textTransform="uppercase">ID Number</Text>
                            <Text fontSize="sm" fontWeight="medium" fontFamily="mono">STU-0001</Text>
                          </Box>
                          <Box>
                            <Text fontSize="2xs" color="whiteAlpha.700" textTransform="uppercase">Course</Text>
                            <Text fontSize="sm" fontWeight="medium">English B2</Text>
                          </Box>
                          <Box>
                            <Text fontSize="2xs" color="whiteAlpha.700" textTransform="uppercase">Enrolled</Text>
                            <Text fontSize="sm" fontWeight="medium">Oct 2024</Text>
                          </Box>
                          <Box>
                            <Text fontSize="2xs" color="whiteAlpha.700" textTransform="uppercase">Valid Thru</Text>
                            <Text fontSize="sm" fontWeight="medium">Sep 2025</Text>
                          </Box>
                        </Grid>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              </VStack>
            </Box>
          </VStack>
        );
      case "Roles":
        if (editingRole) {
          return (
            <VStack align="stretch" gap={6} maxW="800px">
              <Flex justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="gray.800" fontFamily="serif">{editingRole.name || "New Role"}</Text>
                <HStack>
                  <Button variant="outline" size="sm" onClick={() => setEditingRole(null)}>Cancel</Button>
                  <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} size="sm" onClick={() => {
                    if (editingRole.id) {
                      setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r));
                    } else {
                      setRoles([...roles, { ...editingRole, id: Date.now(), usersCount: 0 }]);
                    }
                    setEditingRole(null);
                  }}>Save</Button>
                </HStack>
              </Flex>

              <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Input 
                  value={editingRole.name || ""} 
                  onChange={(e) => setEditingRole({...editingRole, name: e.target.value})} 
                  placeholder="Role Name" 
                  mb={6} 
                  size="lg"
                  bg="gray.50"
                />
                <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                  <Text color="gray.600">Deny all across sections</Text>
                  <Switch colorScheme="teal" />
                </Flex>
              </Box>

              <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="lg" fontWeight="bold" color="gray.800" fontFamily="serif" mb={4}>Booking</Text>
                <VStack align="stretch" gap={0}>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">Allow all</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">See bookings</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3}>
                    <Text color="gray.600">Create, edit, delete bookings</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                </VStack>
              </Box>

              <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="lg" fontWeight="bold" color="gray.800" fontFamily="serif" mb={4}>Learners</Text>
                <VStack align="stretch" gap={0}>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">Allow all</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">See learners</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">Edit learners</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">Merge learners</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">Block, delete learners</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.600">Archive learners</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={3}>
                    <Text color="gray.600">Unarchive learners</Text>
                    <Switch colorScheme="teal" defaultChecked />
                  </Flex>
                </VStack>
              </Box>
            </VStack>
          );
        }

        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Manage user roles and their permissions. You can assign these roles to staff members on the <Text as="span" color="blue.600" cursor="pointer" onClick={() => setActiveTab("Users")}>Users page</Text>.
              </Text>
            </Box>
            <Box bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflow="hidden">
              <Flex p={6} justify="space-between" align="center" borderBottomWidth="1px" borderColor="gray.200">
                <Text fontSize="lg" fontWeight="bold" color="gray.800">System Roles</Text>
                </Flex>
              <Table.Root variant="line">
                <Table.Header bg="gray.50">
                  <Table.Row>
                    <Table.ColumnHeader>Role Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Description</Table.ColumnHeader>
                    <Table.ColumnHeader>Users</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {roles.map(role => (
                    <Table.Row key={role.id}>
                      <Table.Cell fontWeight="medium">{role.name}</Table.Cell>
                      <Table.Cell color="gray.600">{role.description}</Table.Cell>
                      <Table.Cell>{role.usersCount}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <IconButton aria-label="Edit" size="sm" variant="ghost" mr={2} onClick={() => setEditingRole(role)}><Edit2 size={16} /></IconButton>
                        <IconButton aria-label="Delete" size="sm" variant="ghost" colorScheme="red" onClick={() => setItemToDelete({ type: 'role', id: role.id, name: role.name })}><Trash2 size={16} /></IconButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </VStack>
        );
      case "Users":
        if (editingUser) {
          return (
            <VStack align="stretch" gap={6} maxW="1000px" pb={20}>
              <Flex justify="space-between" align="center">
                <Text fontSize="3xl" fontWeight="bold" color="gray.800" fontFamily="serif">
                  {editingUser.id ? `Edit ${editingUser.name}` : "Invite User"}
                </Text>
                <HStack>
                  <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} size="md" onClick={() => {
                    if (editingUser.id) {
                      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
                    } else {
                      setUsers([...users, { ...editingUser, id: Date.now(), status: "Pending" }]);
                    }
                    setEditingUser(null);
                  }}>Save</Button>
                </HStack>
              </Flex>

              {editingUser.id && (
                <Box bg="orange.50" p={4} borderRadius="md" borderWidth="1px" borderColor="orange.200">
                  <Flex align="center" gap={2}>
                    <Box color="orange.600"><FileText size={16} /></Box>
                    <Text fontSize="sm" color="orange.800">You may be charged for updating an existing user's role. Contact support for more information.</Text>
                  </Flex>
                </Box>
              )}

              {/* User details */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">User details</Text>
                <VStack align="stretch" gap={6}>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Field label="Title (optional)">
                      <NativeSelectRoot>
                        <NativeSelectField defaultValue="Mr">
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Dr">Dr</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                    <Field label="Preferred pronouns (optional)">
                      <NativeSelectRoot>
                        <NativeSelectField defaultValue="He/him">
                          <option value="He/him">He/him</option>
                          <option value="She/her">She/her</option>
                          <option value="They/them">They/them</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                  </Grid>

                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Field label="First">
                      <Input value={editingUser.name?.split(' ')[0] || ""} onChange={(e) => {
                        const last = editingUser.name?.split(' ').slice(1).join(' ') || "";
                        setEditingUser({...editingUser, name: `${e.target.value} ${last}`.trim()});
                      }} />
                    </Field>
                    <Field label="Last">
                      <Input value={editingUser.name?.split(' ').slice(1).join(' ') || ""} onChange={(e) => {
                        const first = editingUser.name?.split(' ')[0] || "";
                        setEditingUser({...editingUser, name: `${first} ${e.target.value}`.trim()});
                      }} />
                    </Field>
                  </Grid>

                  <Flex align="center" gap={4} p={4} bg="gray.50" borderRadius="md">
                    <Button variant="outline" colorScheme="teal" size="sm">Add mobile number</Button>
                    <Text fontSize="sm" color="gray.600">No mobile number added</Text>
                  </Flex>

                  <Flex align="center" gap={4} p={4} bg="gray.50" borderRadius="md">
                    <Text fontSize="sm" color="gray.600" flex="1">Users can update their own email address within account security.</Text>
                    <Box>
                      <Text fontSize="xs" fontWeight="bold" color="gray.800">Email</Text>
                      <Text fontSize="sm" color="gray.800">{editingUser.email || "No email added"}</Text>
                    </Box>
                  </Flex>

                  <Box>
                    <Checkbox colorScheme="teal" defaultChecked={editingUser.role === 'Teacher'} mb={2}>
                      <Text fontWeight="bold" color="gray.800">This user is a teacher/instructor</Text>
                    </Checkbox>
                    <Text fontSize="sm" color="gray.600" ml={6}>Link them to additional functionality such as grading and online booking</Text>
                  </Box>

                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Field label="Qualification (optional)">
                      <Input placeholder="e.g. PhD, MA, BA" />
                    </Field>
                    <Field label="Registration (optional)">
                      <Input placeholder="e.g. TRN: 123456" />
                    </Field>
                  </Grid>

                  <Field label="Subject specialty (optional)">
                    <NativeSelectRoot>
                      <NativeSelectField defaultValue="English">
                        <option value="English">English</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>

                  <Box bg="gray.50" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.200">
                    <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Signature</Text>
                    <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} size="sm" mb={4}>Upload file</Button>
                    <Box h="100px" bg="white" borderWidth="1px" borderColor="gray.300" borderRadius="md" borderStyle="dashed" />
                  </Box>

                  <Field label="Report signature position">
                    <NativeSelectRoot>
                      <NativeSelectField>
                        <option value="">Select...</option>
                        <option value="bottom-right">Bottom Right</option>
                        <option value="bottom-left">Bottom Left</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>

                  <Field label="SMS footer (optional)">
                    <Input />
                  </Field>
                </VStack>
              </Grid>

              {/* User access form */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">User access form</Text>
                <VStack align="stretch" gap={6}>
                  <Field label="Role">
                    <NativeSelectRoot>
                      <NativeSelectField value={editingUser.role || ""} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}>
                        <option value="">Select a role...</option>
                        {roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>
                  
                  <Box>
                    <Checkbox colorScheme="teal" defaultChecked mb={2}>
                      <Text fontWeight="bold" color="gray.800">This user can see all learners and contacts</Text>
                    </Checkbox>
                    <Text fontSize="sm" color="gray.600" ml={6}>This will add the user to the Public access group so they have no restrictions</Text>
                  </Box>
                </VStack>
              </Grid>

              {/* Calendar settings */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">Calendar settings</Text>
                <VStack align="stretch" gap={6}>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Field label="Start time">
                      <NativeSelectRoot>
                        <NativeSelectField defaultValue="07:00">
                          <option value="07:00">07:00</option>
                          <option value="08:00">08:00</option>
                          <option value="09:00">09:00</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                    <Field label="End time">
                      <NativeSelectRoot>
                        <NativeSelectField defaultValue="22:00">
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                          <option value="22:00">22:00</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                  </Grid>

                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Field label="Slot duration">
                      <NativeSelectRoot>
                        <NativeSelectField defaultValue="15">
                          <option value="15">15 mins</option>
                          <option value="30">30 mins</option>
                          <option value="60">60 mins</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                    <Field label="Scroll time">
                      <NativeSelectRoot>
                        <NativeSelectField defaultValue="Current time">
                          <option value="Current time">Current time</option>
                          <option value="Start time">Start time</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                  </Grid>

                  <Field label="First day">
                    <NativeSelectRoot>
                      <NativeSelectField defaultValue="Monday">
                        <option value="Monday">Monday</option>
                        <option value="Sunday">Sunday</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>
                </VStack>
              </Grid>

              {/* Subjects taught */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">Subjects taught</Text>
                <VStack align="stretch" gap={0}>
                  <Flex justify="flex-end" mb={4}>
                    <Checkbox colorScheme="teal"><Text fontSize="sm" color="gray.600">Select all</Text></Checkbox>
                  </Flex>
                  <Box borderTopWidth="1px" borderColor="gray.200" />
                  
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">General English</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">Business English</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">IELTS Preparation</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">TOEFL Preparation</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">Kids Classes</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">Private Tutoring</Text>
                    <Checkbox colorScheme="teal" />
                  </Flex>
                </VStack>
              </Grid>

              {/* Notification settings */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">Notification settings</Text>
                <VStack align="stretch" gap={0}>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">Receive notification when task is assigned to you</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">Receive notification when task assigned to you is updated</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">Receive notification when assignments are submitted</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                  <Flex justify="space-between" align="center" py={4} borderBottomWidth="1px" borderColor="gray.100">
                    <Text color="gray.800">Receive notification when booking has been made</Text>
                    <Checkbox colorScheme="teal" defaultChecked />
                  </Flex>
                </VStack>
              </Grid>

              {/* External calendar */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">External calendar</Text>
                <Box>
                  <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }}>Generate calendar link</Button>
                </Box>
              </Grid>

              {/* Teacher ID */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">Teacher ID</Text>
                <Field label="Identifier">
                  <Input />
                </Field>
              </Grid>

              {/* Academic settings */}
              <Grid templateColumns="250px 1fr" gap={8} bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">Academic settings</Text>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Lesson note permissions</Text>
                  <Checkbox colorScheme="teal" defaultChecked>
                    <Text color="gray.800">Allow others to write lesson notes on my behalf</Text>
                  </Checkbox>
                </Box>
              </Grid>

            </VStack>
          );
        }

        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Manage staff members, teachers, and administrators. You can set up their schedules on the <Text as="span" color="blue.600" cursor="pointer" onClick={() => setActiveTab("Availability")}>Availability page</Text>.
              </Text>
            </Box>
            <Box bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflow="hidden">
              <Flex p={6} justify="space-between" align="center" borderBottomWidth="1px" borderColor="gray.200">
                <HStack w="full" maxW="400px">
                  <Input placeholder="Search users..." size="sm" borderRadius="md" />
                  <IconButton aria-label="Search" size="sm"><Search size={16} /></IconButton>
                </HStack>
                </Flex>
              <Table.Root variant="line">
                <Table.Header bg="gray.50">
                  <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Email</Table.ColumnHeader>
                    <Table.ColumnHeader>Role</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map(user => (
                    <Table.Row key={user.id}>
                      <Table.Cell fontWeight="medium">{user.name}</Table.Cell>
                      <Table.Cell color="gray.600">{user.email}</Table.Cell>
                      <Table.Cell>
                        <Badge colorScheme={user.role === "Administrator" ? "purple" : user.role === "Teacher" ? "blue" : "gray"}>
                          {user.role}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge colorScheme={user.status === "Active" ? "green" : user.status === "Pending" ? "yellow" : "red"}>
                          {user.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <IconButton aria-label="Edit" size="sm" variant="ghost" onClick={() => setEditingUser(user)}><Edit2 size={16} /></IconButton>
                        <IconButton aria-label="Delete" size="sm" variant="ghost" colorScheme="red" onClick={() => setItemToDelete({ type: 'user', id: user.id, name: user.name })}><Trash2 size={16} /></IconButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </VStack>
        );
      case "Branches":
        if (editingLocation) {
          return (
            <VStack align="stretch" gap={6} maxW="900px" pb={20}>
              <Flex justify="space-between" align="center">
                <Text fontSize="3xl" fontWeight="bold" color="gray.800" fontFamily="serif">{editingLocation.id ? "Edit Branch" : "Add Branch"}</Text>
                <HStack>
                  <Button variant="outline" size="sm" onClick={() => setEditingLocation(null)}>Cancel</Button>
                  <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} size="sm" onClick={() => {
                    if (editingLocation.id) {
                      setLocations(locations.map(l => l.id === editingLocation.id ? editingLocation : l));
                    } else {
                      setLocations([...locations, { ...editingLocation, id: Date.now() }]);
                    }
                    setEditingLocation(null);
                  }}>Save</Button>
                </HStack>
              </Flex>
              
              <Grid templateColumns="1fr" gap={8}>
                {/* Branch Details */}
                <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                  <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif" mb={6}>Branch Details</Text>
                  <VStack align="stretch" gap={6}>
                    <Grid templateColumns="1fr 1fr" gap={6}>
                      <Field label="School name *">
                        <Input value={editingLocation.name || ""} onChange={(e) => setEditingLocation({...editingLocation, name: e.target.value})} placeholder="e.g. EduFlow Staging" />
                      </Field>
                      <Field label="School website">
                        <Input value={editingLocation.website || ""} onChange={(e) => setEditingLocation({...editingLocation, website: e.target.value})} placeholder="https://" />
                      </Field>
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6}>
                      <Field label="School phone">
                        <Input value={editingLocation.phone || ""} onChange={(e) => setEditingLocation({...editingLocation, phone: e.target.value})} placeholder="+44" />
                      </Field>
                      <Field label="School email">
                        <Input value={editingLocation.email || ""} onChange={(e) => setEditingLocation({...editingLocation, email: e.target.value})} placeholder="contact@school.com" />
                      </Field>
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6}>
                      <Field label="Street name & number">
                        <Input value={editingLocation.address || ""} onChange={(e) => setEditingLocation({...editingLocation, address: e.target.value})} placeholder="123 Education Blvd" />
                      </Field>
                      <Field label="City">
                        <Input value={editingLocation.city || ""} onChange={(e) => setEditingLocation({...editingLocation, city: e.target.value})} placeholder="City" />
                      </Field>
                    </Grid>
                    <Grid templateColumns="1fr 1fr" gap={6}>
                      <Field label="State/province/region">
                        <Input value={editingLocation.state || ""} onChange={(e) => setEditingLocation({...editingLocation, state: e.target.value})} placeholder="State" />
                      </Field>
                      <Field label="Postcode">
                        <Input value={editingLocation.postcode || ""} onChange={(e) => setEditingLocation({...editingLocation, postcode: e.target.value})} placeholder="Postcode" />
                      </Field>
                    </Grid>
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Country</Text>
                      <NativeSelectRoot>
                        <NativeSelectField 
                          items={["United Kingdom", "United States", "Morocco", "Canada", "Australia"]} 
                          value={editingLocation.country || "United Kingdom"}
                          onChange={(e) => setEditingLocation({...editingLocation, country: e.target.value})}
                        />
                      </NativeSelectRoot>
                    </Box>
                    <Flex justify="space-between" align="center" p={4} bg="gray.50" borderRadius="md">
                      <Box>
                        <Text fontWeight="bold" color="gray.800">Set as Primary Branch</Text>
                        <Text fontSize="sm" color="gray.600">This branch will be used as the default for new bookings and staff assignments.</Text>
                      </Box>
                      <Switch colorScheme="teal" checked={editingLocation.isPrimary} onCheckedChange={(e) => setEditingLocation({...editingLocation, isPrimary: e.checked})} />
                    </Flex>
                  </VStack>
                </Box>

                {/* Classrooms */}
                <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                  <Flex justify="space-between" align="center" mb={6}>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">Classrooms</Text>
                      <Text fontSize="sm" color="gray.600">Manage the rooms available at this branch.</Text>
                    </Box>
                    <Button size="sm" bg="#007D79" color="white" _hover={{ bg: "#006666" }} onClick={() => {
                      const newClassroom = { id: Date.now(), name: "", capacity: 20, isOnline: false, lessonLink: "" };
                      setEditingLocation({
                        ...editingLocation,
                        classrooms: [...(editingLocation.classrooms || []), newClassroom]
                      });
                    }}>
                      <Plus size={16} /> Add Classroom
                    </Button>
                  </Flex>
                  
                  <Box overflowX="auto">
                    <Table.Root variant="line">
                      <Table.Header bg="gray.50">
                        <Table.Row>
                          <Table.ColumnHeader>Room Name</Table.ColumnHeader>
                          <Table.ColumnHeader>Capacity (Max Learners)</Table.ColumnHeader>
                          <Table.ColumnHeader>Online</Table.ColumnHeader>
                          <Table.ColumnHeader>Online lesson link</Table.ColumnHeader>
                          <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {(editingLocation.classrooms || []).map((room: any, index: number) => (
                          <Table.Row key={room.id}>
                            <Table.Cell>
                              <Input size="sm" value={room.name} onChange={(e) => {
                                const newRooms = [...editingLocation.classrooms];
                                newRooms[index].name = e.target.value;
                                setEditingLocation({...editingLocation, classrooms: newRooms});
                              }} placeholder="e.g. Room 101" />
                            </Table.Cell>
                            <Table.Cell>
                              <Input type="number" size="sm" w="100px" value={room.capacity} onChange={(e) => {
                                const newRooms = [...editingLocation.classrooms];
                                newRooms[index].capacity = parseInt(e.target.value) || 0;
                                setEditingLocation({...editingLocation, classrooms: newRooms});
                              }} />
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox colorScheme="teal" checked={room.isOnline} onCheckedChange={(e) => {
                                const newRooms = [...editingLocation.classrooms];
                                newRooms[index].isOnline = !!e.checked;
                                setEditingLocation({...editingLocation, classrooms: newRooms});
                              }} />
                            </Table.Cell>
                            <Table.Cell>
                              <Input size="sm" value={room.lessonLink || ""} onChange={(e) => {
                                const newRooms = [...editingLocation.classrooms];
                                newRooms[index].lessonLink = e.target.value;
                                setEditingLocation({...editingLocation, classrooms: newRooms});
                              }} placeholder="https://..." />
                            </Table.Cell>
                            <Table.Cell textAlign="right">
                              <IconButton aria-label="Delete room" size="sm" variant="ghost" colorScheme="red" onClick={() => {
                                const newRooms = editingLocation.classrooms.filter((_: any, i: number) => i !== index);
                                setEditingLocation({...editingLocation, classrooms: newRooms});
                              }}>
                                <Trash2 size={16} />
                              </IconButton>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                        {(!editingLocation.classrooms || editingLocation.classrooms.length === 0) && (
                          <Table.Row>
                            <Table.Cell colSpan={5} textAlign="center" color="gray.500" py={8}>
                              <VStack gap={2}>
                                <Box color="gray.400"><Plus size={24} /></Box>
                                <Text>No classrooms added yet.</Text>
                                <Text fontSize="sm">Click "Add Classroom" to get started.</Text>
                              </VStack>
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table.Root>
                  </Box>
                </Box>
              </Grid>
            </VStack>
          );
        }

        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                Manage your school's branches. You can add classrooms to branches here, or manage all classrooms from the <Text as="span" color="blue.600" cursor="pointer" onClick={() => setActiveTab("Classrooms")}>Classrooms page</Text>.
              </Text>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
            <VStack align="stretch" gap={4}>
              {locations.map(location => (
                <Flex key={location.id} p={5} borderWidth="1px" borderRadius="md" borderColor="gray.200" align="center" justify="space-between">
                  <HStack gap={8} flex="1">
                    <Flex align="center" gap={3} minW="200px">
                      <Text fontWeight="bold" fontSize="md">{location.name}</Text>
                      {location.isPrimary && <Badge colorScheme="green">Primary</Badge>}
                    </Flex>
                    <Text fontSize="sm" color="gray.600" minW="250px">{location.address}</Text>
                    <HStack fontSize="sm" color="gray.500">
                      <Text>{location.classrooms?.length || 0} Classrooms</Text>
                      <Text>•</Text>
                      <Text>{location.classrooms?.reduce((acc, room) => acc + (room.capacity || 0), 0) || 0} Total Capacity</Text>
                    </HStack>
                  </HStack>
                  <HStack>
                    <IconButton aria-label="Edit" size="sm" variant="ghost" onClick={() => setEditingLocation(location)}><Edit2 size={16} /></IconButton>
                    <IconButton aria-label="Delete" size="sm" variant="ghost" colorScheme="red" onClick={() => setItemToDelete({ type: 'location', id: location.id, name: location.name })}><Trash2 size={16} /></IconButton>
                  </HStack>
                </Flex>
              ))}
            </VStack>
          </Box>
          </VStack>
        );
      case "Availability":
        if (editingClinician) {
          return (
            <VStack align="stretch" gap={6} maxW="800px">
              <Flex justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="gray.800" fontFamily="serif">Edit Availability - {editingClinician.name}</Text>
                <HStack>
                  <Button variant="outline" size="sm" onClick={() => setEditingClinician(null)}>Cancel</Button>
                  <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} size="sm" onClick={() => {
                    setClinicianAvailability(clinicianAvailability.map(c => c.id === editingClinician.id ? editingClinician : c));
                    setEditingClinician(null);
                  }}>Save</Button>
                </HStack>
              </Flex>
              <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                <VStack align="stretch" gap={6}>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <Box key={day} p={4} borderWidth="1px" borderRadius="md" borderColor="gray.200">
                      <Flex justify="space-between" align="center" mb={4}>
                        <Text fontWeight="bold" fontSize="md">{day}</Text>
                        <Button size="xs" variant="outline" onClick={() => {
                          const newSchedule = { ...editingClinician.schedule };
                          newSchedule[day] = [...(newSchedule[day] || []), { start: "09:00", end: "17:00", room: "" }];
                          setEditingClinician({ ...editingClinician, schedule: newSchedule });
                        }}>
                          <Plus size={14} /> Add Timeslot
                        </Button>
                      </Flex>
                      <VStack align="stretch" gap={3}>
                        {(editingClinician.schedule[day] || []).map((slot: any, index: number) => (
                          <Flex key={index} gap={4} align="center">
                            <Input type="time" size="sm" value={slot.start} onChange={(e) => {
                              const newSchedule = { ...editingClinician.schedule };
                              newSchedule[day][index].start = e.target.value;
                              setEditingClinician({ ...editingClinician, schedule: newSchedule });
                            }} />
                            <Text fontSize="sm" color="gray.500">to</Text>
                            <Input type="time" size="sm" value={slot.end} onChange={(e) => {
                              const newSchedule = { ...editingClinician.schedule };
                              newSchedule[day][index].end = e.target.value;
                              setEditingClinician({ ...editingClinician, schedule: newSchedule });
                            }} />
                            <NativeSelectRoot size="sm">
                              <NativeSelectField value={slot.room} onChange={(e) => {
                                const newSchedule = { ...editingClinician.schedule };
                                newSchedule[day][index].room = e.target.value;
                                setEditingClinician({ ...editingClinician, schedule: newSchedule });
                              }}>
                                <option value="">Select Room</option>
                                {locations.flatMap(l => l.classrooms || []).map(r => (
                                  <option key={r.id} value={r.name}>{r.name}</option>
                                ))}
                              </NativeSelectField>
                            </NativeSelectRoot>
                            <IconButton aria-label="Remove slot" size="sm" variant="ghost" colorScheme="red" onClick={() => {
                              const newSchedule = { ...editingClinician.schedule };
                              newSchedule[day] = newSchedule[day].filter((_: any, i: number) => i !== index);
                              setEditingClinician({ ...editingClinician, schedule: newSchedule });
                            }}>
                              <Trash2 size={16} />
                            </IconButton>
                          </Flex>
                        ))}
                        {(!editingClinician.schedule[day] || editingClinician.schedule[day].length === 0) && (
                          <Text fontSize="sm" color="gray.500" fontStyle="italic">No availability</Text>
                        )}
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          );
        }

        return (
          <VStack align="stretch" gap={6} maxW="1000px">
            <Box mb={2}>
              <Text fontSize="sm" color="gray.600">
                If you want lessons to be associated with a teacher then you must add the teacher from the <Text as="span" color="blue.600" cursor="pointer" onClick={() => setActiveTab("Users")}>Users page</Text>. You can add branches and classrooms from the <Text as="span" color="blue.600" cursor="pointer" onClick={() => setActiveTab("Branches")}>Branches page</Text>. You can add ad-hoc availability and out-of-office directly from the appointments calendar.
              </Text>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={1}>Double booking alert</Text>
                  <Text fontSize="sm" color="gray.600">
                    When enabled, you will be alerted if you try to book a lesson for a teacher or classroom that is already booked.
                  </Text>
                </Box>
                <Switch colorScheme="teal" defaultChecked />
              </Flex>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>Calendar settings</Text>
              <VStack align="stretch" gap={6}>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Default calendar view for school</Text>
                  <NativeSelectRoot><NativeSelectField items={["Weekly", "Monthly", "Daily"]} defaultValue="Weekly" /></NativeSelectRoot>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>School week begins on</Text>
                  <HStack gap={4}>
                    <label><input type="radio" name="weekStart" value="Monday" defaultChecked /> Monday</label>
                    <label><input type="radio" name="weekStart" value="Sunday" /> Sunday</label>
                    <label><input type="radio" name="weekStart" value="Saturday" /> Saturday</label>
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Calendar daily start time</Text>
                  <Input type="time" defaultValue="08:00" borderRadius="md" />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Calendar daily slot intervals</Text>
                  <NativeSelectRoot><NativeSelectField items={["15 minutes", "30 minutes", "60 minutes"]} defaultValue="30 minutes" /></NativeSelectRoot>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800" mb={2}>Hide day on calendar</Text>
                  <VStack align="start" gap={2}>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                      <Checkbox key={day} colorScheme="teal"><Text fontSize="sm">{day}</Text></Checkbox>
                    ))}
                  </VStack>
                </Box>
                <Flex justify="space-between" align="center" pt={4} borderTopWidth="1px" borderColor="gray.100">
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">Show student count</Text>
                  <Switch colorScheme="teal" />
                </Flex>
                <Flex justify="space-between" align="center" pt={4} borderTopWidth="1px" borderColor="gray.100">
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">Color-code calendar lessons by teacher</Text>
                  <Switch colorScheme="teal" />
                </Flex>
              </VStack>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>Teachers</Text>
              <Box bg="blue.50" color="blue.800" p={4} borderRadius="md" mb={6} borderWidth="1px" borderColor="blue.100">
                <Text fontSize="sm">
                  Select a teacher from the drop-down menu and create timeslots for their availability in a specific room, for example, John Doe is available in Room 2 from 8:00 - 9:00. If there are no teachers in the dropdown menu, then they either need to be created on the <Text as="span" textDecoration="underline" cursor="pointer" onClick={() => setActiveTab("Users")}>Users page</Text>, or they need to validate their account.
                </Text>
              </Box>

              <Flex justify="flex-end" mb={6}>
                <HStack>
                  <NativeSelectRoot size="sm" w="250px">
                    <NativeSelectField 
                      placeholder="Select a teacher to add"
                      onChange={(e) => {
                        const clinicianId = parseInt(e.target.value);
                        if (clinicianId && !clinicianAvailability.find(c => c.clinicianId === clinicianId)) {
                          const user = users.find(u => u.id === clinicianId);
                          if (user) {
                            setClinicianAvailability([...clinicianAvailability, {
                              id: Date.now(),
                              clinicianId: user.id,
                              name: user.name,
                              color: "green",
                              schedule: {
                                Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
                              }
                            }]);
                          }
                        }
                      }}
                    >
                      {users.filter(u => u.role === "Teacher" || u.role === "Administrator").map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                  <Button size="sm" variant="outline"><List size={16} /></Button>
                </HStack>
              </Flex>

              <VStack align="stretch" gap={8}>
                {clinicianAvailability.map(clinician => (
                  <Box key={clinician.id}>
                    <Flex align="center" gap={2} mb={4}>
                      <Box w={3} h={3} borderRadius="full" bg={`${clinician.color}.400`} />
                      <Text fontSize="lg" fontWeight="bold" color="white" bg="#2B8CFF" px={3} py={1} borderRadius="sm" display="inline-block">
                        {clinician.name}
                      </Text>
                      <IconButton aria-label="Edit availability" size="xs" variant="ghost" ml="auto" onClick={() => setEditingClinician(clinician)}>
                        <Edit2 size={14} />
                      </IconButton>
                    </Flex>
                    
                    <Grid templateColumns="repeat(7, 1fr)" gap={0} borderWidth="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                        <Box key={day} borderRightWidth="1px" borderColor="gray.200" _last={{ borderRightWidth: 0 }}>
                          <Box bg="#2B8CFF" color="white" p={2} textAlign="center">
                            <Text fontSize="sm" fontWeight="medium">{day}</Text>
                          </Box>
                          <Box p={2} minH="80px" bg="white" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            {clinician.schedule[day as keyof typeof clinician.schedule]?.length > 0 ? (
                              clinician.schedule[day as keyof typeof clinician.schedule].map((slot: any, i: number) => (
                                <Badge key={i} colorScheme="blue" variant="subtle" mb={1} w="full" textAlign="center" justifyContent="center">
                                  {slot.start} - {slot.end}
                                </Badge>
                              ))
                            ) : (
                              <Badge colorScheme="blue" variant="solid" bg="#2B8CFF" w="full" textAlign="center" justifyContent="center">
                                No availability
                              </Badge>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        );
      case "Academic settings":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Table.Root variant="line" size="sm">
                <Table.Header bg="gray.50">
                  <Table.Row>
                    <Table.ColumnHeader>Term Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Start Date</Table.ColumnHeader>
                    <Table.ColumnHeader>End Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {academicTerms.map(term => (
                    <Table.Row key={term.id}>
                      <Table.Cell fontWeight="medium">{term.name}</Table.Cell>
                      <Table.Cell>{term.startDate}</Table.Cell>
                      <Table.Cell>{term.endDate}</Table.Cell>
                      <Table.Cell>
                        <Badge colorScheme={term.status === "Active" ? "green" : "gray"}>{term.status}</Badge>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <IconButton aria-label="Edit" size="xs" variant="ghost"><Edit2 size={14} /></IconButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Flex justify="space-between" align="center" mb={6}>
                <Box>
                  <Text fontSize="sm" color="gray.600">Upgrade learners to the next class for the upcoming term. You can exclude learners who are repeating a year.</Text>
                </Box>
                <Button size="sm" bg="#007D79" color="white" _hover={{ bg: "#006666" }}>Process Upgrades</Button>
              </Flex>
              
              <Flex gap={4} mb={6} align="flex-end">
                <Field label="From Term">
                  <NativeSelectRoot size="sm">
                    <NativeSelectField defaultValue="Fall 2026">
                      <option value="Fall 2026">Fall 2026</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                <Box color="gray.400" pb={2}><ChevronRight size={20} /></Box>
                <Field label="To Term">
                  <NativeSelectRoot size="sm">
                    <NativeSelectField defaultValue="Spring 2027">
                      <option value="Spring 2027">Spring 2027</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                <Field label="Class">
                  <NativeSelectRoot size="sm">
                    <NativeSelectField defaultValue="Grade 10">
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
              </Flex>

              <Table.Root variant="line" size="sm">
                <Table.Header bg="gray.50">
                  <Table.Row>
                    <Table.ColumnHeader w="40px"><Checkbox colorScheme="teal" defaultChecked /></Table.ColumnHeader>
                    <Table.ColumnHeader>Learner Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Current Class</Table.ColumnHeader>
                    <Table.ColumnHeader>Next Class</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {learnerUpgrades.map(learner => (
                    <Table.Row key={learner.id} bg={!learner.selected ? "gray.50" : "transparent"}>
                      <Table.Cell>
                        <Checkbox 
                          colorScheme="teal" 
                          checked={learner.selected} 
                          onChange={(e) => {
                            const newUpgrades = learnerUpgrades.map(s => s.id === learner.id ? { ...s, selected: !s.selected, status: !s.selected ? "Pending" : "Excluded", nextClass: !s.selected ? "Grade 11" : s.currentClass } : s);
                            setLearnerUpgrades(newUpgrades);
                          }} 
                        />
                      </Table.Cell>
                      <Table.Cell fontWeight="medium" color={!learner.selected ? "gray.500" : "inherit"}>{learner.name}</Table.Cell>
                      <Table.Cell color={!learner.selected ? "gray.500" : "inherit"}>{learner.currentClass}</Table.Cell>
                      <Table.Cell>
                        <NativeSelectRoot size="xs" w="120px" disabled={!learner.selected}>
                          <NativeSelectField value={learner.nextClass} onChange={(e) => {
                            const newUpgrades = learnerUpgrades.map(s => s.id === learner.id ? { ...s, nextClass: e.target.value } : s);
                            setLearnerUpgrades(newUpgrades);
                          }}>
                            <option value="Grade 10">Grade 10</option>
                            <option value="Grade 11">Grade 11</option>
                            <option value="Grade 12">Grade 12</option>
                          </NativeSelectField>
                        </NativeSelectRoot>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge colorScheme={learner.status === "Pending" ? "blue" : "gray"}>{learner.status}</Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
              <Button mt={4} size="sm" variant="outline"><Plus size={16} /> Add Learner to List</Button>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <NativeSelectRoot maxW="300px" mb={4}>
                <NativeSelectField defaultValue="letter">
                  <option value="letter">Letter Grades (A, B, C, D, F)</option>
                  <option value="percentage">Percentage (0-100%)</option>
                  <option value="passfail">Pass / Fail</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Box>
          </VStack>
        );
      case "Assessments and materials":
        return (
          <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>Standard Materials</Text>
            <Text fontSize="sm" color="gray.600" mb={6}>Manage the list of materials and textbooks available for courses.</Text>
            <Table.Root variant="line">
              <Table.Header bg="gray.50">
                <Table.Row>
                  <Table.ColumnHeader>Material Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Type</Table.ColumnHeader>
                  <Table.ColumnHeader>Cost</Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell fontWeight="medium">Advanced Mathematics Vol 1</Table.Cell>
                  <Table.Cell>Textbook</Table.Cell>
                  <Table.Cell>$45.00</Table.Cell>
                  <Table.Cell textAlign="right"><IconButton aria-label="Edit" size="sm" variant="ghost"><Edit2 size={16} /></IconButton></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell fontWeight="medium">Chemistry Lab Kit</Table.Cell>
                  <Table.Cell>Equipment</Table.Cell>
                  <Table.Cell>$120.00</Table.Cell>
                  <Table.Cell textAlign="right"><IconButton aria-label="Edit" size="sm" variant="ghost"><Edit2 size={16} /></IconButton></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        );
      case "Online booking":
        return (
          <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" maxW="800px">
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">Enable Online Booking</Text>
                <Text fontSize="sm" color="gray.600">Allow learners to book lessons and appointments online.</Text>
              </Box>
              <Switch colorScheme="teal" size="lg" defaultChecked />
            </Flex>
            <Box borderBottomWidth="1px" borderColor="gray.200" my={6} />
            <VStack align="stretch" gap={6}>
              <Field label="Minimum notice for bookings">
                <NativeSelectRoot>
                  <NativeSelectField defaultValue="24h">
                    <option value="1h">1 Hour</option>
                    <option value="12h">12 Hours</option>
                    <option value="24h">24 Hours</option>
                    <option value="48h">48 Hours</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>
              <Field label="Maximum advance booking">
                <NativeSelectRoot>
                  <NativeSelectField defaultValue="3m">
                    <option value="1m">1 Month</option>
                    <option value="3m">3 Months</option>
                    <option value="6m">6 Months</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>
            </VStack>
          </Box>
        );
      case "SMS and email templates":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Text fontSize="sm" color="gray.600">Use SMS and email templates to set up automated communications that will be sent for appointments.</Text>
            
            <Box bg="#FFF8E1" p={4} borderRadius="md" borderWidth="1px" borderColor="#FFE082" display="flex" alignItems="center" gap={3}>
              <Box color="#F57F17"><Info size={20} /></Box>
              <Text fontSize="sm" color="gray.800">There is a cost associated with each SMS and WhatsApp message. For more information, see <Text as="span" color="#007D79" textDecoration="underline" cursor="pointer">pricing on the Help Centre</Text>.</Text>
            </Box>

            {["Confirmations", "Reminders", "Cancellations", "Invoicing", "Follow-ups"].map(category => {
              const categoryTemplates = templates.filter(t => t.category === category);
              return (
                <Box key={category}>
                  <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif" mb={2}>{category}</Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    {category === "Confirmations" && "Confirmations will send when an appointment is booked in the calendar or online booking."}
                    {category === "Reminders" && "Reminders will send at set intervals leading up to the appointment."}
                    {category === "Cancellations" && "Cancellations will be sent if the appointment is cancelled."}
                    {category === "Invoicing" && "Invoicing reminders will send at set intervals if the invoice is unpaid."}
                    {category === "Follow-ups" && "Follow-ups will send at set intervals after the appointment. You might use them to ask for a review or to ask the patient to book another appointment."}
                  </Text>
                  
                  {categoryTemplates.length > 0 ? (
                    <VStack align="stretch" gap={0} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflow="hidden">
                      {categoryTemplates.map((template, index) => (
                        <Flex key={template.id} p={4} align="center" justify="space-between" borderBottomWidth={index === categoryTemplates.length - 1 ? 0 : "1px"} borderColor="gray.100" _hover={{ bg: "gray.50" }}>
                          <HStack gap={4} flex="1">
                            <Badge colorScheme={template.status === "Active" ? "green" : "red"} variant="subtle" w="70px" textAlign="center" justifyContent="center">{template.status}</Badge>
                            <Text fontWeight="medium" color="gray.800">{template.name}</Text>
                          </HStack>
                          <HStack gap={4}>
                            <Badge colorScheme="orange" variant="subtle">{template.type}</Badge>
                            <Text fontSize="sm" color="gray.500" w="60px">{template.channel}</Text>
                            <IconButton aria-label="More options" size="sm" variant="ghost">
                              <MoreHorizontal size={18} color="gray.500" />
                            </IconButton>
                          </HStack>
                        </Flex>
                      ))}
                    </VStack>
                  ) : (
                    <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" textAlign="center">
                      <VStack gap={2}>
                        <Box color="gray.400"><Mail size={32} /></Box>
                        <Text fontWeight="medium" color="gray.800">No {category.toLowerCase()} to display</Text>
                      </VStack>
                    </Box>
                  )}
                </Box>
              );
            })}
          </VStack>
        );
      case "Learner settings":
        return (
          <VStack align="stretch" gap={8} maxW="1000px">
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text fontSize="sm" color="gray.600" mb={6}>Configure which sections are available on the learner profile.</Text>
              
              <VStack align="stretch" gap={4}>
                <Flex justify="space-between" align="center" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Box>
                    <Text fontWeight="medium">Medical Information</Text>
                    <Text fontSize="sm" color="gray.500">Track allergies, conditions, and emergency contacts</Text>
                  </Box>
                  <Switch colorScheme="teal" defaultChecked />
                </Flex>
                <Flex justify="space-between" align="center" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Box>
                    <Text fontWeight="medium">Previous Education</Text>
                    <Text fontSize="sm" color="gray.500">Record previous schools and academic records</Text>
                  </Box>
                  <Switch colorScheme="teal" defaultChecked />
                </Flex>
                <Flex justify="space-between" align="center" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Box>
                    <Text fontWeight="medium">Special Educational Needs (SEN)</Text>
                    <Text fontSize="sm" color="gray.500">Track individual education plans and accommodations</Text>
                  </Box>
                  <Switch colorScheme="teal" defaultChecked />
                </Flex>
              </VStack>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Flex justify="space-between" align="center" mb={6}>
                <Box>
                  <Text fontSize="sm" color="gray.600">Add custom data fields to collect specific information for your academy.</Text>
                </Box>
                <Button size="sm" bg="#007D79" color="white" _hover={{ bg: "#006666" }}><Plus size={16} /> Add Field</Button>
              </Flex>
              
              <Table.Root variant="line">
                <Table.Header bg="gray.50">
                  <Table.Row>
                    <Table.ColumnHeader>Field Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Type</Table.ColumnHeader>
                    <Table.ColumnHeader>Required</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell fontWeight="medium">T-Shirt Size</Table.Cell>
                    <Table.Cell>Dropdown</Table.Cell>
                    <Table.Cell><Badge colorScheme="green">Yes</Badge></Table.Cell>
                    <Table.Cell textAlign="right"><IconButton aria-label="Edit" size="sm" variant="ghost"><Edit2 size={16} /></IconButton></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell fontWeight="medium">Dietary Requirements</Table.Cell>
                    <Table.Cell>Text (Multi-line)</Table.Cell>
                    <Table.Cell><Badge colorScheme="gray">No</Badge></Table.Cell>
                    <Table.Cell textAlign="right"><IconButton aria-label="Edit" size="sm" variant="ghost"><Edit2 size={16} /></IconButton></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell fontWeight="medium">Extracurricular Interests</Table.Cell>
                    <Table.Cell>Multiple Choice</Table.Cell>
                    <Table.Cell><Badge colorScheme="gray">No</Badge></Table.Cell>
                    <Table.Cell textAlign="right"><IconButton aria-label="Edit" size="sm" variant="ghost"><Edit2 size={16} /></IconButton></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text fontSize="sm" color="gray.600" mb={6}>Specify which documents are required for a complete learner registration.</Text>
              
              <VStack align="stretch" gap={3}>
                <Flex justify="space-between" align="center" p={3} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="gray.50">
                  <HStack gap={3}>
                    <FileText size={18} color="gray.500" />
                    <Text fontWeight="medium">Birth Certificate / ID</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="red">Required</Badge>
                    <IconButton aria-label="Options" size="xs" variant="ghost"><MoreHorizontal size={16} /></IconButton>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center" p={3} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="gray.50">
                  <HStack gap={3}>
                    <FileText size={18} color="gray.500" />
                    <Text fontWeight="medium">Previous Academic Transcripts</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="red">Required</Badge>
                    <IconButton aria-label="Options" size="xs" variant="ghost"><MoreHorizontal size={16} /></IconButton>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center" p={3} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="gray.50">
                  <HStack gap={3}>
                    <FileText size={18} color="gray.500" />
                    <Text fontWeight="medium">Vaccination Record</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="gray">Optional</Badge>
                    <IconButton aria-label="Options" size="xs" variant="ghost"><MoreHorizontal size={16} /></IconButton>
                  </HStack>
                </Flex>
                <Button mt={2} size="sm" variant="outline" alignSelf="flex-start"><Plus size={16} /> Add Document Requirement</Button>
              </VStack>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text fontSize="sm" color="gray.600" mb={6}>Configure what learners and parents can see and do in their portal.</Text>
              
              <Grid templateColumns="1fr 1fr" gap={6}>
                <VStack align="stretch" gap={4}>
                  <Text fontWeight="bold" color="gray.700">Permissions</Text>
                  <Checkbox colorScheme="teal" defaultChecked>View Grades and Assessments</Checkbox>
                  <Checkbox colorScheme="teal" defaultChecked>View Attendance Records</Checkbox>
                  <Checkbox colorScheme="teal" defaultChecked>Update Contact Information</Checkbox>
                  <Checkbox colorScheme="teal" defaultChecked>Book Extracurricular Activities</Checkbox>
                  <Checkbox colorScheme="teal">Message Teachers Directly</Checkbox>
                </VStack>
                <VStack align="stretch" gap={4}>
                  <Text fontWeight="bold" color="gray.700">Automated Actions</Text>
                  <Checkbox colorScheme="teal" defaultChecked>Send welcome email on portal activation</Checkbox>
                  <Checkbox colorScheme="teal" defaultChecked>Notify parents of unexcused absences</Checkbox>
                  <Checkbox colorScheme="teal" defaultChecked>Send weekly progress summaries</Checkbox>
                </VStack>
              </Grid>
            </Box>
          </VStack>
        );
      case "Invoice and payment":
        return (
          <VStack align="stretch" gap={8} maxW="800px">
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Text fontSize="sm" color="gray.600" mb={6}>Configure the accepted payment methods and default currency for your academy.</Text>
              
              <VStack align="stretch" gap={6}>
                <Field label="Default Currency">
                  <NativeSelectRoot>
                    <NativeSelectField defaultValue="MAD">
                      <option value="MAD">MAD (Moroccan Dirham)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                
                <Box>
                  <Text fontWeight="medium" color="gray.800" mb={4}>Accepted Payment Methods</Text>
                  <VStack align="stretch" gap={3}>
                    <Flex justify="space-between" align="center" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                      <HStack gap={3}>
                        <Box color="gray.500"><CreditCard size={20} /></Box>
                        <Box>
                          <Text fontWeight="medium">Bank Transfer</Text>
                          <Text fontSize="sm" color="gray.500">Allow learners to pay via direct bank transfer</Text>
                        </Box>
                      </HStack>
                      <Switch colorScheme="teal" defaultChecked />
                    </Flex>
                    
                    <Flex justify="space-between" align="center" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                      <HStack gap={3}>
                        <Box color="gray.500"><Banknote size={20} /></Box>
                        <Box>
                          <Text fontWeight="medium">Cash</Text>
                          <Text fontSize="sm" color="gray.500">Accept cash payments at the campus</Text>
                        </Box>
                      </HStack>
                      <Switch colorScheme="teal" defaultChecked />
                    </Flex>
                    
                    <Flex justify="space-between" align="center" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                      <HStack gap={3}>
                        <Box color="gray.500"><FileText size={20} /></Box>
                        <Box>
                          <Text fontWeight="medium">Cheque</Text>
                          <Text fontSize="sm" color="gray.500">Accept payment via physical cheque</Text>
                        </Box>
                      </HStack>
                      <Switch colorScheme="teal" defaultChecked />
                    </Flex>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Grid templateColumns="1fr 1fr" gap={6}>
                <Field label="Tax Rate (%)">
                  <Input type="number" defaultValue="0" />
                </Field>
                <Field label="Invoice Prefix" gridColumn="span 2">
                  <Input defaultValue="INV-" />
                </Field>
              </Grid>
            </Box>
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
              <Flex justify="space-between" align="center" mb={6}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">Payment Gateway</Text>
                  <Text fontSize="sm" color="gray.600">Accept online payments from learners.</Text>
                </Box>
                <CreditCard size={24} color="#007D79" />
              </Flex>
              <Flex p={4} bg="gray.50" borderRadius="md" justify="space-between" align="center">
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="green.500" />
                  <Text fontWeight="bold">Stripe Connected</Text>
                </HStack>
                <Button size="sm" variant="outline">Manage Account</Button>
              </Flex>
            </Box>
          </VStack>
        );
      case "Labels":
        if (isEditingLabel) {
          return (
            <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" maxW="600px">
              <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.800" fontFamily="serif">
                  {editingLabel?.id ? "Edit label" : "New label"}
                </Text>
                <IconButton aria-label="Close" variant="ghost" onClick={() => setIsEditingLabel(false)}>
                  <X size={20} />
                </IconButton>
              </Flex>
              
              <Text fontSize="sm" color="gray.600" mb={6}>
                Use labels to categorise learners, lessons, and classes.
              </Text>

              <VStack align="stretch" gap={6}>
                <Field label="Name *" required>
                  <Input 
                    value={editingLabel?.name || ""} 
                    onChange={(e) => setEditingLabel({...editingLabel, name: e.target.value})}
                  />
                </Field>

                <Field label="Colour">
                  <HStack gap={4}>
                    <Box 
                      w="40px" h="40px" 
                      borderRadius="md" 
                      bg={editingLabel?.color || "#E34433"} 
                      borderWidth="1px" borderColor="gray.200"
                    />
                    <Input 
                      value={editingLabel?.color || "#E34433"} 
                      onChange={(e) => setEditingLabel({...editingLabel, color: e.target.value})}
                      w="150px"
                    />
                  </HStack>
                </Field>

                <Box bg="#FFF8E1" p={4} borderRadius="md" borderWidth="1px" borderColor="#FFE082" display="flex" gap={3}>
                  <Box color="#F57F17" mt={0.5}><Info size={18} /></Box>
                  <Text fontSize="sm" color="gray.800">
                    Labels with sensitive information will be visible to all users who have permission to view learners.
                  </Text>
                </Box>
              </VStack>

              <Flex justify="space-between" mt={8}>
                <Button 
                  bg="#007D79" color="white" _hover={{ bg: "#006666" }}
                  onClick={() => {
                    if (editingLabel?.id) {
                      setLabels(labels.map(l => l.id === editingLabel.id ? editingLabel : l));
                    } else {
                      setLabels([...labels, { ...editingLabel, id: Date.now() }]);
                    }
                    setIsEditingLabel(false);
                  }}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditingLabel(false)}>Cancel</Button>
              </Flex>
            </Box>
          );
        }

        return (
          <VStack align="stretch" gap={6} maxW="1000px">
            <Box bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflow="hidden">
              <Flex p={4} justify="space-between" align="center" borderBottomWidth="1px" borderColor="gray.200" gap={4}>
                <Box position="relative" flex="1" maxW="400px">
                  <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400">
                    <Search size={16} />
                  </Box>
                  <Input pl={10} placeholder="Search labels" bg="gray.50" border="none" _focus={{ bg: "white", ring: "1px", ringColor: "teal.500" }} />
                </Box>
              </Flex>

              <Table.Root variant="line">
                <Table.Header bg="gray.50">
                  <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Colour</Table.ColumnHeader>
                    <Table.ColumnHeader w="50px"></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {labels.map(label => (
                    <Table.Row key={label.id} _hover={{ bg: "gray.50" }}>
                      <Table.Cell fontWeight="medium" color="#007D79">{label.name}</Table.Cell>
                      <Table.Cell>
                        <Box w="24px" h="24px" borderRadius="md" bg={label.color} />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <IconButton 
                          aria-label="More options" 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            setEditingLabel(label);
                            setIsEditingLabel(true);
                          }}
                        >
                          <MoreHorizontal size={18} color="gray.500" />
                        </IconButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
              
              <Flex p={4} borderTopWidth="1px" borderColor="gray.200" justify="flex-end" align="center" gap={4} color="gray.600" fontSize="sm">
                <HStack>
                  <Text>Rows per page:</Text>
                  <NativeSelectRoot size="xs" w="60px">
                    <NativeSelectField defaultValue="10">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </HStack>
                <Text>1 - {labels.length} of {labels.length}</Text>
                <HStack gap={1}>
                  <IconButton aria-label="First page" size="xs" variant="ghost" disabled><ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /></IconButton>
                  <IconButton aria-label="Previous page" size="xs" variant="ghost" disabled><ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /></IconButton>
                  <IconButton aria-label="Next page" size="xs" variant="ghost" disabled><ChevronRight size={14} /></IconButton>
                  <IconButton aria-label="Last page" size="xs" variant="ghost" disabled><ChevronRight size={14} /></IconButton>
                </HStack>
              </Flex>
            </Box>
          </VStack>
        );
      case "Letter templates":
      case "Lesson templates":
      case "Questionnaires":
        return (
          <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
            <Flex direction="column" align="center" justify="center" py={12} bg="gray.50" borderRadius="md" border="1px dashed" borderColor="gray.300">
              <FileText size={48} color="#CBD5E0" />
              <Text mt={4} color="gray.500" fontWeight="medium">No {activeTab.toLowerCase()} found</Text>
              <Text fontSize="sm" color="gray.400" mt={1}>Click "Create New" to get started.</Text>
            </Flex>
          </Box>
        );
      case "Integrations":
        return (
          <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>Connected Apps</Text>
            <Grid templateColumns="1fr 1fr" gap={6}>
              <Flex p={5} borderWidth="1px" borderColor="gray.200" borderRadius="md" align="center" justify="space-between">
                <HStack gap={4}>
                  <Box w={10} h={10} bg="blue.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                    <LinkIcon size={20} color="#3182CE" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">Google Workspace</Text>
                    <Text fontSize="xs" color="gray.500">Sync calendar and emails</Text>
                  </Box>
                </HStack>
                <Button size="sm" variant="outline">Configure</Button>
              </Flex>
              <Flex p={5} borderWidth="1px" borderColor="gray.200" borderRadius="md" align="center" justify="space-between">
                <HStack gap={4}>
                  <Box w={10} h={10} bg="blue.400" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                    <Text color="white" fontWeight="bold">Z</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">Zoom</Text>
                    <Text fontSize="xs" color="gray.500">Online classes</Text>
                  </Box>
                </HStack>
                <Button size="sm" colorScheme="red" variant="ghost">Disconnect</Button>
              </Flex>
            </Grid>
          </Box>
        );
      case "API Access":
        return (
          <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" maxW="800px">
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="gray.800">API Keys</Text>
                <Text fontSize="sm" color="gray.600">Manage API keys for custom integrations.</Text>
              </Box>
            </Flex>
            <Table.Root variant="line" size="sm">
              <Table.Header bg="gray.50">
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Key Prefix</Table.ColumnHeader>
                  <Table.ColumnHeader>Created</Table.ColumnHeader>
                  <Table.ColumnHeader>Last Used</Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {apiKeys.map(key => (
                  <Table.Row key={key.id}>
                    <Table.Cell fontWeight="medium">{key.name}</Table.Cell>
                    <Table.Cell fontFamily="mono" fontSize="xs">{key.prefix}</Table.Cell>
                    <Table.Cell>{key.created}</Table.Cell>
                    <Table.Cell>{key.lastUsed}</Table.Cell>
                    <Table.Cell textAlign="right"><IconButton aria-label="Revoke" size="xs" variant="ghost" colorScheme="red" onClick={() => setItemToDelete({ type: 'api_key', id: key.id, name: key.name })}><Trash2 size={14} /></IconButton></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        );
      case "Access groups":
        if (editingAccessGroup) {
          return (
            <VStack align="stretch" gap={6} maxW="1000px">
              <Flex justify="space-between" align="center">
                <Text fontSize="3xl" fontWeight="bold" color="gray.800" fontFamily="serif">
                  {editingAccessGroup.id ? `Edit ${editingAccessGroup.name}` : "New Access Group"}
                </Text>
                <HStack>
                  <Button variant="outline" size="sm" onClick={() => setEditingAccessGroup(null)}>Cancel</Button>
                  <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} size="sm" onClick={() => {
                    if (editingAccessGroup.id) {
                      setAccessGroups(accessGroups.map(g => g.id === editingAccessGroup.id ? editingAccessGroup : g));
                    } else {
                      setAccessGroups([...accessGroups, { ...editingAccessGroup, id: Date.now(), members: 0 }]);
                    }
                    setEditingAccessGroup(null);
                  }}>Save</Button>
                </HStack>
              </Flex>

              <Grid templateColumns="1fr" gap={8}>
                <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                  <Grid templateColumns="250px 1fr" gap={8}>
                    <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">General information</Text>
                    <VStack align="stretch" gap={6}>
                      <Flex gap={4} align="flex-end">
                        <Box flex="1">
                          <Field label="Name">
                            <Input value={editingAccessGroup.name || ""} onChange={(e) => setEditingAccessGroup({...editingAccessGroup, name: e.target.value})} />
                          </Field>
                        </Box>
                        <Box w="40px" h="40px" borderRadius="md" bg={`${editingAccessGroup.color || 'gray'}.400`} cursor="pointer" />
                      </Flex>
                      <Field label="Description">
                        <Input value={editingAccessGroup.description || ""} onChange={(e) => setEditingAccessGroup({...editingAccessGroup, description: e.target.value})} />
                      </Field>
                      <Field label="Learner tag">
                        <Input value={editingAccessGroup.name || ""} readOnly bg="gray.50" />
                      </Field>
                    </VStack>
                  </Grid>
                </Box>

                <Box bg="white" p={8} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
                  <Grid templateColumns="250px 1fr" gap={8}>
                    <Text fontSize="xl" fontWeight="bold" color="gray.800" fontFamily="serif">Users</Text>
                    <VStack align="stretch" gap={0} separator={<Box borderBottomWidth="1px" borderColor="gray.100" />}>
                      {users.map((user) => (
                        <Flex key={user.id} py={4} align="center" justify="space-between">
                          <HStack gap={4}>
                            <Checkbox colorScheme="teal" />
                            <Box>
                              <Text fontWeight="medium" color="gray.800">{user.name}</Text>
                              <Text fontSize="sm" color="gray.500">{user.role}</Text>
                              <Badge colorScheme="blue" variant="subtle" mt={1} fontSize="xs">Teacher</Badge>
                            </Box>
                          </HStack>
                          <HStack>
                            <Badge colorScheme="orange" variant="subtle">{user.name}</Badge>
                            <Badge colorScheme="gray" variant="subtle">Public</Badge>
                          </HStack>
                        </Flex>
                      ))}
                    </VStack>
                  </Grid>
                </Box>
              </Grid>
            </VStack>
          );
        }

        return (
          <VStack align="stretch" gap={6} maxW="1000px">
            <Flex justify="space-between" align="center" mb={2}>
              <HStack gap={4}>
                <Checkbox colorScheme="teal"><Text fontSize="sm">Display access groups</Text></Checkbox>
                </HStack>
            </Flex>
            <Text fontSize="sm" color="gray.600" mb={6}>
              When an access group is assigned to a learner or contact, only users linked to that access group can view the learner or contact's details. You can also use access groups to make sure teachers only see their own learners on the calendar; however, they don't stop teachers from seeing each other's names. You can add and edit users from the <Text as="span" textDecoration="underline" cursor="pointer" onClick={() => setActiveTab("Users")}>Users page</Text>.
            </Text>

            <VStack align="stretch" gap={0} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" overflow="hidden">
              {accessGroups.map((group, index) => (
                <Flex key={group.id} p={5} align="center" justify="space-between" borderBottomWidth={index === accessGroups.length - 1 ? 0 : "1px"} borderColor="gray.100" _hover={{ bg: "gray.50" }}>
                  <Box>
                    <Text fontWeight="medium" color="gray.800" mb={1}>{group.name}</Text>
                    <Text fontSize="sm" color="gray.500">{group.description} | Group members: {group.members}</Text>
                  </Box>
                  <HStack gap={4}>
                    <Box w={6} h={6} borderRadius="sm" bg={`${group.color}.100`} />
                    <IconButton aria-label="More options" size="sm" variant="ghost" onClick={() => setEditingAccessGroup(group)}>
                      <MoreHorizontal size={18} color="gray.500" />
                    </IconButton>
                  </HStack>
                </Flex>
              ))}
            </VStack>
          </VStack>
        );
      default:
        return <Text>Content for {activeTab} is under construction.</Text>;
    }
  };


  const renderHeaderActions = () => {
    switch (activeTab) {
      case "Branches":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm" onClick={() => setEditingLocation({ name: "", address: "", isPrimary: false, classrooms: [] })}><Plus size={16} style={{marginRight: '8px'}} /> Add Branch</Button>;
      case "Prospects":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Plus size={16} style={{marginRight: '8px'}} /> Add prospect status</Button>;
      case "Roles":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm" onClick={() => setEditingRole({ name: "", description: "" })}><Plus size={16} style={{marginRight: '8px'}} /> Add Role</Button>;
      case "Users":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm" onClick={() => setEditingUser({ name: "", email: "", role: "" })}><Plus size={16} style={{marginRight: '8px'}} /> Invite User</Button>;
      case "Access groups":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm" onClick={() => setEditingAccessGroup({ name: "", description: "", color: "blue" })}><Plus size={16} style={{marginRight: '8px'}} /> New</Button>;
      case "Academic settings":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Plus size={16} style={{marginRight: '8px'}} /> Add Term</Button>;
      case "Assessments and materials":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Plus size={16} style={{marginRight: '8px'}} /> Add Material</Button>;
      case "SMS and email templates":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Plus size={16} style={{marginRight: '8px'}} /> New</Button>;
      case "Labels":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm" onClick={() => { setEditingLabel({ name: "", color: "#E34433" }); setIsEditingLabel(true); }}><Plus size={16} style={{marginRight: '8px'}} /> New label</Button>;
      case "Letter templates":
      case "Lesson templates":
      case "Questionnaires":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Plus size={16} style={{marginRight: '8px'}} /> Create New</Button>;
      case "API Access":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Key size={16} style={{marginRight: '8px'}} /> Generate Key</Button>;
      default:
        return null;
    }
  };

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white">
      {/* Settings Sidebar */}
      <Box w="250px" borderRightWidth="1px" borderColor="gray.200" bg="#F7FAFC" py={6} overflowY="auto" h="calc(100vh - 64px)">
        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={4} px={6} letterSpacing="wider">
          SETTINGS
        </Text>
        <VStack align="stretch" gap={0}>
          {sidebarItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <Flex
                key={item}
                align="center"
                justify="space-between"
                py={2.5}
                px={6}
                bg={isActive ? "#E6F2F2" : "transparent"}
                color={isActive ? "#007D79" : "gray.700"}
                cursor="pointer"
                _hover={{ bg: isActive ? "#E6F2F2" : "gray.100" }}
                onClick={() => setActiveTab(item)}
              >
                <Text fontSize="sm" fontWeight={isActive ? "500" : "400"}>{item}</Text>
                {isActive && <ChevronRight size={16} />}
              </Flex>
            );
          })}
        </VStack>
      </Box>

      {/* Settings Content */}
      <Box flex="1" p={10} bg="white" overflowY="auto" h="calc(100vh - 64px)">
        <Flex justify="space-between" align="center" mb={8}>
          <Text fontFamily="Georgia, serif" fontSize="3xl" fontWeight="bold" color="gray.800">
            {activeTab}
          </Text>
          <HStack gap={4}>
            {renderHeaderActions()}
            <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} px={6}>
              Save
            </Button>
          </HStack>
        </Flex>

        {renderContent()}
      </Box>

      {/* Delete Confirmation Dialog */}
      <DialogRoot open={!!itemToDelete} onOpenChange={(e) => !e.open && setItemToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Text>Are you sure you want to delete <strong>{itemToDelete?.name}</strong>? This action cannot be undone.</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={handleDeleteConfirm}>Delete {itemToDelete?.type}</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
}

