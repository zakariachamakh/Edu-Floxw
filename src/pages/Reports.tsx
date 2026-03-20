import { useState } from "react";
import { Box, Flex, Text, VStack, Grid, HStack, Button, Table, Badge } from "@chakra-ui/react";
import { Search, ChevronRight, Info } from "lucide-react";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Sep 25', revenue: 2400 },
  { name: 'Oct 25', revenue: 1398 },
  { name: 'Nov 25', revenue: 9800 },
  { name: 'Dec 25', revenue: 3908 },
  { name: 'Jan 26', revenue: 4800 },
  { name: 'Feb 26', revenue: 3800 },
  { name: 'Mar 26', revenue: 4300 },
];

const invoicesData = [
  { name: 'Sep 25', total: 40, outstanding: 24 },
  { name: 'Oct 25', total: 30, outstanding: 13 },
  { name: 'Nov 25', total: 20, outstanding: 98 },
  { name: 'Dec 25', total: 27, outstanding: 39 },
  { name: 'Jan 26', total: 18, outstanding: 48 },
  { name: 'Feb 26', total: 23, outstanding: 38 },
  { name: 'Mar 26', total: 34, outstanding: 43 },
];

const lessonsData = [
  { name: 'Sep 25', total: 5, missed: 1, cancelled: 0 },
  { name: 'Oct 25', total: 46, missed: 4, cancelled: 2 },
  { name: 'Nov 25', total: 6, missed: 0, cancelled: 1 },
  { name: 'Dec 25', total: 6, missed: 1, cancelled: 0 },
  { name: 'Jan 26', total: 1, missed: 0, cancelled: 0 },
];

const classTypeData = [
  { name: 'Group Classes', value: 400 },
  { name: 'Private Lessons', value: 300 },
  { name: 'Consultations', value: 300 },
  { name: 'Exams', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Reports() {
  const [activeTab, setActiveTab] = useState("Monitor");

  const renderMonitor = () => (
    <Box>
      <Flex align="center" gap={4} mb={6}>
        <Text fontSize="3xl" fontWeight="bold" color="gray.800" fontFamily="serif">Monitor</Text>
        <Badge colorScheme="orange" variant="subtle" borderRadius="full" px={3} py={1}>Data refreshed yesterday at 23:06</Badge>
      </Flex>
      <Text color="gray.600" mb={8}>Data are updated every 30 minutes. Viewing data for: <b>all academy learners</b>.</Text>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {/* Lessons today */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" textAlign="center">
          <Flex justify="center" align="center" gap={2} mb={8}>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">Lessons today</Text>
            <Info size={16} color="gray.400" />
          </Flex>
          <Box w="120px" h="120px" borderRadius="full" bg="#E6F4F1" mx="auto" mb={6} display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="4xl" fontWeight="bold" color="#007D79">12</Text>
          </Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={8}>12 lessons scheduled</Text>
          <Button variant="ghost" color="#007D79" size="sm">View lessons report <ChevronRight size={16} /></Button>
        </Box>

        {/* Invoiced today */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" textAlign="center">
          <Flex justify="center" align="center" gap={2} mb={8}>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">Invoiced today</Text>
            <Info size={16} color="gray.400" />
          </Flex>
          <Box w="120px" h="120px" borderRadius="full" bg="#E6F4F1" mx="auto" mb={6} display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="4xl" fontWeight="bold" color="#007D79">5</Text>
          </Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={8}>5 invoices generated</Text>
          <Button variant="ghost" color="#007D79" size="sm">View non-invoiced classes <ChevronRight size={16} /></Button>
        </Box>

        {/* Revenue today */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" textAlign="center">
          <Flex justify="center" align="center" gap={2} mb={8}>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">Revenue today</Text>
            <Info size={16} color="gray.400" />
          </Flex>
          <Box w="120px" h="120px" borderRadius="full" bg="#E6F4F1" mx="auto" mb={6} display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" fontWeight="bold" color="#007D79">£450</Text>
          </Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={8}>£450 collected</Text>
          <Button variant="ghost" color="#007D79" size="sm">View invoices by line item <ChevronRight size={16} /></Button>
        </Box>
      </Grid>
    </Box>
  );

  const renderAnalytics = () => (
    <Box>
      <Text fontSize="3xl" fontWeight="bold" color="gray.800" fontFamily="serif" mb={6}>Analytics</Text>
      
      <Flex justify="space-between" align="flex-start" mb={8}>
        <Text color="gray.600" maxW="600px">
          Discover new insights through visualisations and a diverse array of graphs, charts, and tables. In order to keep this page performant, data is updated every 24 hours.
        </Text>
        <Badge colorScheme="orange" variant="subtle" borderRadius="full" px={3} py={1}>Last updated: 16/03/2026</Badge>
      </Flex>

      {/* Filters */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>Date settings</Text>
          <HStack>
            <NativeSelectRoot>
              <NativeSelectField defaultValue="6months">
                <option value="6months">Last 6 months</option>
                <option value="1year">Last 1 year</option>
              </NativeSelectField>
            </NativeSelectRoot>
            <NativeSelectRoot>
              <NativeSelectField defaultValue="monthly">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </HStack>
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>Location</Text>
          <NativeSelectRoot>
            <NativeSelectField defaultValue="all">
              <option value="all">All</option>
              <option value="main">Main Campus</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>Teacher name</Text>
          <NativeSelectRoot>
            <NativeSelectField defaultValue="all">
              <option value="all">All</option>
              <option value="john">John Doe</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Box>
      </Grid>

      {/* KPI Cards */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={8}>
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Text fontSize="sm" color="gray.600" mb={2}>MRR</Text>
          <HStack align="baseline" mb={4}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">£3,189.14</Text>
            <Text fontSize="sm" color="green.500" fontWeight="medium">+4.2%</Text>
          </HStack>
          <Text fontSize="sm" color="gray.500">Monthly Recurring Revenue</Text>
        </Box>
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Text fontSize="sm" color="gray.600" mb={2}>MRR growth</Text>
          <HStack align="baseline" mb={4}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">£130.00</Text>
          </HStack>
          <Text fontSize="sm" color="gray.500">New MRR this period</Text>
        </Box>
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Text fontSize="sm" color="gray.600" mb={2}>ARR</Text>
          <HStack align="baseline" mb={4}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">£38,269.68</Text>
            <Text fontSize="sm" color="green.500" fontWeight="medium">+4.2%</Text>
          </HStack>
          <Text fontSize="sm" color="gray.500">Annual Recurring Revenue</Text>
        </Box>
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm">
          <Text fontSize="sm" color="gray.600" mb={2}>Net volume</Text>
          <HStack align="baseline" mb={4}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">£1,669.19</Text>
            <Text fontSize="sm" color="green.500" fontWeight="medium">+617.7%</Text>
          </HStack>
          <Text fontSize="sm" color="gray.500">Total collected fees</Text>
        </Box>
      </Grid>

      {/* Charts Area */}
      <Grid templateColumns="2fr 1fr" gap={6}>
        <VStack align="stretch" gap={6}>
          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" h="300px">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>Revenue</Text>
            {/* Revenue Chart */}
            <Box h="220px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} tickFormatter={(value) => `£${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value: number) => [`£${value}`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#007D79" strokeWidth={3} dot={{ r: 4, fill: '#007D79', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" h="300px">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>Invoices</Text>
            <HStack mb={4}>
              <Box w={3} h={3} borderRadius="full" bg="blue.300" />
              <Text fontSize="sm" color="gray.600">Total invoices</Text>
              <Box w={3} h={3} borderRadius="full" bg="red.300" ml={4} />
              <Text fontSize="sm" color="gray.600">Outstanding invoices</Text>
            </HStack>
            {/* Invoices Chart */}
            <Box h="200px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invoicesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ fill: '#F7FAFC' }}
                  />
                  <Bar dataKey="total" name="Total invoices" fill="#63B3ED" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outstanding" name="Outstanding invoices" fill="#FC8181" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" h="350px">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>Lessons</Text>
            <HStack mb={4}>
              <Box w={3} h={3} borderRadius="full" bg="#48C7A0" />
              <Text fontSize="sm" color="gray.600">Total lessons</Text>
              <Box w={3} h={3} borderRadius="full" bg="#FF8A8A" ml={4} />
              <Text fontSize="sm" color="gray.600">Missed lessons</Text>
              <Box w={3} h={3} borderRadius="full" bg="#1A365D" ml={4} />
              <Text fontSize="sm" color="gray.600">Cancelled lessons</Text>
            </HStack>
            {/* Lessons Chart */}
            <Box h="240px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lessonsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#718096' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ fill: '#F7FAFC' }}
                  />
                  <Bar dataKey="total" name="Total lessons" fill="#48C7A0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="missed" name="Missed lessons" fill="#FF8A8A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" name="Cancelled lessons" fill="#1A365D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </VStack>
        <VStack align="stretch" gap={6}>
          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" h="300px">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>Revenue % by class type</Text>
            <Box h="220px" w="100%">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {classTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200" shadow="sm" h="350px">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>10 best-selling classes</Text>
            <Table.Root variant="line" size="sm">
              <Table.Header bg="#001F24">
                <Table.Row>
                  <Table.ColumnHeader color="white">Class type</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Class name</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Quantity</Table.ColumnHeader>
                  <Table.ColumnHeader color="white">Average price</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="blue">Group</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">English B2 Intensive</Table.Cell>
                  <Table.Cell>42</Table.Cell>
                  <Table.Cell>£150.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="purple">Private</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">1-on-1 Math Tutoring</Table.Cell>
                  <Table.Cell>28</Table.Cell>
                  <Table.Cell>£45.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="green">Consultation</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">Initial Assessment</Table.Cell>
                  <Table.Cell>15</Table.Cell>
                  <Table.Cell>£0.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="blue">Group</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">French A1 Beginners</Table.Cell>
                  <Table.Cell>12</Table.Cell>
                  <Table.Cell>£120.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="orange">Exam</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">IELTS Mock Test</Table.Cell>
                  <Table.Cell>10</Table.Cell>
                  <Table.Cell>£80.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="blue">Group</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">Spanish Conversation</Table.Cell>
                  <Table.Cell>8</Table.Cell>
                  <Table.Cell>£90.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="purple">Private</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">Piano Lessons</Table.Cell>
                  <Table.Cell>7</Table.Cell>
                  <Table.Cell>£50.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="blue">Group</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">Coding Bootcamp</Table.Cell>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>£500.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="green">Consultation</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">Career Counseling</Table.Cell>
                  <Table.Cell>4</Table.Cell>
                  <Table.Cell>£60.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Badge colorScheme="orange">Exam</Badge></Table.Cell>
                  <Table.Cell fontWeight="medium">TOEFL Preparation</Table.Cell>
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>£200.00</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );

  const renderReporting = () => (
    <Box>
      <Text fontSize="3xl" fontWeight="bold" color="gray.800" fontFamily="serif" mb={6}>Reports</Text>
      
      <Flex mb={8}>
        <Button variant="outline" borderColor="teal.500" color="teal.600" bg="teal.50">
          <Box as="span" mr={2}>≡</Box> Showing (All categories)
        </Button>
      </Flex>

      <Table.Root variant="line">
        <Table.Header bg="white">
          <Table.Row>
            <Table.ColumnHeader w="250px">Name</Table.ColumnHeader>
            <Table.ColumnHeader w="200px">Category</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[
            { name: "Invoices", category: "Income and finance", desc: "Raised invoices within a timeframe including their status, payee and amount due." },
            { name: "Invoices by line item", category: "Income and finance", desc: "Individual line item and its associated invoice including details such as specific tax codes." },
            { name: "Payments", category: "Income and finance", desc: "Payments collected via EduFlow." },
            { name: "Payments by location or type", category: "Income and finance", desc: "Aggregated amounts by location and type of payment." },
            { name: "Aged debt", category: "Income and finance", desc: "Summary of outstanding academy debts based on their age." },
            { name: "Classes by teacher", category: "Income and finance", desc: "Track how many classes each of your teachers have sold." },
            { name: "Refunds", category: "Income and finance", desc: "Refunds processed in EduFlow including reason for refund. Only refunds made directly in EduFlow will be listed here." },
            { name: "Payouts - EduFlow Pay", category: "Income and finance", desc: "Payouts you have received from EduFlow Pay including the date, amount, status and where the money has been paid." },
            { name: "Payout details - EduFlow Pay", category: "Income and finance", desc: "This report shows the transactions that make up your payouts you have received from EduFlow Pay, including payments, refunds, and associated fees." },
            { name: "Lessons", category: "Lessons and services", desc: "Lessons scheduled in your academy." },
            { name: "Non-invoiced classes", category: "Lessons and services", desc: "Keep track of any classes that have been provided but not yet invoiced for." },
            { name: "Classes catalogue", category: "Lessons and services", desc: "Classes in your academy with information about price, cost and stock levels." },
            { name: "Learners", category: "Academy classivity", desc: "Learners in your academy and their associated details including name, date of birth, marketing preferences, and membership status." },
            { name: "Contacts", category: "Academy classivity", desc: "Contacts for any learners in your academy, including the full name, contact details, any notes and more." },
          ].map((report, idx) => (
            <Table.Row key={idx} _hover={{ bg: "gray.50" }}>
              <Table.Cell>
                <Text color="#007D79" fontWeight="medium" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  {report.name}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Badge bg="#FDF2E9" color="#B75C00" borderRadius="full" px={3} py={1} textTransform="none" fontWeight="normal">
                  {report.category}
                </Badge>
              </Table.Cell>
              <Table.Cell color="gray.600" fontSize="sm">
                {report.desc}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white" h="calc(100vh - 64px)">
      {/* Left Sidebar */}
      <Box w="240px" bg="white" borderRightWidth="1px" borderColor="gray.200" py={6}>
        <Text fontSize="xs" fontWeight="bold" color="gray.500" letterSpacing="wider" px={6} mb={4}>DATA</Text>
        <VStack align="stretch" gap={1}>
          <Box 
            px={6} py={2} 
            bg={activeTab === "Monitor" ? "#E6F4F1" : "transparent"} 
            color={activeTab === "Monitor" ? "#007D79" : "gray.700"}
            cursor="pointer"
            _hover={{ bg: activeTab === "Monitor" ? "#E6F4F1" : "gray.50" }}
            onClick={() => setActiveTab("Monitor")}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight={activeTab === "Monitor" ? "medium" : "normal"}>Monitor</Text>
            {activeTab === "Monitor" && <ChevronRight size={16} />}
          </Box>
          <Box 
            px={6} py={2} 
            bg={activeTab === "Analytics" ? "#E6F4F1" : "transparent"} 
            color={activeTab === "Analytics" ? "#007D79" : "gray.700"}
            cursor="pointer"
            _hover={{ bg: activeTab === "Analytics" ? "#E6F4F1" : "gray.50" }}
            onClick={() => setActiveTab("Analytics")}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight={activeTab === "Analytics" ? "medium" : "normal"}>Analytics</Text>
            {activeTab === "Analytics" && <ChevronRight size={16} />}
          </Box>
          <Box 
            px={6} py={2} 
            bg={activeTab === "Reporting" ? "#E6F4F1" : "transparent"} 
            color={activeTab === "Reporting" ? "#007D79" : "gray.700"}
            cursor="pointer"
            _hover={{ bg: activeTab === "Reporting" ? "#E6F4F1" : "gray.50" }}
            onClick={() => setActiveTab("Reporting")}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight={activeTab === "Reporting" ? "medium" : "normal"}>Reporting</Text>
            {activeTab === "Reporting" && <ChevronRight size={16} />}
          </Box>
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="#F7FAFC" p={8} overflowY="auto">
        {activeTab === "Monitor" && renderMonitor()}
        {activeTab === "Analytics" && renderAnalytics()}
        {activeTab === "Reporting" && renderReporting()}
      </Box>
    </Flex>
  );
}
