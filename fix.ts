import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

// Remove redundant subtitles
code = code.replace(/<Text fontSize="2xl" fontWeight="bold" color="gray\.800" fontFamily="serif" mb=\{2\}>.*?<\/Text>\n\s*/g, '');
code = code.replace(/<Text fontSize="2xl" fontWeight="bold" color="gray\.800" fontFamily="serif" mb=\{6\}>.*?<\/Text>\n\s*/g, '');
code = code.replace(/<Text fontSize="3xl" fontWeight="bold" color="gray\.800" fontFamily="serif">Access groups<\/Text>\n\s*/g, '');

// Remove buttons from table headers
code = code.replace(/<Button bg="#007D79" color="white" _hover=\{\{ bg: "#006666" \}\} size="sm"><Plus size=\{16\} style=\{\{marginRight: '8px'\}\} \/> Add holiday<\/Button>\n\s*/g, '');
code = code.replace(/<Button variant="ghost" color="#007D79" size="sm"><Plus size=\{16\} style=\{\{marginRight: '8px'\}\} \/> Add another classroom<\/Button>\n\s*/g, '');
code = code.replace(/<Button variant="ghost" color="#007D79" size="sm" mt=\{2\}><Plus size=\{16\} style=\{\{marginRight: '8px'\}\} \/> Add another prospect status<\/Button>\n\s*/g, '');
code = code.replace(/<Button size="sm" bg="#007D79" color="white" _hover=\{\{ bg: "#006666" \}\} onClick=\{\(\) => setEditingRole\(\{ name: "", description: "" \}\)\}><Plus size=\{16\} \/> Add Role<\/Button>\n\s*/g, '');
code = code.replace(/<Button size="sm" bg="#007D79" color="white" _hover=\{\{ bg: "#006666" \}\} onClick=\{\(\) => setEditingUser\(\{ name: "", email: "", role: "" \}\)\}><Plus size=\{16\} \/> Invite User<\/Button>\n\s*/g, '');
code = code.replace(/<Button size="sm" bg="#007D79" color="white" _hover=\{\{ bg: "#006666" \}\} onClick=\{\(\) => setEditingLocation\(\{ name: "", address: "", isPrimary: false, classrooms: \[\] \}\)\}><Plus size=\{16\} style=\{\{marginRight: '8px'\}\} \/> Add Branch<\/Button>\n\s*/g, '');
code = code.replace(/<Button size="sm" bg="#007D79" color="white" _hover=\{\{ bg: "#006666" \}\} onClick=\{\(\) => setEditingAccessGroup\(\{ name: "", description: "", color: "blue" \}\)\}>New<\/Button>\n\s*/g, '');

// Add renderHeaderActions
const headerActionsCode = `
  const renderHeaderActions = () => {
    switch (activeTab) {
      case "Holidays":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Plus size={16} style={{marginRight: '8px'}} /> Add holiday</Button>;
      case "Classrooms":
        return <Button variant="outline" color="#007D79" borderColor="#007D79" _hover={{ bg: "#E6F2F2" }} size="sm"><Plus size={16} style={{marginRight: '8px'}} /> Add classroom</Button>;
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
      default:
        return null;
    }
  };

  return (
`;

code = code.replace('  return (\n    <Flex flex="1"', headerActionsCode + '    <Flex flex="1"');

// Replace the top header
const oldHeader = `<Flex justify="space-between" align="center" mb={8}>
          <Text fontFamily="Georgia, serif" fontSize="3xl" fontWeight="bold" color="gray.800">
            {activeTab}
          </Text>
          <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} px={6}>
            Save
          </Button>
        </Flex>`;

const newHeader = `<Flex justify="space-between" align="center" mb={8}>
          <Text fontFamily="Georgia, serif" fontSize="3xl" fontWeight="bold" color="gray.800">
            {activeTab}
          </Text>
          <HStack gap={4}>
            {renderHeaderActions()}
            <Button bg="#007D79" color="white" _hover={{ bg: "#006666" }} px={6}>
              Save
            </Button>
          </HStack>
        </Flex>`;

code = code.replace(oldHeader, newHeader);

fs.writeFileSync('src/pages/Settings.tsx', code);
