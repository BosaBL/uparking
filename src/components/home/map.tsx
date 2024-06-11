import { Box, Stack, Text } from '@chakra-ui/react';

export default function Map() {
  return (
    <Stack
      height="100%"
      flex="1 0 auto"
      justifyContent="center"
      background="gray.100"
    >
      <Text
        color="gray.400"
        display="block"
        textAlign="center"
        p={2}
        fontSize="3xl"
        fontWeight="bold"
      >
        MAP PLACEHOLDER
      </Text>
    </Stack>
  );
}
