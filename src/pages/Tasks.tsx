import { Box, Flex, Text, HStack, Button, Input, Table, Badge, Avatar, VStack, Textarea } from "@chakra-ui/react";
import { Search, Plus, Calendar, Flag, MoreHorizontal, CheckCircle2, Circle, Clock, ChevronDown, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../components/ui/menu";
import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, DialogCloseTrigger } from "../components/ui/dialog";

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Follow up on placement test",
    learner: "Sarah Martinez",
    dueDate: "2023-10-25",
    type: "Follow-up",
    priority: "High",
    status: "Pending",
    assignee: "Zakaria C.",
    assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
    overdue: false,
    comments: "Needs to be done ASAP."
  },
  {
    id: 2,
    title: "Send invoice for next semester",
    learner: "Omar Hassan",
    dueDate: "2023-10-26",
    type: "Invoice",
    priority: "Medium",
    status: "Pending",
    assignee: "Zakaria C.",
    assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
    overdue: false,
    comments: ""
  },
  {
    id: 3,
    title: "Review B2 English essay",
    learner: "David Chen",
    dueDate: "2023-10-20",
    type: "General",
    priority: "High",
    status: "Pending",
    assignee: "Zakaria C.",
    assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
    overdue: true,
    comments: ""
  },
  {
    id: 4,
    title: "Call parents regarding attendance",
    learner: "Yuki Tanaka",
    dueDate: "2023-11-02",
    type: "Admin",
    priority: "Low",
    status: "Completed",
    assignee: "Zakaria C.",
    assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
    overdue: false,
    comments: ""
  },
];

export function Tasks() {
  const [activeView, setActiveView] = useState("My Tasks");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    assignee: "Zakaria C.",
    learner: "",
    dueDate: "",
    type: "General",
    priority: "Unset",
    comments: ""
  });

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } 
        : task
    ));
  };

  const confirmDelete = (id: number) => {
    setTaskToDelete(id);
  };

  const handleDelete = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter(t => t.id !== taskToDelete));
      setTaskToDelete(null);
    }
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      assignee: task.assignee,
      learner: task.learner,
      dueDate: task.dueDate,
      type: task.type || "General",
      priority: task.priority,
      comments: task.comments || ""
    });
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingTask(null);
    setFormData({
      title: "",
      assignee: "Zakaria C.",
      learner: "",
      dueDate: "",
      type: "General",
      priority: "Unset",
      comments: ""
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...formData } : t));
    } else {
      const newTask = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
        title: formData.title,
        learner: formData.learner,
        dueDate: formData.dueDate,
        type: formData.type,
        priority: formData.priority,
        status: "Pending",
        assignee: formData.assignee,
        assigneeAvatar: "https://i.pravatar.cc/150?u=zak",
        overdue: false,
        comments: formData.comments
      };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (activeView === "Completed") return task.status === "Completed";
    if (activeView === "My Tasks") return task.status !== "Completed";
    return true; // For other tabs, just show all for demo
  });

  return (
    <Flex flex="1" maxW="1400px" mx="auto" w="full" bg="white" direction="column" p={10} overflowY="auto" h="calc(100vh - 64px)">
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900">Tasks</Text>
        <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleCreateNew}>
          <Box asChild mr={2}><Plus size={18} /></Box>
          New Task
        </Button>
      </Flex>

      {/* Filters Row */}
      <Flex mb={6} gap={4} align="center">
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" bg="white" size="sm">
              {activeView} <Box asChild ml={2}><ChevronDown size={14} /></Box>
            </Button>
          </MenuTrigger>
          <MenuContent>
            {["My Tasks", "Delegated", "Team Tasks", "Completed"].map(view => (
              <MenuItem key={view} value={view} onClick={() => setActiveView(view)}>
                {view}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" bg="white" size="sm" color="gray.600">
              <Box asChild mr={2}><Calendar size={14} /></Box>
              Due Date <Box asChild ml={2}><ChevronDown size={14} /></Box>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
            <MenuItem value="next-week">Next Week</MenuItem>
          </MenuContent>
        </MenuRoot>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" bg="white" size="sm" color="gray.600">
              <Box asChild mr={2}><Flag size={14} /></Box>
              Priority <Box asChild ml={2}><ChevronDown size={14} /></Box>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </MenuContent>
        </MenuRoot>
      </Flex>

      <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
        <Flex p={4} borderBottomWidth="1px" borderColor="gray.200" justify="space-between" align="center">
          <Box position="relative" w="full" maxW="400px">
            <Box position="absolute" left={3} top={2.5} color="gray.400">
              <Search size={18} />
            </Box>
            <Input pl={10} placeholder="Search tasks..." borderRadius="md" size="sm" />
          </Box>
        </Flex>

        <Table.Root variant="line">
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader w="40px"></Table.ColumnHeader>
              <Table.ColumnHeader>Task</Table.ColumnHeader>
              <Table.ColumnHeader>Assignee</Table.ColumnHeader>
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader>Learner</Table.ColumnHeader>
              <Table.ColumnHeader>Due Date</Table.ColumnHeader>
              <Table.ColumnHeader>Priority</Table.ColumnHeader>
              <Table.ColumnHeader w="40px" textAlign="right">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredTasks.map((task) => (
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
                  <Text fontSize="sm" color="blue.600" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                    {task.learner}
                  </Text>
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
                      <MenuItem value="edit" onClick={() => handleEdit(task)}>
                        <Edit size={16} /> Edit Task
                      </MenuItem>
                      <MenuItem value="delete" color="red.500" onClick={() => confirmDelete(task.id)}>
                        <Trash2 size={16} /> Delete Task
                      </MenuItem>
                    </MenuContent>
                  </MenuRoot>
                </Table.Cell>
              </Table.Row>
            ))}
            {filteredTasks.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={8} textAlign="center" py={8} color="gray.500">
                  No tasks found in this view.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Modal */}
      <DialogRoot open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e.open)} size="lg">
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
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Task subject" />
              </Box>
              
              <Flex gap={4}>
                <Box flex="1">
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
                        color: formData.assignee ? '#1A202C' : '#A0AEC0',
                        appearance: 'none',
                        outline: 'none'
                      }}
                      value={formData.assignee}
                      onChange={(e: any) => setFormData({...formData, assignee: e.target.value})}
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
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Learner</Text>
                  <Box position="relative">
                    <Input 
                      list="learners-list"
                      placeholder="Search learner..."
                      value={formData.learner}
                      onChange={(e) => setFormData({...formData, learner: e.target.value})}
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: 'white',
                        color: formData.learner ? '#1A202C' : '#A0AEC0',
                      }}
                    />
                    <datalist id="learners-list">
                      <option value="Sarah Martinez" />
                      <option value="Omar Hassan" />
                      <option value="David Chen" />
                      <option value="Yuki Tanaka" />
                    </datalist>
                  </Box>
                </Box>
              </Flex>

              <Flex gap={4}>
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Due date</Text>
                  <Input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} color={formData.dueDate ? "gray.900" : "gray.500"} />
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
                        color: formData.type ? '#1A202C' : '#A0AEC0',
                        appearance: 'none',
                        outline: 'none'
                      }}
                      value={formData.type}
                      onChange={(e: any) => setFormData({...formData, type: e.target.value})}
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
                    color={formData.priority === "High" ? "red.600" : "gray.600"}
                    bg={formData.priority === "High" ? "red.50" : "transparent"}
                    onClick={() => setFormData({...formData, priority: "High"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-red-500)" fill={formData.priority === "High" ? "var(--chakra-colors-red-500)" : "none"} style={{ marginRight: '8px' }} />
                    High
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    color={formData.priority === "Medium" ? "orange.600" : "gray.600"}
                    bg={formData.priority === "Medium" ? "orange.50" : "transparent"}
                    onClick={() => setFormData({...formData, priority: "Medium"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-orange-500)" fill={formData.priority === "Medium" ? "var(--chakra-colors-orange-500)" : "none"} style={{ marginRight: '8px' }} />
                    Medium
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    color={formData.priority === "Low" ? "blue.600" : "gray.600"}
                    bg={formData.priority === "Low" ? "blue.50" : "transparent"}
                    onClick={() => setFormData({...formData, priority: "Low"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-blue-500)" fill={formData.priority === "Low" ? "var(--chakra-colors-blue-500)" : "none"} style={{ marginRight: '8px' }} />
                    Low
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    color={formData.priority === "Unset" ? "gray.800" : "gray.500"}
                    bg={formData.priority === "Unset" ? "gray.100" : "transparent"}
                    onClick={() => setFormData({...formData, priority: "Unset"})}
                  >
                    <Flag size={16} color="var(--chakra-colors-gray-400)" fill={formData.priority === "Unset" ? "var(--chakra-colors-gray-400)" : "none"} style={{ marginRight: '8px' }} />
                    Unset
                  </Button>
                </HStack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="500" mb={1} color="gray.700">Comments</Text>
                <Textarea 
                  value={formData.comments} 
                  onChange={(e) => setFormData({...formData, comments: e.target.value})} 
                  placeholder="Write a note" 
                  rows={4}
                  resize="none"
                />
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bg="#007D79" color="white" _hover={{ bg: "#00635f" }} onClick={handleSave}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Delete Confirmation Dialog */}
      <DialogRoot open={taskToDelete !== null} onOpenChange={(e) => !e.open && setTaskToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Text>Are you sure you want to delete this task? This action cannot be undone.</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
               <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={handleDelete}>Delete Task</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
}
