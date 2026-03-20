import { useState } from "react";
import { Box, Flex, Text, VStack, Input, Button, Grid, Image } from "@chakra-ui/react";
import { NativeSelectRoot, NativeSelectField } from "../components/ui/native-select";
import { Users, Calendar, ClipboardCheck, CreditCard, Settings, TrendingUp, MessageSquare, LogIn, CheckSquare, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const navigate = useNavigate();

  const improvementOptions = [
    { id: 'data', label: 'Learner data management', icon: Users },
    { id: 'scheduling', label: 'Class & teacher scheduling', icon: Calendar },
    { id: 'attendance', label: 'Lesson & attendance management', icon: ClipboardCheck },
    { id: 'payments', label: 'Managing payments', icon: CreditCard },
    { id: 'processes', label: 'Streamline your processes', icon: Settings },
    { id: 'growth', label: 'Increase bookings & grow', icon: TrendingUp },
    { id: 'communication', label: 'Internal & external communication', icon: MessageSquare },
    { id: 'portal', label: 'Add a learner/parent portal', icon: LogIn },
  ];

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedOptions.length === improvementOptions.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(improvementOptions.map(opt => opt.id));
    }
  };

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <Flex h="100vh" w="100vw" bg="white">
      {/* Left Side - Form */}
      <Flex flex="1" direction="column" justify="center" align="center" p={8} overflowY="auto">
        <Box w="full" maxW="500px" py={8}>
          <Text fontSize="3xl" fontWeight="bold" color="gray.900" mb={2} fontFamily="Georgia, serif">
            Let's create your school
          </Text>
          
          {step === 1 ? (
            <Box bg="white" p={8} borderRadius="xl" shadow="md" borderWidth="1px" borderColor="gray.100" mt={8}>
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2}>
                Tell us about your school
              </Text>
              <Text color="gray.500" fontSize="sm" mb={6}>
                We'll use this info to improve your onboarding experience
              </Text>

              <VStack align="stretch" gap={5}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                    School name <Text as="span" color="red.500">*</Text>
                  </Text>
                  <Input placeholder="e.g. Maslow" bg="white" />
                </Box>

                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                      School type
                    </Text>
                    <NativeSelectRoot>
                      <NativeSelectField items={[
                        "Select",
                        "Language school",
                        "Tutoring school",
                        "Music school",
                        "College/adult education",
                        "Dance/fitness/sports school",
                        "Design/art school",
                        "Computer skills school",
                        "Faith school",
                        "Primary school",
                        "Secondary school",
                        "Pre-school",
                        "Other"
                      ]} defaultValue="Select" />
                    </NativeSelectRoot>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                      Number of learners
                    </Text>
                    <NativeSelectRoot>
                      <NativeSelectField items={["Select", "1-50", "51-200", "201-500", "500+"]} defaultValue="Select" />
                    </NativeSelectRoot>
                  </Box>
                </Grid>

                <Box mt={4}>
                  <Text fontSize="md" fontWeight="bold" color="gray.800" mb={4}>
                    Select your local settings
                  </Text>
                  <Grid templateColumns="1fr 1fr" gap={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                        Country
                      </Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Aruba", "United Kingdom", "United States", "Spain", "France"]} defaultValue="Aruba" />
                      </NativeSelectRoot>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                        Time zone
                      </Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Europe/London", "America/New_York", "Europe/Paris"]} defaultValue="Europe/London" />
                      </NativeSelectRoot>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                        Date format
                      </Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]} defaultValue="DD-MM-YYYY" />
                      </NativeSelectRoot>
                    </Box>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                        Currency
                      </Text>
                      <NativeSelectRoot>
                        <NativeSelectField items={["Euro (€)", "GBP (£)", "USD ($)"]} defaultValue="Euro (€)" />
                      </NativeSelectRoot>
                    </Box>
                  </Grid>
                </Box>

                <Button bg="#007D79" color="white" size="lg" mt={4} _hover={{ bg: "#00635f" }} onClick={() => setStep(2)}>
                  Continue
                </Button>
              </VStack>
            </Box>
          ) : (
            <Box mt={8}>
              <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={6}>
                What would you like to improve in your school?
              </Text>

              <VStack align="stretch" gap={3} mb={6}>
                {improvementOptions.map((option) => {
                  const isSelected = selectedOptions.includes(option.id);
                  const IconComponent = option.icon;
                  return (
                    <Flex 
                      key={option.id}
                      align="center" 
                      p={4} 
                      borderWidth="1px" 
                      borderColor={isSelected ? "#007D79" : "gray.200"} 
                      borderRadius="md" 
                      cursor="pointer" 
                      onClick={() => toggleOption(option.id)}
                      bg={isSelected ? "#E6F4F1" : "white"}
                      _hover={{ borderColor: "#007D79" }}
                      transition="all 0.2s"
                    >
                      <Box color={isSelected ? "#007D79" : "gray.400"} mr={4}>
                        <IconComponent size={20} />
                      </Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">{option.label}</Text>
                    </Flex>
                  );
                })}
              </VStack>

              <Flex align="center" cursor="pointer" onClick={toggleAll} mb={8}>
                <Box color={selectedOptions.length === improvementOptions.length ? "#007D79" : "gray.400"} mr={3}>
                  {selectedOptions.length === improvementOptions.length ? <CheckSquare size={20} /> : <Square size={20} />}
                </Box>
                <Text fontSize="sm" color="gray.600">Select all</Text>
              </Flex>

              <Button bg="#6B7AFF" color="white" size="lg" _hover={{ bg: "#5A69E6" }} onClick={handleFinish} w="fit-content" px={8}>
                Create my school
              </Button>
            </Box>
          )}
        </Box>
      </Flex>

      {/* Right Side - Testimonial/Image */}
      <Flex flex="1" bg={step === 1 ? "#E6F4F1" : "#E8F0FE"} direction="column" justify="center" align="center" p={12} position="relative" overflow="hidden" transition="background 0.3s">
        <Box maxW="500px" textAlign="center" zIndex={1}>
          {step === 1 ? (
            <>
              <Text fontSize="2xl" fontWeight="medium" color="#003A38" mb={8} fontStyle="italic" lineHeight="tall">
                "With EduFlow, our team has been able to get the hang of it very quickly. It's incredibly intuitive."
              </Text>
              <Flex direction="column" align="center">
                <Box w="64px" h="64px" borderRadius="full" overflow="hidden" mb={4} border="2px solid white" shadow="md">
                  <Image src="https://picsum.photos/seed/ian/100/100" alt="Ian Wescombe" w="full" h="full" objectFit="cover" referrerPolicy="no-referrer" />
                </Box>
                <Text fontWeight="bold" color="gray.800">Ian Wescombe</Text>
                <Text fontSize="sm" color="gray.600">Recovery College Manager</Text>
              </Flex>
            </>
          ) : (
            <>
              <Text fontSize="2xl" fontWeight="medium" color="#1A365D" mb={8} fontStyle="italic" lineHeight="tall">
                "With EduFlow, we have full oversight across all of our courses, learners and attendance."
              </Text>
              <Flex direction="column" align="center">
                <Box w="64px" h="64px" borderRadius="full" overflow="hidden" mb={4} border="2px solid white" shadow="md">
                  <Image src="https://picsum.photos/seed/diana/100/100" alt="Diana Izu" w="full" h="full" objectFit="cover" referrerPolicy="no-referrer" />
                </Box>
                <Text fontWeight="bold" color="gray.800">Diana Izu</Text>
                <Text fontSize="sm" color="gray.600">Program Manager</Text>
              </Flex>
            </>
          )}
        </Box>
        
        {/* Decorative background elements */}
        <Box position="absolute" top="-10%" right="-10%" w="300px" h="300px" bg={step === 1 ? "#007D79" : "#6B7AFF"} opacity={0.05} borderRadius="full" transition="background 0.3s" />
        <Box position="absolute" bottom="-20%" left="-10%" w="500px" h="500px" bg={step === 1 ? "#007D79" : "#6B7AFF"} opacity={0.05} borderRadius="full" transition="background 0.3s" />
      </Flex>
    </Flex>
  );
}
