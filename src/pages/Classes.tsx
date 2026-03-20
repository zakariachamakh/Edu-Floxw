import { useState } from "react";
import { Box, Flex, Text, Button, Input, Table, Badge, HStack, VStack, Grid, Textarea, IconButton } from "@chakra-ui/react";
import { Plus, Search, MoreHorizontal, Image as ImageIcon, X } from "lucide-react";
import { DrawerRoot, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerCloseTrigger, DrawerActionTrigger } from "../components/ui/drawer";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { Checkbox } from "../components/ui/checkbox";

const initialClasses = [
  { id: 1, name: "Intensive English Course", type: "Single Subject", price: "$120.00", billing: "Monthly", status: "Active" },
  { id: 2, name: "Full Stack Development Bootcamp", type: "Bundle", price: "$500.00", billing: "One-off", status: "Active" },
  { id: 3, name: "Advanced Mathematics", type: "Single Subject", price: "$80.00", billing: "Monthly", status: "Draft" },
];

export function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [isNewClassOpen, setIsNewClassOpen] = useState(false);
  const [classType, setClassType] = useState("single"); // 'single' or 'bundle'
  const [pricingModel, setPricingModel] = useState("recurring"); // 'recurring' or 'one-off'
  const [isBookable, setIsBookable] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [manualConfirm, setManualConfirm] = useState(false);
  const [paymentRequirement, setPaymentRequirement] = useState("no-payment");

  return (
    <Box maxW="1400px" mx="auto" w="full" bg="white" minH="100vh">
      <Flex justify="space-between" align="center" px={8} py={6} borderBottomWidth="1px" borderColor="gray.200">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">Classes</Text>
          <Text fontSize="sm" color="gray.500" mt={1}>Manage subjects and course bundles</Text>
        </Box>
        <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => setIsNewClassOpen(true)}>
          <Plus size={18} style={{ marginRight: '8px' }} /> New class
        </Button>
      </Flex>

      <Box px={8} py={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <HStack gap={4}>
            <Box position="relative" w="300px">
              <Box position="absolute" left={3} top={2.5} color="gray.400">
                <Search size={18} />
              </Box>
              <Input pl={10} placeholder="Search classes..." bg="white" />
            </Box>
            <Button variant="outline">Filter</Button>
          </HStack>
        </Flex>

        <Box border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden">
          <Table.Root size="sm" variant="line">
            <Table.Header bg="gray.50">
              <Table.Row>
                <Table.ColumnHeader py={3} px={4} color="gray.600" fontWeight="600">Name</Table.ColumnHeader>
                <Table.ColumnHeader py={3} px={4} color="gray.600" fontWeight="600">Type</Table.ColumnHeader>
                <Table.ColumnHeader py={3} px={4} color="gray.600" fontWeight="600">Price</Table.ColumnHeader>
                <Table.ColumnHeader py={3} px={4} color="gray.600" fontWeight="600">Billing</Table.ColumnHeader>
                <Table.ColumnHeader py={3} px={4} color="gray.600" fontWeight="600">Status</Table.ColumnHeader>
                <Table.ColumnHeader py={3} px={4} color="gray.600" fontWeight="600" textAlign="right"></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {classes.map((cls) => (
                <Table.Row key={cls.id} _hover={{ bg: "gray.50" }}>
                  <Table.Cell py={3} px={4}>
                    <Text fontWeight="500" color="gray.900">{cls.name}</Text>
                  </Table.Cell>
                  <Table.Cell py={3} px={4}>
                    <Badge colorPalette={cls.type === "Bundle" ? "purple" : "blue"} variant="subtle">
                      {cls.type}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell py={3} px={4}>
                    <Text color="gray.700">{cls.price}</Text>
                  </Table.Cell>
                  <Table.Cell py={3} px={4}>
                    <Text color="gray.700">{cls.billing}</Text>
                  </Table.Cell>
                  <Table.Cell py={3} px={4}>
                    <Badge colorPalette={cls.status === "Active" ? "green" : "gray"} variant="subtle">
                      {cls.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell py={3} px={4} textAlign="right">
                    <IconButton variant="ghost" size="sm" aria-label="More options">
                      <MoreHorizontal size={16} />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>

      {/* Stripe-like New Class Drawer */}
      <DrawerRoot open={isNewClassOpen} onOpenChange={(e) => setIsNewClassOpen(e.open)} size="full">
        <DrawerContent bg="gray.50" maxW="100vw">
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.200" bg="white" px={8} py={4}>
            <Flex justify="space-between" align="center">
              <Text fontSize="xl" fontWeight="bold" color="gray.900">Add a class</Text>
              <HStack gap={4}>
                <Button variant="ghost" onClick={() => setIsNewClassOpen(false)}>Cancel</Button>
                <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }}>Add class</Button>
                <IconButton variant="ghost" onClick={() => setIsNewClassOpen(false)} aria-label="Close">
                  <X size={20} />
                </IconButton>
              </HStack>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Flex h="calc(100vh - 73px)">
              {/* Left Column: Form */}
              <Box flex="1" p={8} overflowY="auto" bg="white" borderRightWidth="1px" borderColor="gray.200">
                <VStack align="stretch" gap={8} maxW="800px" mx="auto">
                  
                  {/* Basic Info */}
                  <Box>
                    <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Type</Text>
                    <NativeSelectRoot mb={4}>
                      <NativeSelectField items={["Course", "1-on-1 Session", "Material", "Workshop"]} defaultValue="Course" />
                    </NativeSelectRoot>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Name (required)</Text>
                    <Input placeholder="e.g. IELTS Preparation" size="lg" />
                    <Text fontSize="xs" color="gray.500" mt={1}>Name of the class or service, visible to learners.</Text>
                  </Box>

                  <Box>
                    <Checkbox
                      checked={isBookable}
                      onCheckedChange={(e) => setIsBookable(!!e.checked)}
                      colorPalette="teal"
                    >
                      <Text fontSize="sm" fontWeight="500">This session can be booked in the calendar</Text>
                    </Checkbox>
                  </Box>

                  {isBookable && (
                    <Box p={5} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
                      <Text fontSize="md" fontWeight="bold" mb={4} color="gray.900">Booking Options</Text>
                      
                      <Grid templateColumns="1fr 1fr" gap={6} mb={4}>
                        <Box>
                          <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Duration (mins)</Text>
                          <Input type="number" placeholder="60" />
                        </Box>
                        <Box>
                          <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Calendar Colour</Text>
                          <Flex gap={2}>
                            <Box w="40px" h="40px" borderRadius="md" bg="#9575CD" border="1px solid" borderColor="gray.300" />
                            <Input defaultValue="#9575CD" />
                          </Flex>
                        </Box>
                      </Grid>

                      <VStack align="start" gap={3} mb={6}>
                        <Checkbox checked={isOnline} onCheckedChange={(e) => setIsOnline(!!e.checked)} colorPalette="teal">
                          <Text fontSize="sm">This is an online video session</Text>
                        </Checkbox>
                        <Checkbox checked={manualConfirm} onCheckedChange={(e) => setManualConfirm(!!e.checked)} colorPalette="teal">
                          <Text fontSize="sm">Manually confirm these bookings on the calendar</Text>
                        </Checkbox>
                      </VStack>

                      <Text fontSize="sm" fontWeight="600" mb={3} color="gray.700">Online booking payment</Text>
                      <VStack align="start" gap={3}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input type="radio" name="payment" value="pre-payment" checked={paymentRequirement === "pre-payment"} onChange={() => setPaymentRequirement("pre-payment")} style={{ accentColor: '#007D79' }} />
                          <Text fontSize="sm">Enable pre-payment for online booking</Text>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input type="radio" name="payment" value="imprint" checked={paymentRequirement === "imprint"} onChange={() => setPaymentRequirement("imprint")} style={{ accentColor: '#007D79' }} />
                          <Text fontSize="sm">Require card imprint for online booking (guarantee only)</Text>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input type="radio" name="payment" value="no-payment" checked={paymentRequirement === "no-payment"} onChange={() => setPaymentRequirement("no-payment")} style={{ accentColor: '#007D79' }} />
                          <Text fontSize="sm">No payment required for online booking</Text>
                        </label>
                      </VStack>
                    </Box>
                  )}

                  <Box>
                    <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Description / Comments</Text>
                    <Textarea placeholder="Appears at checkout, on the learner portal, and in quotes." rows={4} />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Image</Text>
                    <Flex align="center" justify="center" border="1px dashed" borderColor="gray.300" borderRadius="md" p={6} bg="gray.50" cursor="pointer" _hover={{ bg: "gray.100" }}>
                      <VStack gap={2}>
                        <ImageIcon size={24} color="var(--chakra-colors-gray-400)" />
                        <Text fontSize="sm" color="gray.600" fontWeight="500">Upload image</Text>
                        <Text fontSize="xs" color="gray.500">JPEG, PNG, or WEBP under 2MB.</Text>
                      </VStack>
                    </Flex>
                  </Box>

                  {/* Resources */}
                  <Box borderTopWidth="1px" borderColor="gray.200" pt={8}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.900">Resources</Text>
                    
                    <Box mb={6}>
                      <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Locations / Classrooms</Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Main Campus - Room 101", "Online - Zoom", "Downtown Center"]} placeholder="Select locations..." />
                      </NativeSelectRoot>
                      <Text fontSize="xs" color="gray.500" mt={1}>Select locations this session is provided at.</Text>
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Instructors</Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Sarah Jenkins", "Michael Chen", "David Smith"]} placeholder="Select instructors..." />
                      </NativeSelectRoot>
                      <Text fontSize="xs" color="gray.500" mt={1}>Select the instructors that provide this session.</Text>
                    </Box>
                  </Box>

                  {/* More Details */}
                  <Box borderTopWidth="1px" borderColor="gray.200" pt={8}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.900">More details</Text>
                    
                    <Grid templateColumns="1fr 1fr" gap={6} mb={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Course Code (optional)</Text>
                        <Input placeholder="e.g. ENG-101" />
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Capacity (Max Learners)</Text>
                        <Input type="number" placeholder="0 for unlimited" />
                      </Box>
                    </Grid>

                    <Grid templateColumns="1fr 1fr" gap={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Tax</Text>
                        <NativeSelectRoot>
                          <NativeSelectField items={["No Tax", "Standard Rate (20%)", "Reduced Rate (5%)"]} placeholder="Select..." />
                        </NativeSelectRoot>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Internal Cost ($)</Text>
                        <Input type="number" placeholder="0.00" />
                      </Box>
                    </Grid>
                  </Box>

                  {/* Communications */}
                  <Box borderTopWidth="1px" borderColor="gray.200" pt={8}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.900">Confirmation and cancellation messages</Text>
                    <Text fontSize="sm" color="gray.600" mb={6}>Select the message you'd like to send to learners when a booking is confirmed or cancelled.</Text>
                    
                    <Grid templateColumns="1fr 1fr" gap={6} mb={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Email confirmation</Text>
                        <Flex gap={2}>
                          <NativeSelectRoot flex="1">
                            <NativeSelectField items={["Standard Booking Confirmation", "IELTS Prep Welcome", "None selected"]} defaultValue="Standard Booking Confirmation" />
                          </NativeSelectRoot>
                          <Button variant="outline" size="sm">Preview</Button>
                        </Flex>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Email cancellation</Text>
                        <Flex gap={2}>
                          <NativeSelectRoot flex="1">
                            <NativeSelectField items={["Standard Cancellation", "None selected"]} defaultValue="Standard Cancellation" />
                          </NativeSelectRoot>
                          <Button variant="outline" size="sm">Preview</Button>
                        </Flex>
                      </Box>
                    </Grid>

                    <Box mb={6}>
                      <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.900">Reminders</Text>
                      <Text fontSize="sm" color="gray.600" mb={4}>Select the reminders you'd like to send to learners before their session.</Text>
                      <Button variant="outline" size="sm" colorPalette="teal">Add a reminder</Button>
                    </Box>

                    <Box>
                      <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.900">Follow-up messages</Text>
                      <Text fontSize="sm" color="gray.600" mb={4}>Select the follow-up messages you'd like to send to learners after their session.</Text>
                      <Button variant="outline" size="sm" colorPalette="teal">Add a follow-up</Button>
                    </Box>
                  </Box>

                  {/* Class Type */}
                  <Box borderTopWidth="1px" borderColor="gray.200" pt={8}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.900">Class Type</Text>
                    <Flex gap={4} mb={6}>
                      <Box 
                        flex="1" 
                        p={4} 
                        border="2px solid" 
                        borderColor={classType === "single" ? "#007D79" : "gray.200"} 
                        borderRadius="md" 
                        cursor="pointer"
                        bg={classType === "single" ? "teal.50" : "white"}
                        onClick={() => setClassType("single")}
                      >
                        <Text fontWeight="600" color={classType === "single" ? "#007D79" : "gray.900"}>Single Subject</Text>
                        <Text fontSize="sm" color="gray.500" mt={1}>A standalone course or subject.</Text>
                      </Box>
                      <Box 
                        flex="1" 
                        p={4} 
                        border="2px solid" 
                        borderColor={classType === "bundle" ? "#007D79" : "gray.200"} 
                        borderRadius="md" 
                        cursor="pointer"
                        bg={classType === "bundle" ? "teal.50" : "white"}
                        onClick={() => setClassType("bundle")}
                      >
                        <Text fontWeight="600" color={classType === "bundle" ? "#007D79" : "gray.900"}>Bundle</Text>
                        <Text fontSize="sm" color="gray.500" mt={1}>A collection of multiple subjects.</Text>
                      </Box>
                    </Flex>

                    {classType === "bundle" && (
                      <Box mb={6} p={4} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Included Subjects</Text>
                        <NativeSelectRoot mb={3}>
                          <NativeSelectField items={["Mathematics", "English", "Physics", "Chemistry"]} placeholder="Add a subject..." />
                        </NativeSelectRoot>
                        <VStack align="stretch" gap={2}>
                          <Flex justify="space-between" align="center" p={2} bg="white" borderRadius="sm" border="1px solid" borderColor="gray.200">
                            <Text fontSize="sm" fontWeight="500">Mathematics</Text>
                            <IconButton variant="ghost" size="xs" color="red.500" aria-label="Remove"><X size={14} /></IconButton>
                          </Flex>
                          <Flex justify="space-between" align="center" p={2} bg="white" borderRadius="sm" border="1px solid" borderColor="gray.200">
                            <Text fontSize="sm" fontWeight="500">Physics</Text>
                            <IconButton variant="ghost" size="xs" color="red.500" aria-label="Remove"><X size={14} /></IconButton>
                          </Flex>
                        </VStack>
                      </Box>
                    )}
                  </Box>

                  {/* Pricing */}
                  <Box borderTopWidth="1px" borderColor="gray.200" pt={8}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.900">Pricing</Text>
                    <Flex gap={4} mb={6}>
                      <Box 
                        flex="1" 
                        p={3} 
                        border="2px solid" 
                        borderColor={pricingModel === "recurring" ? "#007D79" : "gray.200"} 
                        borderRadius="md" 
                        cursor="pointer"
                        bg={pricingModel === "recurring" ? "teal.50" : "white"}
                        onClick={() => setPricingModel("recurring")}
                      >
                        <Text fontWeight="600" fontSize="sm" color={pricingModel === "recurring" ? "#007D79" : "gray.900"}>Recurring</Text>
                        <Text fontSize="xs" color="gray.500">Charge an ongoing fee</Text>
                      </Box>
                      <Box 
                        flex="1" 
                        p={3} 
                        border="2px solid" 
                        borderColor={pricingModel === "one-off" ? "#007D79" : "gray.200"} 
                        borderRadius="md" 
                        cursor="pointer"
                        bg={pricingModel === "one-off" ? "teal.50" : "white"}
                        onClick={() => setPricingModel("one-off")}
                      >
                        <Text fontWeight="600" fontSize="sm" color={pricingModel === "one-off" ? "#007D79" : "gray.900"}>One-off</Text>
                        <Text fontSize="xs" color="gray.500">Charge a one-time fee</Text>
                      </Box>
                    </Flex>

                    <Grid templateColumns="1fr 1fr" gap={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Amount (required)</Text>
                        <Flex align="center">
                          <Box px={3} py={2} bg="gray.100" border="1px solid" borderColor="gray.200" borderRight="none" borderLeftRadius="md">
                            <Text fontSize="sm" color="gray.600">$</Text>
                          </Box>
                          <Input placeholder="0.00" borderLeftRadius="none" />
                          <Box px={3} py={2} bg="gray.100" border="1px solid" borderColor="gray.200" borderLeft="none" borderRightRadius="md">
                            <Text fontSize="sm" color="gray.600">USD</Text>
                          </Box>
                        </Flex>
                      </Box>
                      
                      {pricingModel === "recurring" && (
                        <Box>
                          <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Billing period</Text>
                          <NativeSelectRoot>
                            <NativeSelectField items={["Daily", "Weekly", "Monthly", "Every 3 months", "Every 6 months", "Yearly", "Custom"]} defaultValue="Monthly" />
                          </NativeSelectRoot>
                        </Box>
                      )}
                    </Grid>
                  </Box>

                  {/* Teacher Assignment & Compensation */}
                  <Box borderTopWidth="1px" borderColor="gray.200" pt={8} pb={12}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.900">Teacher Assignment & Compensation</Text>
                    
                    {classType === "single" ? (
                      <Box p={5} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
                        <Text fontSize="sm" fontWeight="600" mb={4} color="gray.700">Assign Teacher</Text>
                        <NativeSelectRoot mb={4}>
                          <NativeSelectField items={["Sarah Jenkins", "Michael Chen", "David Smith"]} placeholder="Select a teacher..." />
                        </NativeSelectRoot>

                        <Text fontSize="sm" fontWeight="600" mb={4} color="gray.700">Compensation Model</Text>
                        <NativeSelectRoot mb={4}>
                          <NativeSelectField items={["Percentage per learner", "Flat hourly rate", "Fixed monthly salary"]} defaultValue="Percentage per learner" />
                        </NativeSelectRoot>

                        <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Amount / Percentage</Text>
                        <Input placeholder="e.g. 30 for 30%, or 50 for $50/hr" />
                      </Box>
                    ) : (
                      <VStack align="stretch" gap={4}>
                        <Text fontSize="sm" color="gray.600">Configure compensation for each subject in the bundle.</Text>
                        
                        {/* Subject 1 */}
                        <Box p={5} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                          <Text fontWeight="bold" mb={4} color="gray.900">Mathematics</Text>
                          <Grid templateColumns="1fr 1fr" gap={4} mb={4}>
                            <Box>
                              <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Assign Teacher</Text>
                              <NativeSelectRoot>
                                <NativeSelectField items={["Sarah Jenkins", "Michael Chen", "David Smith"]} placeholder="Select a teacher..." />
                              </NativeSelectRoot>
                            </Box>
                            <Box>
                              <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Compensation Model</Text>
                              <NativeSelectRoot>
                                <NativeSelectField items={["Percentage of bundle", "Flat hourly rate", "Fixed monthly salary"]} defaultValue="Percentage of bundle" />
                              </NativeSelectRoot>
                            </Box>
                          </Grid>
                          <Box>
                            <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Amount / Percentage</Text>
                            <Input placeholder="e.g. 20 for 20% of bundle price" />
                          </Box>
                        </Box>

                        {/* Subject 2 */}
                        <Box p={5} bg="white" borderRadius="md" border="1px solid" borderColor="gray.200">
                          <Text fontWeight="bold" mb={4} color="gray.900">Physics</Text>
                          <Grid templateColumns="1fr 1fr" gap={4} mb={4}>
                            <Box>
                              <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Assign Teacher</Text>
                              <NativeSelectRoot>
                                <NativeSelectField items={["Sarah Jenkins", "Michael Chen", "David Smith"]} placeholder="Select a teacher..." />
                              </NativeSelectRoot>
                            </Box>
                            <Box>
                              <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Compensation Model</Text>
                              <NativeSelectRoot>
                                <NativeSelectField items={["Percentage of bundle", "Flat hourly rate", "Fixed monthly salary"]} defaultValue="Flat hourly rate" />
                              </NativeSelectRoot>
                            </Box>
                          </Grid>
                          <Box>
                            <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Amount / Percentage</Text>
                            <Input placeholder="e.g. 45 for $45/hr" />
                          </Box>
                        </Box>

                      </VStack>
                    )}
                  </Box>

                </VStack>
              </Box>

              {/* Right Column: Preview */}
              <Box w="400px" p={8} bg="gray.50" overflowY="auto">
                <Box position="sticky" top={0}>
                  <Text fontSize="lg" fontWeight="bold" mb={6} color="gray.900">Preview</Text>
                  <Text fontSize="sm" color="gray.500" mb={6}>Estimate totals based on pricing model, unit quantity, and tax.</Text>

                  <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200" mb={6}>
                    <Text fontSize="sm" fontWeight="600" mb={2} color="gray.700">Unit quantity</Text>
                    <Input defaultValue="1" mb={6} />

                    <Flex justify="space-between" align="center" mb={6}>
                      <Text fontSize="sm" color="gray.600">1 × $0.00</Text>
                      <Text fontWeight="bold" color="gray.900">$0.00</Text>
                    </Flex>

                    <VStack align="stretch" gap={2} borderTopWidth="1px" borderColor="gray.200" pt={4}>
                      <Flex justify="space-between" align="center">
                        <Text fontSize="sm" color="gray.600">Subtotal</Text>
                        <Text fontSize="sm" color="gray.900">$0.00</Text>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <Text fontSize="sm" color="gray.600">Tax</Text>
                        <Text fontSize="sm" color="#007D79" cursor="pointer" _hover={{ textDecoration: "underline" }}>Start collecting tax</Text>
                      </Flex>
                      <Flex justify="space-between" align="center" mt={2}>
                        <Text fontWeight="bold" color="gray.900">Total {pricingModel === "recurring" ? "per month" : ""}</Text>
                        <Text fontWeight="bold" color="gray.900">$0.00</Text>
                      </Flex>
                      {pricingModel === "recurring" && (
                        <Text fontSize="xs" color="gray.500" textAlign="right">Billed at the start of the period</Text>
                      )}
                    </VStack>
                  </Box>

                  <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
                    <Text fontSize="md" fontWeight="bold" mb={4} color="gray.900">Teacher Payout Preview</Text>
                    <VStack align="stretch" gap={4}>
                      {classType === "single" ? (
                        <Box>
                          <Text fontSize="sm" fontWeight="600" color="gray.700">Sarah Jenkins</Text>
                          <Flex justify="space-between" align="center" mt={1}>
                            <Text fontSize="sm" color="gray.500">Percentage per learner (30%)</Text>
                            <Text fontSize="sm" fontWeight="bold" color="gray.900">$0.00</Text>
                          </Flex>
                        </Box>
                      ) : (
                        <>
                          <Box borderBottomWidth="1px" borderColor="gray.200" pb={3}>
                            <Text fontSize="sm" fontWeight="600" color="gray.700">Sarah Jenkins (Mathematics)</Text>
                            <Flex justify="space-between" align="center" mt={1}>
                              <Text fontSize="sm" color="gray.500">Percentage of bundle (20%)</Text>
                              <Text fontSize="sm" fontWeight="bold" color="gray.900">$0.00</Text>
                            </Flex>
                          </Box>
                          <Box>
                            <Text fontSize="sm" fontWeight="600" color="gray.700">Michael Chen (Physics)</Text>
                            <Flex justify="space-between" align="center" mt={1}>
                              <Text fontSize="sm" color="gray.500">Flat hourly rate ($45/hr)</Text>
                              <Text fontSize="sm" fontWeight="bold" color="gray.900">$45.00 / hr</Text>
                            </Flex>
                          </Box>
                        </>
                      )}
                      <Box pt={3} borderTopWidth="1px" borderColor="gray.200">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#007D79' }} />
                          <Text fontSize="sm" color="gray.600">Include other assigned classes/bundles in calculation</Text>
                        </label>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
}
