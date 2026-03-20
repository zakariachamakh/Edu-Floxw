import { Box, Flex, Text, HStack, VStack, Button, Input, Grid, Badge, Avatar, IconButton, Textarea } from "@chakra-ui/react";
import { Check, ChevronRight, Upload, X, Search, Plus, User, CreditCard, BookOpen, Mail } from "lucide-react";
import { useState } from "react";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Parent / Guardian", icon: User },
  { id: 3, title: "Course Selection", icon: BookOpen },
  { id: 4, title: "Billing Setup", icon: CreditCard },
  { id: 5, title: "Portal Access", icon: Mail },
  { id: 6, title: "Review", icon: Check },
];

const MOCK_COURSES = [
  { id: 1, name: "English B2", teacher: "Zakaria Chamakh", schedule: "Mon & Wed, 4-5pm", price: 130, spots: 4 },
  { id: 2, name: "Math Advanced", teacher: "Sarah Jones", schedule: "Tue & Thu, 5-6pm", price: 150, spots: 2 },
  { id: 3, name: "Science Lab", teacher: "David Chen", schedule: "Fri, 3-5pm", price: 180, spots: 8 },
  { id: 4, name: "Art History", teacher: "Emma Wilson", schedule: "Wed, 2-4pm", price: 110, spots: 12 },
];

export function StudentRegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courses: [] as any[],
    parentName: "",
    parentEmail: "",
    billingFrequency: "Monthly",
    sendPortalInvite: true,
  });

  const handleNext = () => setCurrentStep(Math.min(currentStep + 1, 6));
  const handleBack = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const toggleCourse = (course: any) => {
    setStudentData(prev => {
      const exists = prev.courses.find(c => c.id === course.id);
      if (exists) {
        return { ...prev, courses: prev.courses.filter(c => c.id !== course.id) };
      } else {
        return { ...prev, courses: [...prev.courses, course] };
      }
    });
  };

  const totalBilling = studentData.courses.reduce((sum, course) => sum + course.price, 0);

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="gray.50" direction="column" h="calc(100vh - 64px)">
      {/* Header & Progress */}
      <Box bg="white" p={6} borderBottomWidth="1px" borderColor="gray.200">
        <Text fontSize="2xl" fontWeight="bold" fontFamily="Georgia, serif" mb={6}>Register New Student</Text>
        
        <Flex justify="space-between" position="relative">
          <Box position="absolute" top="12px" left="0" right="0" h="2px" bg="gray.200" zIndex={0} />
          <Box position="absolute" top="12px" left="0" w={`${((currentStep - 1) / 5) * 100}%`} h="2px" bg="#007D79" zIndex={0} transition="width 0.3s" />
          
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;
            
            return (
              <VStack key={step.id} gap={2} zIndex={1}>
                <Flex 
                  w={6} h={6} 
                  borderRadius="full" 
                  align="center" justify="center"
                  bg={isActive || isCompleted ? "#007D79" : "white"}
                  borderWidth="2px"
                  borderColor={isActive || isCompleted ? "#007D79" : "gray.300"}
                  color={isActive || isCompleted ? "white" : "gray.400"}
                >
                  {isCompleted ? <Check size={12} /> : <Text fontSize="xs" fontWeight="bold">{step.id}</Text>}
                </Flex>
                <Text fontSize="xs" fontWeight={isActive ? "bold" : "medium"} color={isActive ? "#007D79" : "gray.500"}>
                  {step.title}
                </Text>
              </VStack>
            );
          })}
        </Flex>
      </Box>

      <Flex flex="1" overflow="hidden">
        {/* Left Side - Form Content */}
        <Box flex="1" p={8} overflowY="auto">
          <Box maxW="800px" mx="auto" bg="white" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
            
            {currentStep === 1 && (
              <VStack align="stretch" gap={6}>
                <Text fontSize="xl" fontWeight="bold">Personal Information</Text>
                
                <Flex justify="center" mb={4}>
                  <Flex w="120px" h="120px" borderRadius="full" bg="gray.100" align="center" justify="center" cursor="pointer" _hover={{ bg: "gray.200" }} position="relative" overflow="hidden">
                    <VStack gap={1} color="gray.500">
                      <Upload size={24} />
                      <Text fontSize="xs">Upload Photo</Text>
                    </VStack>
                  </Flex>
                </Flex>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>First Name *</Text>
                    <Input placeholder="e.g. Sarah" value={studentData.firstName} onChange={e => setStudentData({...studentData, firstName: e.target.value})} />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Last Name *</Text>
                    <Input placeholder="e.g. Martinez" value={studentData.lastName} onChange={e => setStudentData({...studentData, lastName: e.target.value})} />
                  </Box>
                </Grid>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Date of Birth</Text>
                    <Input type="date" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Gender</Text>
                    <NativeSelectRoot>
                      <NativeSelectField placeholder="Select gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not">Prefer not to say</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                </Grid>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Email</Text>
                    <Input placeholder="sarah@example.com" value={studentData.email} onChange={e => setStudentData({...studentData, email: e.target.value})} />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Phone</Text>
                    <Input placeholder="+44 7700 900000" value={studentData.phone} onChange={e => setStudentData({...studentData, phone: e.target.value})} />
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Address</Text>
                  <Input placeholder="123 Main St" mb={2} />
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Input placeholder="City" />
                    <NativeSelectRoot>
                      <NativeSelectField placeholder="Country">
                        <option value="uk">United Kingdom</option>
                        <option value="us">United States</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Grid>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>Labels</Text>
                  <Button size="sm" variant="outline"><Box asChild mr={2}><Plus size={14} /></Box> Add Label</Button>
                </Box>
              </VStack>
            )}

            {currentStep === 2 && (
              <VStack align="stretch" gap={6}>
                <Text fontSize="xl" fontWeight="bold">Parent / Guardian</Text>
                
                <Box position="relative">
                  <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400">
                    <Search size={16} />
                  </Box>
                  <Input pl={9} placeholder="Search existing contacts..." />
                </Box>

                <Flex align="center" gap={4}>
                  <Box flex="1" h="1px" bg="gray.200" />
                  <Text fontSize="sm" color="gray.500">OR</Text>
                  <Box flex="1" h="1px" bg="gray.200" />
                </Flex>

                <Box p={6} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="gray.50">
                  <Text fontSize="md" fontWeight="bold" mb={4}>Create New Contact</Text>
                  <Grid templateColumns="1fr 1fr" gap={4} mb={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>First Name</Text>
                      <Input bg="white" value={studentData.parentName} onChange={e => setStudentData({...studentData, parentName: e.target.value})} />
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Last Name</Text>
                      <Input bg="white" />
                    </Box>
                  </Grid>
                  <Box mb={4}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Relationship</Text>
                    <NativeSelectRoot bg="white">
                      <NativeSelectField placeholder="Select relationship">
                        <option value="mother">Mother</option>
                        <option value="father">Father</option>
                        <option value="guardian">Guardian</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Email</Text>
                      <Input bg="white" value={studentData.parentEmail} onChange={e => setStudentData({...studentData, parentEmail: e.target.value})} />
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Phone</Text>
                      <Input bg="white" />
                    </Box>
                  </Grid>
                </Box>

                <Box>
                  <Flex align="center" justify="space-between" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Box>
                      <Text fontWeight="medium">Emergency Contact</Text>
                      <Text fontSize="sm" color="gray.500">Same as parent/guardian</Text>
                    </Box>
                    <Switch defaultChecked />
                  </Flex>
                </Box>
              </VStack>
            )}

            {currentStep === 3 && (
              <VStack align="stretch" gap={6}>
                <Text fontSize="xl" fontWeight="bold">Course Selection</Text>
                
                <Grid templateColumns="1fr 1fr" gap={4}>
                  {MOCK_COURSES.map(course => {
                    const isSelected = studentData.courses.some(c => c.id === course.id);
                    return (
                      <Box 
                        key={course.id} 
                        p={4} 
                        borderWidth="2px" 
                        borderColor={isSelected ? "#007D79" : "gray.200"} 
                        borderRadius="md"
                        bg={isSelected ? "#E6F4F1" : "white"}
                        cursor="pointer"
                        onClick={() => toggleCourse(course)}
                        _hover={{ borderColor: isSelected ? "#007D79" : "gray.300" }}
                      >
                        <Flex justify="space-between" align="flex-start" mb={2}>
                          <Text fontWeight="bold">{course.name}</Text>
                          <Text fontWeight="bold" color="#007D79">£{course.price}</Text>
                        </Flex>
                        <Text fontSize="sm" color="gray.600" mb={1}>{course.teacher}</Text>
                        <Text fontSize="sm" color="gray.600" mb={3}>{course.schedule}</Text>
                        <Flex justify="space-between" align="center">
                          <Badge colorPalette={course.spots > 0 ? "green" : "red"} variant="subtle">
                            {course.spots} spots left
                          </Badge>
                          <Button size="xs" variant={isSelected ? "solid" : "outline"} bg={isSelected ? "#007D79" : undefined} color={isSelected ? "white" : undefined}>
                            {isSelected ? "Selected" : "Select"}
                          </Button>
                        </Flex>
                      </Box>
                    );
                  })}
                </Grid>

                {studentData.courses.length > 0 && (
                  <Box p={4} bg="gray.50" borderRadius="md">
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Selected Courses:</Text>
                    <Flex wrap="wrap" gap={2}>
                      {studentData.courses.map(c => (
                        <Badge key={c.id} colorPalette="blue" px={2} py={1} borderRadius="full">
                          {c.name} <Box asChild ml={1} cursor="pointer" onClick={() => toggleCourse(c)}><X size={12} /></Box>
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                )}

                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Start Date</Text>
                  <Input type="date" w="200px" />
                </Box>
              </VStack>
            )}

            {currentStep === 4 && (
              <VStack align="stretch" gap={6}>
                <Text fontSize="xl" fontWeight="bold">Billing Setup</Text>
                
                <Box p={6} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontWeight="bold" mb={4}>Selected Courses</Text>
                  {studentData.courses.length === 0 ? (
                    <Text color="gray.500" fontSize="sm">No courses selected.</Text>
                  ) : (
                    <VStack align="stretch" gap={2}>
                      {studentData.courses.map(c => (
                        <Flex key={c.id} justify="space-between">
                          <Text>{c.name}</Text>
                          <Text>£{c.price}</Text>
                        </Flex>
                      ))}
                      <Box h="1px" bg="gray.200" my={2} />
                      <Flex justify="space-between" fontWeight="bold" fontSize="lg">
                        <Text>Total</Text>
                        <Text color="#007D79">£{totalBilling}</Text>
                      </Flex>
                    </VStack>
                  )}
                </Box>

                <Flex align="center" justify="space-between" p={4} bg="gray.50" borderRadius="md">
                  <Text fontWeight="medium">Apply custom pricing?</Text>
                  <Switch />
                </Flex>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Scholarship / Discount</Text>
                    <NativeSelectRoot>
                      <NativeSelectField placeholder="None">
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount (£)</option>
                        <option value="sibling">Sibling Discount (10%)</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Billing Frequency</Text>
                    <NativeSelectRoot>
                      <NativeSelectField value={studentData.billingFrequency} onChange={(e: any) => setStudentData({...studentData, billingFrequency: e.target.value})}>
                        <option value="Per lesson">Per lesson</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Termly">Termly</option>
                        <option value="Annually">Annually</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>Payment Method Preference</Text>
                  <NativeSelectRoot>
                    <NativeSelectField>
                      <option value="online">Online (Credit Card/Stripe)</option>
                      <option value="manual">Manual (Bank Transfer/Cash)</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Box>

                <Flex align="center" justify="space-between" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Box>
                    <Text fontWeight="medium">Generate first invoice now?</Text>
                    <Text fontSize="sm" color="gray.500">Invoice will be created in Draft status</Text>
                  </Box>
                  <Switch defaultChecked />
                </Flex>
              </VStack>
            )}

            {currentStep === 5 && (
              <VStack align="stretch" gap={6}>
                <Text fontSize="xl" fontWeight="bold">Portal Access</Text>
                
                <Flex align="center" justify="space-between" p={4} bg="#E6F4F1" borderRadius="md" borderWidth="1px" borderColor="#007D79">
                  <Box>
                    <Text fontWeight="bold" color="#007D79">Send portal invitation?</Text>
                    <Text fontSize="sm" color="gray.600">Allows student to log in and view schedule/materials</Text>
                  </Box>
                  <Switch 
                    colorPalette="teal" 
                    checked={studentData.sendPortalInvite} 
                    onCheckedChange={(e) => setStudentData({...studentData, sendPortalInvite: e.checked})} 
                  />
                </Flex>

                {studentData.sendPortalInvite && (
                  <>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>Invitation Method</Text>
                      <VStack align="stretch" gap={2}>
                        <Flex p={3} borderWidth="1px" borderColor="#007D79" borderRadius="md" bg="gray.50" align="center" gap={3}>
                          <Box w={4} h={4} borderRadius="full" borderWidth="4px" borderColor="#007D79" bg="white" />
                          <Box>
                            <Text fontWeight="medium">Email magic link (Recommended)</Text>
                            <Text fontSize="xs" color="gray.500">Student clicks a secure link to log in instantly</Text>
                          </Box>
                        </Flex>
                        <Flex p={3} borderWidth="1px" borderColor="gray.200" borderRadius="md" align="center" gap={3}>
                          <Box w={4} h={4} borderRadius="full" borderWidth="1px" borderColor="gray.300" />
                          <Box>
                            <Text fontWeight="medium">Set password manually</Text>
                            <Text fontSize="xs" color="gray.500">You set a temporary password for them</Text>
                          </Box>
                        </Flex>
                      </VStack>
                    </Box>

                    <Flex align="center" justify="space-between" p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                      <Box>
                        <Text fontWeight="medium">Also invite parent?</Text>
                        <Text fontSize="sm" color="gray.500">Send a separate parent portal invite to {studentData.parentEmail || "parent email"}</Text>
                      </Box>
                      <Switch defaultChecked={!!studentData.parentEmail} disabled={!studentData.parentEmail} />
                    </Flex>

                    <Box p={6} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="gray.50">
                      <Text fontSize="sm" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={4}>Email Preview</Text>
                      <Box bg="white" p={6} borderRadius="md" shadow="sm">
                        <Box w={10} h={10} bg="#007D79" borderRadius="sm" mb={4} />
                        <Text fontSize="lg" fontWeight="bold" mb={2}>Welcome to EduFlow!</Text>
                        <Text fontSize="sm" color="gray.600" mb={4}>
                          Hi {studentData.firstName || "Student"},<br/><br/>
                          You've been invited to access your student portal. Click the button below to log in securely.
                        </Text>
                        <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} w="full">Log In to Portal</Button>
                      </Box>
                    </Box>
                  </>
                )}
              </VStack>
            )}

            {currentStep === 6 && (
              <VStack align="stretch" gap={6}>
                <Text fontSize="xl" fontWeight="bold">Review & Confirm</Text>
                
                <Grid templateColumns="1fr 1fr" gap={6}>
                  <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Flex justify="space-between" mb={2}>
                      <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Personal Info</Text>
                      <Text fontSize="xs" color="#007D79" cursor="pointer" onClick={() => setCurrentStep(1)}>Edit</Text>
                    </Flex>
                    <Text fontWeight="medium">{studentData.firstName} {studentData.lastName || "Student"}</Text>
                    <Text fontSize="sm" color="gray.600">{studentData.email || "No email"}</Text>
                    <Text fontSize="sm" color="gray.600">{studentData.phone || "No phone"}</Text>
                  </Box>

                  <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Flex justify="space-between" mb={2}>
                      <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Parent / Guardian</Text>
                      <Text fontSize="xs" color="#007D79" cursor="pointer" onClick={() => setCurrentStep(2)}>Edit</Text>
                    </Flex>
                    <Text fontWeight="medium">{studentData.parentName || "None added"}</Text>
                    <Text fontSize="sm" color="gray.600">{studentData.parentEmail}</Text>
                  </Box>

                  <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Flex justify="space-between" mb={2}>
                      <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Courses</Text>
                      <Text fontSize="xs" color="#007D79" cursor="pointer" onClick={() => setCurrentStep(3)}>Edit</Text>
                    </Flex>
                    {studentData.courses.length > 0 ? (
                      <VStack align="stretch" gap={1}>
                        {studentData.courses.map(c => <Text key={c.id} fontSize="sm">• {c.name}</Text>)}
                      </VStack>
                    ) : (
                      <Text fontSize="sm" color="gray.500">No courses selected</Text>
                    )}
                  </Box>

                  <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Flex justify="space-between" mb={2}>
                      <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Billing</Text>
                      <Text fontSize="xs" color="#007D79" cursor="pointer" onClick={() => setCurrentStep(4)}>Edit</Text>
                    </Flex>
                    <Text fontSize="sm">Total: <Text as="span" fontWeight="bold">£{totalBilling}</Text></Text>
                    <Text fontSize="sm">Frequency: {studentData.billingFrequency}</Text>
                  </Box>
                </Grid>

                <Button size="lg" bg="#007D79" color="white" _hover={{ bg: "#00635f" }} mt={4}>
                  Create Student
                </Button>
              </VStack>
            )}

            {/* Navigation Buttons */}
            <Flex justify="space-between" mt={10} pt={6} borderTopWidth="1px" borderColor="gray.200">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>
              {currentStep < 6 && (
                <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleNext}>
                  Next Step <Box asChild ml={2}><ChevronRight size={16} /></Box>
                </Button>
              )}
            </Flex>
          </Box>
        </Box>

        {/* Right Side - Live Preview */}
        <Box w="400px" bg="white" borderLeftWidth="1px" borderColor="gray.200" p={6} overflowY="auto">
          <Text fontSize="sm" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={4}>Live Preview</Text>
          
          <Box p={6} borderWidth="1px" borderColor="gray.200" borderRadius="xl" shadow="sm">
            <VStack gap={4} align="center" mb={6}>
              <Avatar.Root size="2xl">
                <Avatar.Fallback name={`${studentData.firstName} ${studentData.lastName}`} />
              </Avatar.Root>
              <Box textAlign="center">
                <Text fontSize="xl" fontWeight="bold">{studentData.firstName || "New"} {studentData.lastName || "Student"}</Text>
                <Text fontSize="sm" color="gray.500">{studentData.email || "email@example.com"}</Text>
              </Box>
            </VStack>

            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={2}>Enrolled Courses</Text>
                {studentData.courses.length > 0 ? (
                  <VStack align="stretch" gap={2}>
                    {studentData.courses.map(c => (
                      <Flex key={c.id} justify="space-between" align="center" p={2} bg="gray.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="medium">{c.name}</Text>
                        <Badge colorPalette="blue" variant="subtle">£{c.price}</Badge>
                      </Flex>
                    ))}
                  </VStack>
                ) : (
                  <Text fontSize="sm" color="gray.400" fontStyle="italic">No courses selected yet</Text>
                )}
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={2}>Billing Summary</Text>
                <Flex justify="space-between" p={3} bg="#E6F4F1" borderRadius="md" color="#007D79">
                  <Text fontSize="sm" fontWeight="medium">{studentData.billingFrequency} Total</Text>
                  <Text fontSize="sm" fontWeight="bold">£{totalBilling}</Text>
                </Flex>
              </Box>

              {studentData.parentName && (
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" mb={2}>Family</Text>
                  <Flex align="center" gap={3} p={2} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                    <Avatar.Root size="sm">
                      <Avatar.Fallback name={studentData.parentName} />
                    </Avatar.Root>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">{studentData.parentName}</Text>
                      <Text fontSize="xs" color="gray.500">Parent/Guardian</Text>
                    </Box>
                  </Flex>
                </Box>
              )}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
