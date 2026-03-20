import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          bg="gray.50"
          p={4}
        >
          <VStack gap={4} p={8} bg="white" shadow="md" borderRadius="md" maxW="lg" textAlign="center">
            <Heading color="red.500" size="lg">Something went wrong</Heading>
            <Text color="gray.600">
              An unexpected error occurred in the application. Please try refreshing the page.
            </Text>
            {this.state.error && (
              <Box bg="gray.100" p={4} borderRadius="md" w="full" overflowX="auto" textAlign="left">
                <Text fontFamily="mono" fontSize="sm" color="red.600">
                  {this.state.error.message}
                </Text>
              </Box>
            )}
            <Button colorPalette="teal" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
