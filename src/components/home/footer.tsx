import {
  Box,
  chakra,
  ChakraProps,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Logo } from '../../assets/logo';

function SocialButton({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}

export default function Footer(props: ChakraProps) {
  return (
    <Box
      bg="white"
      color={useColorModeValue('gray.700', 'gray.200')}
      {...props}
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        spacing={4}
        justify="center"
        align="center"
      >
        <Box w="sm" pl="8" pr="8">
          <Logo color="var(--chakra-colors-blue-600)" />
        </Box>
        <Stack
          textAlign="center"
          alignItems="center"
          direction={['column', 'row']}
          spacing={6}
          m={8}
        >
          <Link href="/">Inicio</Link>
          <Link href="/">Universidad de Los Lagos</Link>
          <Link href="/">Sobre nosotros</Link>
          <Link href="/">Política de cookies y privacidad</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text textAlign={{ base: 'center', md: 'left' }}>
            © 2024 Proyecto UParking. Derechos reservados
          </Text>
          <Stack direction="row" spacing={6}>
            <SocialButton label="Twitter" href="#">
              <FaTwitter />
            </SocialButton>
            <SocialButton label="YouTube" href="#">
              <FaYoutube />
            </SocialButton>
            <SocialButton label="Instagram" href="#">
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
