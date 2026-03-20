import { useState } from "react";
import { Box, Flex, Text, HStack, Button, Table, Badge, Input, VStack, IconButton, Textarea, Separator, Grid } from "@chakra-ui/react";
import { CheckCircle2, Clock, FileText, Download, MoreHorizontal, Edit, Trash2, Plus, Search, AlertCircle, ChevronDown, X } from "lucide-react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../components/ui/menu";
import { DrawerRoot, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerCloseTrigger, DrawerBackdrop } from "../components/ui/drawer";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogCloseTrigger, DialogBackdrop } from "../components/ui/dialog";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { Switch } from "../components/ui/switch";
import { Field } from "../components/ui/field";
import { Checkbox } from "../components/ui/checkbox";
import { Avatar } from "../components/ui/avatar";
import { toaster } from "../components/ui/toaster";
import { NumberInputRoot, NumberInputField } from "../components/ui/number-input";

const DEMO_DATA = [
  { id: "INV-001", learner: "Sarah Martinez", status: "Paid", amount: "£130.00 GBP", description: "English B2 (Monthly)", billing: "Auto", created: "Mar 16, 2026", dueDate: "Mar 16, 2026" },
  { id: "INV-002", learner: "Gregory Wood", status: "Draft", amount: "£149.00 GBP", description: "IELTS Preparation", billing: "Manual", created: "Mar 16, 2026", dueDate: "Mar 23, 2026" },
  { id: "INV-003", learner: "Omar Hassan", status: "Past due", amount: "£85.00 GBP", description: "Math Tutoring", billing: "Manual", created: "Mar 01, 2026", dueDate: "Mar 10, 2026" },
  { id: "INV-004", learner: "Yuki Tanaka", status: "Open", amount: "£120.00 GBP", description: "Piano Lessons", billing: "Auto", created: "Mar 15, 2026", dueDate: "Mar 20, 2026" },
  { id: "INV-005", learner: "David Chen", status: "Paid", amount: "£200.00 GBP", description: "Intensive Coding Bootcamp", billing: "Auto", created: "Feb 28, 2026", dueDate: "Feb 28, 2026" },
  { id: "INV-006", learner: "Emma Wilson", status: "Paid", amount: "£130.00 GBP", description: "English B2 (Monthly)", billing: "Auto", created: "Feb 16, 2026", dueDate: "Feb 16, 2026" },
  { id: "INV-007", learner: "James Smith", status: "Draft", amount: "£45.00 GBP", description: "Guitar Basics", billing: "Manual", created: "Mar 17, 2026", dueDate: "Mar 24, 2026" },
  { id: "INV-008", learner: "Maria Garcia", status: "Open", amount: "£150.00 GBP", description: "Spanish A1", billing: "Auto", created: "Mar 14, 2026", dueDate: "Mar 19, 2026" },
  { id: "INV-009", learner: "Ahmed Ali", status: "Past due", amount: "£90.00 GBP", description: "Physics Tutoring", billing: "Manual", created: "Feb 25, 2026", dueDate: "Mar 05, 2026" },
  { id: "INV-010", learner: "Lisa Wong", status: "Paid", amount: "£110.00 GBP", description: "Violin Masterclass", billing: "Auto", created: "Mar 10, 2026", dueDate: "Mar 10, 2026" },
  { id: "INV-011", learner: "Tom Baker", status: "Paid", amount: "£130.00 GBP", description: "English B2 (Monthly)", billing: "Auto", created: "Jan 16, 2026", dueDate: "Jan 16, 2026" },
  { id: "INV-012", learner: "Sophie Turner", status: "Open", amount: "£75.00 GBP", description: "Chemistry 101", billing: "Manual", created: "Mar 16, 2026", dueDate: "Mar 21, 2026" },
  { id: "INV-013", learner: "Lucas Silva", status: "Draft", amount: "£160.00 GBP", description: "Advanced Web Dev", billing: "Auto", created: "Mar 18, 2026", dueDate: "Mar 25, 2026" },
  { id: "INV-014", learner: "Mia Johnson", status: "Paid", amount: "£85.00 GBP", description: "Math Tutoring", billing: "Manual", created: "Feb 10, 2026", dueDate: "Feb 15, 2026" },
  { id: "INV-015", learner: "Noah Williams", status: "Past due", amount: "£149.00 GBP", description: "IELTS Preparation", billing: "Auto", created: "Feb 12, 2026", dueDate: "Feb 19, 2026" },
  { id: "INV-016", learner: "Isabella Davis", status: "Open", amount: "£115.00 GBP", description: "Creative Writing", billing: "Manual", created: "Mar 17, 2026", dueDate: "Mar 22, 2026" },
  { id: "INV-017", learner: "Ethan Brown", status: "Paid", amount: "£95.00 GBP", description: "History 101", billing: "Auto", created: "Mar 05, 2026", dueDate: "Mar 05, 2026" },
  { id: "INV-018", learner: "Ava Miller", status: "Draft", amount: "£130.00 GBP", description: "English B2 (Monthly)", billing: "Manual", created: "Mar 18, 2026", dueDate: "Mar 25, 2026" },
  { id: "INV-019", learner: "William Taylor", status: "Past due", amount: "£60.00 GBP", description: "Geography Basics", billing: "Manual", created: "Feb 20, 2026", dueDate: "Feb 27, 2026" },
  { id: "INV-020", learner: "Sophia Anderson", status: "Paid", amount: "£140.00 GBP", description: "Biology Advanced", billing: "Auto", created: "Mar 12, 2026", dueDate: "Mar 12, 2026" },
  { id: "INV-021", learner: "Mason Thomas", status: "Open", amount: "£80.00 GBP", description: "Art History", billing: "Auto", created: "Mar 16, 2026", dueDate: "Mar 21, 2026" },
  { id: "INV-022", learner: "Amelia Jackson", status: "Paid", amount: "£150.00 GBP", description: "Spanish A1", billing: "Auto", created: "Feb 14, 2026", dueDate: "Feb 14, 2026" },
  { id: "INV-023", learner: "Logan White", status: "Draft", amount: "£90.00 GBP", description: "Physics Tutoring", billing: "Manual", created: "Mar 18, 2026", dueDate: "Mar 25, 2026" },
  { id: "INV-024", learner: "Harper Harris", status: "Past due", amount: "£110.00 GBP", description: "Violin Masterclass", billing: "Manual", created: "Jan 25, 2026", dueDate: "Feb 01, 2026" },
  { id: "INV-025", learner: "Elijah Martin", status: "Paid", amount: "£200.00 GBP", description: "Intensive Coding Bootcamp", billing: "Auto", created: "Jan 28, 2026", dueDate: "Jan 28, 2026" }
];

export function FeesAndPayments() {
  const [payments, setPayments] = useState(DEMO_DATA);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState<any>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingInvoice, setDeletingInvoice] = useState<any>(null);

  // Form State
  const [learnerSearch, setLearnerSearch] = useState("");
  const [selectedLearner, setSelectedLearner] = useState<any>(null);
  const [isFamilyInvoice, setIsFamilyInvoice] = useState(false);
  const [lineItems, setLineItems] = useState([{ id: 1, description: "", quantity: 1, unitPrice: "" }]);
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [scholarshipName, setScholarshipName] = useState("");
  const [scholarshipAmount, setScholarshipAmount] = useState("");
  const [taxEnabled, setTaxEnabled] = useState(false);
  const [taxRate, setTaxRate] = useState("0");
  const [dueDate, setDueDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Due on receipt");
  const [billingType, setBillingType] = useState("One-time");
  const [frequency, setFrequency] = useState("Monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethods, setPaymentMethods] = useState(["Online (Stripe)"]);
  const [internalNotes, setInternalNotes] = useState("");
  const [invoiceNotes, setInvoiceNotes] = useState("");

  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setSelectedLearner({ name: "Sarah Martinez", email: "sarah@example.com" });
    setLineItems([
      { id: 1, description: "English B2 Monthly", quantity: 1, unitPrice: "130" },
      { id: 2, description: "Materials Fee", quantity: 1, unitPrice: "15" }
    ]);
    setDiscountType("Percentage");
    setDiscountValue("10");
    setIsDrawerOpen(true);
  };

  const handleEditInvoice = (invoice: any) => {
    setEditingInvoice(invoice);
    setSelectedLearner({ name: invoice.learner, email: "learner@example.com" });
    setLineItems([{ id: 1, description: invoice.description, quantity: 1, unitPrice: invoice.amount.replace(/[^0-9.]/g, '') }]);
    setIsDrawerOpen(true);
  };

  const handleViewInvoice = (invoice: any) => {
    setViewingInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleDeleteInvoice = (invoice: any) => {
    setDeletingInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setPayments(payments.filter(p => p.id !== deletingInvoice.id));
    setIsDeleteModalOpen(false);
    toaster.create({ title: "Invoice deleted", type: "success" });
  };

  const handleDownloadPDF = (invoice: any) => {
    toaster.create({ title: `Downloading PDF for ${invoice.id}...`, type: "info" });
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unitPrice || 0)), 0);
  };

  const calculateTotal = () => {
    let total = calculateSubtotal();
    if (discountValue) {
      if (discountType === "Percentage") {
        total -= total * (Number(discountValue) / 100);
      } else {
        total -= Number(discountValue);
      }
    }
    if (scholarshipAmount) {
      total -= Number(scholarshipAmount);
    }
    if (taxEnabled && taxRate) {
      total += total * (Number(taxRate) / 100);
    }
    return Math.max(0, total);
  };

  const handleSaveInvoice = (status: string) => {
    const newInvoice = {
      id: editingInvoice ? editingInvoice.id : `INV-0${payments.length + 1}`,
      learner: selectedLearner?.name || "Unknown Learner",
      status: status,
      amount: `£${calculateTotal().toFixed(2)} GBP`,
      description: lineItems[0]?.description || "Custom Invoice",
      billing: billingType === "One-time" ? "Manual" : "Auto",
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dueDate: dueDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (editingInvoice) {
      setPayments(payments.map(p => p.id === editingInvoice.id ? newInvoice : p));
      toaster.create({ title: "Invoice updated", type: "success" });
    } else {
      setPayments([newInvoice, ...payments]);
      if (status === "Open") {
        toaster.create({ title: `Invoice ${newInvoice.id} for £${calculateTotal().toFixed(2)} will be emailed to ${selectedLearner?.email}`, type: "success" });
      } else {
        toaster.create({ title: "Invoice saved as draft", type: "success" });
      }
    }
    setIsDrawerOpen(false);
  };

  const filteredData = payments.filter(item => {
    if (filter !== "All" && item.status !== filter) return false;
    if (searchQuery && !item.learner.toLowerCase().includes(searchQuery.toLowerCase()) && !item.description.toLowerCase().includes(searchQuery.toLowerCase()) && !item.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge colorPalette="green" variant="subtle" display="flex" alignItems="center" gap={1} w="fit-content">Paid <CheckCircle2 size={12} /></Badge>;
      case "Draft":
        return <Badge colorPalette="gray" variant="subtle" display="flex" alignItems="center" gap={1} w="fit-content">Draft <Clock size={12} /></Badge>;
      case "Open":
        return <Badge colorPalette="blue" variant="subtle" display="flex" alignItems="center" gap={1} w="fit-content">Open <Clock size={12} /></Badge>;
      case "Past due":
        return <Badge colorPalette="red" variant="subtle" display="flex" alignItems="center" gap={1} w="fit-content">Past due <AlertCircle size={12} /></Badge>;
      default:
        return <Badge colorPalette="gray" variant="subtle">{status}</Badge>;
    }
  };

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white" direction="column" p={10} overflowY="auto" h="calc(100vh - 64px)">
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900" fontFamily="Georgia, serif">Payments</Text>
        <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleCreateInvoice}>
          <Box asChild mr={2}><Plus size={18} /></Box>
          New Invoice
        </Button>
      </Flex>

      {/* Filters Row */}
      <Flex mb={6} gap={4} align="center">
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" bg="white" size="sm">
              {filter} <Box asChild ml={2}><ChevronDown size={14} /></Box>
            </Button>
          </MenuTrigger>
          <MenuContent>
            {["All", "Draft", "Open", "Past due", "Paid"].map(f => (
              <MenuItem key={f} value={f} onClick={() => setFilter(f)}>
                {f}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" bg="white" size="sm" color="gray.600">
              <Box asChild mr={2}><Clock size={14} /></Box>
              Due Date <Box asChild ml={2}><ChevronDown size={14} /></Box>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
            <MenuItem value="next-week">Next Week</MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>

      <Flex justify="space-between" align="center" mb={6}>
        <HStack gap={3}>
          <Box position="relative" w="250px">
            <Box position="absolute" left={3} top={2} color="gray.400">
              <Search size={16} />
            </Box>
            <Input 
              pl={9} 
              placeholder="Search learner, class..." 
              borderRadius="md" 
              size="sm" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </HStack>
        <HStack gap={3}>
          <Button variant="ghost" size="sm" color="gray.600">Export</Button>
          <Button variant="ghost" size="sm" color="gray.600">Edit columns</Button>
        </HStack>
      </Flex>

      <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader>Learner</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Amount</Table.ColumnHeader>
              <Table.ColumnHeader>Class / Description</Table.ColumnHeader>
              <Table.ColumnHeader>Billing</Table.ColumnHeader>
              <Table.ColumnHeader>Created</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredData.map((item) => (
              <Table.Row key={item.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell fontWeight="medium" color="blue.600" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  {item.learner}
                </Table.Cell>
                <Table.Cell>
                  {getStatusBadge(item.status)}
                </Table.Cell>
                <Table.Cell fontWeight="medium">{item.amount}</Table.Cell>
                <Table.Cell>
                  <Text>{item.description}</Text>
                  <Text fontSize="xs" color="gray.500">{item.id}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.billing}</Text>
                  <Text fontSize="xs" color="gray.500">Due: {item.dueDate}</Text>
                </Table.Cell>
                <Table.Cell color="gray.600">{item.created}</Table.Cell>
                <Table.Cell textAlign="right">
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Button variant="ghost" size="sm" color="gray.400" _hover={{ color: "gray.700" }}>
                        <MoreHorizontal size={18} />
                      </Button>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem value="view" onClick={() => handleViewInvoice(item)}><FileText size={16} /> View Details</MenuItem>
                      <MenuItem value="edit" onClick={() => handleEditInvoice(item)}><Edit size={16} /> Edit</MenuItem>
                      <MenuItem value="download" onClick={() => handleDownloadPDF(item)}><Download size={16} /> Download PDF</MenuItem>
                      <MenuItem value="delete" color="red.500" onClick={() => handleDeleteInvoice(item)}><Trash2 size={16} /> Delete</MenuItem>
                    </MenuContent>
                  </MenuRoot>
                </Table.Cell>
              </Table.Row>
            ))}
            {filteredData.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={7} textAlign="center" py={8} color="gray.500">
                  No payments found matching your criteria.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Create/Edit Invoice Drawer */}
      <DrawerRoot open={isDrawerOpen} onOpenChange={(e) => setIsDrawerOpen(e.open)} size="lg">
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{editingInvoice ? "Edit Invoice" : "New Invoice"}</DrawerTitle>
            <DrawerCloseTrigger />
          </DrawerHeader>
          <DrawerBody>
            <VStack gap={8} align="stretch" pb={10}>
              {/* 1. LEARNER SECTION */}
              <Box>
                <Text fontWeight="bold" mb={4}>LEARNER SECTION</Text>
                <Field label="Bill to">
                  {!selectedLearner ? (
                    <Box position="relative">
                      <Box position="absolute" left={3} top={2.5} color="gray.400">
                        <Search size={16} />
                      </Box>
                      <Input 
                        pl={9} 
                        placeholder="Search learner name..." 
                        value={learnerSearch}
                        onChange={(e) => setLearnerSearch(e.target.value)}
                      />
                      {learnerSearch && (
                        <Box position="absolute" top="100%" left={0} right={0} bg="white" shadow="md" borderRadius="md" zIndex={10} mt={1} p={2}>
                          <HStack p={2} _hover={{ bg: "gray.50" }} cursor="pointer" onClick={() => { setSelectedLearner({ name: "Sarah Martinez", email: "sarah@example.com" }); setLearnerSearch(""); }}>
                            <Avatar name="Sarah Martinez" size="sm" />
                            <Box>
                              <Text fontWeight="medium" fontSize="sm">Sarah Martinez</Text>
                              <Text fontSize="xs" color="gray.500">sarah@example.com</Text>
                            </Box>
                          </HStack>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Flex align="center" justify="space-between" p={3} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                      <HStack>
                        <Avatar name={selectedLearner.name} size="sm" />
                        <Box>
                          <Text fontWeight="medium" fontSize="sm">{selectedLearner.name}</Text>
                          <Text fontSize="xs" color="gray.500">{selectedLearner.email}</Text>
                        </Box>
                      </HStack>
                      <IconButton variant="ghost" size="sm" color="gray.400" onClick={() => setSelectedLearner(null)}>
                        <X size={16} />
                      </IconButton>
                    </Flex>
                  )}
                </Field>
                
                {selectedLearner && (
                  <Box mt={4}>
                    <Switch checked={isFamilyInvoice} onCheckedChange={(e) => setIsFamilyInvoice(e.checked)}>
                      Family invoice
                    </Switch>
                    {isFamilyInvoice && (
                      <Box mt={3} p={3} bg="gray.50" borderRadius="md" fontSize="sm">
                        <Text fontWeight="medium" mb={2}>Include family members:</Text>
                        <VStack align="start" gap={2}>
                          <Checkbox defaultChecked>Sarah Martinez</Checkbox>
                          <Checkbox>Leo Martinez (Sibling)</Checkbox>
                        </VStack>
                        <Text mt={3} color="gray.600" fontSize="xs">Billing address will use parent/guardian contact: Maria Martinez (maria.m@example.com)</Text>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              <Separator />

              {/* 2. LINE ITEMS SECTION */}
              <Box>
                <Text fontWeight="bold" mb={4}>LINE ITEMS SECTION</Text>
                <Grid templateColumns="2fr 1fr 1fr 1fr 40px" gap={4} mb={2} px={2}>
                  <Text fontSize="xs" fontWeight="medium" color="gray.500">Description</Text>
                  <Text fontSize="xs" fontWeight="medium" color="gray.500">Quantity</Text>
                  <Text fontSize="xs" fontWeight="medium" color="gray.500">Unit Price</Text>
                  <Text fontSize="xs" fontWeight="medium" color="gray.500" textAlign="right">Amount</Text>
                  <Box></Box>
                </Grid>
                
                <VStack gap={3} align="stretch">
                  {lineItems.map((item, index) => (
                    <Grid key={item.id} templateColumns="2fr 1fr 1fr 1fr 40px" gap={4} alignItems="center">
                      <Input 
                        placeholder="Description" 
                        value={item.description} 
                        onChange={(e) => {
                          const newItems = [...lineItems];
                          newItems[index].description = e.target.value;
                          setLineItems(newItems);
                        }} 
                      />
                      <NumberInputRoot 
                        value={item.quantity.toString()} 
                        onValueChange={(e) => {
                          const newItems = [...lineItems];
                          newItems[index].quantity = Number(e.value);
                          setLineItems(newItems);
                        }}
                        min={1}
                      >
                        <NumberInputField />
                      </NumberInputRoot>
                      <Box position="relative">
                        <Box position="absolute" left={3} top={2} color="gray.500">£</Box>
                        <Input 
                          pl={7} 
                          placeholder="0.00" 
                          value={item.unitPrice}
                          onChange={(e) => {
                            const newItems = [...lineItems];
                            newItems[index].unitPrice = e.target.value;
                            setLineItems(newItems);
                          }}
                        />
                      </Box>
                      <Text textAlign="right" fontWeight="medium">
                        £{(Number(item.quantity) * Number(item.unitPrice || 0)).toFixed(2)}
                      </Text>
                      <IconButton 
                        variant="ghost" 
                        color="gray.400" 
                        _hover={{ color: "red.500" }}
                        onClick={() => setLineItems(lineItems.filter(i => i.id !== item.id))}
                      >
                        <X size={16} />
                      </IconButton>
                    </Grid>
                  ))}
                </VStack>
                
                <Button 
                  variant="ghost" 
                  color="blue.600" 
                  size="sm" 
                  mt={4} 
                  onClick={() => setLineItems([...lineItems, { id: Date.now(), description: "", quantity: 1, unitPrice: "" }])}
                >
                  <Plus size={16} style={{ marginRight: '8px' }} /> Add Line Item
                </Button>

                <HStack mt={4} gap={2} flexWrap="wrap">
                  <Button size="xs" variant="outline" onClick={() => setLineItems([...lineItems, { id: Date.now(), description: "Course Fee", quantity: 1, unitPrice: "" }])}>+ Course Fee</Button>
                  <Button size="xs" variant="outline" onClick={() => setLineItems([...lineItems, { id: Date.now(), description: "Registration Fee", quantity: 1, unitPrice: "" }])}>+ Registration Fee</Button>
                  <Button size="xs" variant="outline" onClick={() => setLineItems([...lineItems, { id: Date.now(), description: "Materials Fee", quantity: 1, unitPrice: "" }])}>+ Materials Fee</Button>
                </HStack>
              </Box>

              <Separator />

              {/* 3. PRICING ADJUSTMENTS */}
              <Box>
                <Text fontWeight="bold" mb={4}>PRICING ADJUSTMENTS</Text>
                <VStack gap={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Text color="gray.600">Subtotal</Text>
                    <Text fontWeight="medium">£{calculateSubtotal().toFixed(2)}</Text>
                  </Flex>
                  
                  <Flex gap={4} align="center">
                    <Box w="100px">
                      <NativeSelectRoot>
                        <NativeSelectField value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                          <option value="Percentage">%</option>
                          <option value="Fixed">£</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Box>
                    <Input 
                      placeholder="Discount value" 
                      value={discountValue} 
                      onChange={(e) => setDiscountValue(e.target.value)} 
                    />
                    <Text w="100px" textAlign="right" color="red.500">
                      {discountValue ? `-${discountType === 'Percentage' ? (calculateSubtotal() * (Number(discountValue) / 100)).toFixed(2) : Number(discountValue).toFixed(2)}` : '£0.00'}
                    </Text>
                  </Flex>

                  <Flex gap={4} align="center">
                    <Input 
                      placeholder="Scholarship Name (e.g., Merit)" 
                      value={scholarshipName} 
                      onChange={(e) => setScholarshipName(e.target.value)} 
                    />
                    <Box position="relative" w="150px">
                      <Box position="absolute" left={3} top={2} color="gray.500">£</Box>
                      <Input 
                        pl={7} 
                        placeholder="Amount" 
                        value={scholarshipAmount} 
                        onChange={(e) => setScholarshipAmount(e.target.value)} 
                      />
                    </Box>
                    <Text w="100px" textAlign="right" color="red.500">
                      {scholarshipAmount ? `-£${Number(scholarshipAmount).toFixed(2)}` : '£0.00'}
                    </Text>
                  </Flex>

                  <Flex gap={4} align="center">
                    <Switch checked={taxEnabled} onCheckedChange={(e) => setTaxEnabled(e.checked)}>Tax/VAT</Switch>
                    {taxEnabled && (
                      <>
                        <NativeSelectRoot w="120px">
                          <NativeSelectField value={taxRate} onChange={(e) => setTaxRate(e.target.value)}>
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                          </NativeSelectField>
                        </NativeSelectRoot>
                        <Text flex="1" textAlign="right" color="gray.600">
                          +£{(calculateSubtotal() * (Number(taxRate) / 100)).toFixed(2)}
                        </Text>
                      </>
                    )}
                  </Flex>

                  <Separator my={2} />
                  
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" fontSize="lg">TOTAL</Text>
                    <Text fontWeight="bold" fontSize="2xl" color="#007D79">£{calculateTotal().toFixed(2)}</Text>
                  </Flex>
                </VStack>
              </Box>

              <Separator />

              {/* 4. PAYMENT DETAILS */}
              <Box>
                <Text fontWeight="bold" mb={4}>PAYMENT DETAILS</Text>
                <Grid templateColumns="1fr 1fr" gap={6}>
                  <Field label="Due Date">
                    <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  </Field>
                  <Field label="Payment Terms">
                    <NativeSelectRoot>
                      <NativeSelectField value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)}>
                        <option value="Due on receipt">Due on receipt</option>
                        <option value="Net 7">Net 7</option>
                        <option value="Net 14">Net 14</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Custom">Custom</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>
                  <Field label="Billing Type">
                    <NativeSelectRoot>
                      <NativeSelectField value={billingType} onChange={(e) => setBillingType(e.target.value)}>
                        <option value="One-time">One-time</option>
                        <option value="Recurring">Recurring</option>
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>
                  {billingType === "Recurring" && (
                    <Field label="Frequency">
                      <NativeSelectRoot>
                        <NativeSelectField value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                          <option value="Monthly">Monthly</option>
                          <option value="Termly">Termly</option>
                          <option value="Quarterly">Quarterly</option>
                          <option value="Annually">Annually</option>
                        </NativeSelectField>
                      </NativeSelectRoot>
                    </Field>
                  )}
                  {billingType === "Recurring" && (
                    <>
                      <Field label="Start Date">
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                      </Field>
                      <Field label="End Date">
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                      </Field>
                    </>
                  )}
                </Grid>
                
                <Box mt={6}>
                  <Text fontSize="sm" fontWeight="medium" mb={3}>Payment Methods Accepted</Text>
                  <HStack gap={6}>
                    <Checkbox defaultChecked>Online (Stripe)</Checkbox>
                    <Checkbox defaultChecked>Bank Transfer</Checkbox>
                    <Checkbox>Cash</Checkbox>
                    <Checkbox>Cheque</Checkbox>
                  </HStack>
                </Box>
              </Box>

              <Separator />

              {/* 5. NOTES */}
              <Box>
                <Text fontWeight="bold" mb={4}>NOTES</Text>
                <VStack gap={4}>
                  <Field label="Internal Notes (Not visible to student)">
                    <Textarea 
                      placeholder="Add any internal notes here..." 
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                    />
                  </Field>
                  <Field label="Invoice Notes (Visible on invoice)">
                    <Textarea 
                      placeholder="Thank you for your business!" 
                      value={invoiceNotes}
                      onChange={(e) => setInvoiceNotes(e.target.value)}
                    />
                  </Field>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button variant="outline" onClick={() => handleSaveInvoice("Draft")}>Save as Draft</Button>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => handleSaveInvoice("Open")}>
              Send Invoice
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>

      {/* View Invoice Modal */}
      <DialogRoot open={isViewModalOpen} onOpenChange={(e) => setIsViewModalOpen(e.open)} size="lg">
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            {viewingInvoice && (
              <Box p={8} borderWidth="1px" borderColor="gray.200" borderRadius="md" bg="white">
                <Flex justify="space-between" align="start" mb={8}>
                  <Box>
                    <Box w="40px" h="40px" bg="#007D79" borderRadius="md" mb={2}></Box>
                    <Text fontWeight="bold" fontSize="lg">EduFlow Academy</Text>
                    <Text fontSize="sm" color="gray.500">123 Education Lane<br/>London, UK</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="3xl" fontWeight="bold" color="gray.300" letterSpacing="widest">INVOICE</Text>
                    <Text fontWeight="medium" mt={2}>{viewingInvoice.id}</Text>
                    <Text fontSize="sm" color="gray.500">Date: {viewingInvoice.created}</Text>
                    <Text fontSize="sm" color="gray.500">Due: {viewingInvoice.dueDate}</Text>
                  </Box>
                </Flex>

                <Box mb={8}>
                  <Text fontSize="sm" color="gray.500" mb={1}>Bill To:</Text>
                  <Text fontWeight="bold">{viewingInvoice.learner}</Text>
                  <Text fontSize="sm" color="gray.500">learner@example.com</Text>
                </Box>

                <Table.Root variant="line" mb={8}>
                  <Table.Header>
                    <Table.Row bg="gray.50">
                      <Table.ColumnHeader>Description</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{viewingInvoice.description}</Table.Cell>
                      <Table.Cell textAlign="right">{viewingInvoice.amount}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>

                <Flex justify="flex-end">
                  <Box w="250px">
                    <Flex justify="space-between" mb={2}>
                      <Text color="gray.600">Subtotal</Text>
                      <Text>{viewingInvoice.amount}</Text>
                    </Flex>
                    <Separator my={2} />
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold">Total Due</Text>
                      <Text fontWeight="bold" fontSize="xl" color="#007D79">{viewingInvoice.amount}</Text>
                    </Flex>
                  </Box>
                </Flex>

                <Box mt={10} pt={6} borderTopWidth="1px" borderColor="gray.200">
                  <Text fontWeight="bold" fontSize="sm" mb={2}>Payment Instructions</Text>
                  <Text fontSize="sm" color="gray.600">Please pay within the due date. You can pay online via the student portal or via bank transfer.</Text>
                </Box>
              </Box>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={() => {
              handleDownloadPDF(viewingInvoice);
              setIsViewModalOpen(false);
            }}>
              <Download size={16} style={{ marginRight: '8px' }} /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Delete Confirmation Modal */}
      <DialogRoot open={isDeleteModalOpen} onOpenChange={(e) => setIsDeleteModalOpen(e.open)}>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Text>Are you sure you want to delete invoice <strong>{deletingInvoice?.id}</strong>?</Text>
            <Text color="gray.500" fontSize="sm" mt={2}>This action cannot be undone.</Text>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button colorPalette="red" onClick={confirmDelete}>Delete Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
}
