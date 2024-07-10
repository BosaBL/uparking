import {
  Box,
  BoxProps,
  Button,
  Link as ChakraLink,
  CloseButton,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, Outlet, useRouter } from '@tanstack/react-router';
import axios from 'axios';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { IconType } from 'react-icons';
import { FaRegComment } from 'react-icons/fa';
import { FiChevronDown, FiLogIn, FiMap, FiMenu, FiUser } from 'react-icons/fi';
import { LuParkingSquare } from 'react-icons/lu';
import { PiBuildingOffice, PiFlashlight } from 'react-icons/pi';
import { blacklistRequest } from '../../api/auth';
import { Logo } from '../../assets/logo';
import { APIS } from '../../constants';
import { User, useAuthStore } from '../../stores/auth';
import Footer from '../home/footer';
import useUpdatableToast from '../hooks/useUpdatableToast';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Mapa', icon: FiMap, url: '/home' },
];

const AdminItems: Array<LinkItemProps> = [
  { name: 'Sedes', icon: PiBuildingOffice, url: '/admin/sedes/' },
  {
    name: 'Estacionamientos',
    icon: LuParkingSquare,
    url: '/admin/estacionamientos',
  },
  { name: 'Vigilantes', icon: PiFlashlight, url: '/admin/vigilantes' },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
  user: User | string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  children: ReactNode;
}
function NavItem({ icon, children, url, ...rest }: NavItemProps) {
  return (
    <ChakraLink
      as={Link}
      to={url}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.200',
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </ChakraLink>
  );
}

function SidebarContent({ onClose, user, ...rest }: SidebarProps) {
  const userData = user === '' ? null : (user as User);
  const { addToast, updateToast } = useUpdatableToast(5000);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<{ message: string }>({});

  function onSubmit(data: { message: string }) {
    const url = new URL('feedback/', APIS.user).toString();
    addToast({ status: 'loading', description: 'Enviando sugerencia...' });
    axios
      .post(url, { comentario: data.message })
      .then(() =>
        updateToast({ status: 'success', description: 'Sugerencia enviada.' })
      )
      .catch(() =>
        updateToast({
          status: 'error',
          description: 'Error al enviar sugerencia.',
        })
      )
      .finally(onCloseModal);
  }
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box w="60" as={Link} to={'/home'}>
          <Logo color="var(--chakra-colors-blue-600)" />
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) =>
        link.name !== 'Notificaciones' || user ? (
          <NavItem
            onClick={onClose}
            key={link.name}
            icon={link.icon}
            url={link.url}
          >
            {link.name}
          </NavItem>
        ) : null
      )}
      <Text pl="8" mt="4" fontSize="large" fontWeight="bold">
        Administración
      </Text>
      <Divider />
      {AdminItems.map((link) => (
        <NavItem
          onClick={onClose}
          key={link.name}
          icon={link.icon}
          url={link.url}
        >
          {link.name}
        </NavItem>
      ))}
      <NavItem
        pos="absolute"
        bottom={0}
        onClick={onOpenModal}
        icon={FaRegComment}
        url={'.'}
      >
        <>
          Deja tus sugerencias
          <Modal
            isOpen={isOpenModal}
            isCentered
            onCloseComplete={reset}
            onClose={onCloseModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Deja tu Sugerencia</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody pb={6}>
                  <FormControl isRequired>
                    <FormLabel>Mensaje</FormLabel>
                    <Textarea
                      placeholder="Escribe tu Comentario"
                      {...register('message')}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Enviar
                  </Button>
                  <Button onClick={onCloseModal}>Cancelar</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
      </NavItem>
    </Box>
  );
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
  user: User | string;
  logout: () => void;
}

function MobileNav({ onOpen, user, logout, ...rest }: MobileProps) {
  const userData = user === '' ? null : (user as User);
  const { addToast, updateToast } = useUpdatableToast(5000);
  const { invalidate } = useRouter();
  const { refreshToken } = useAuthStore();

  if (userData) {
    if (userData.rol === 'admin') {
      userData.rol = 'Administrador';
    }
    if (userData.rol === 'user') {
      userData.rol = 'Usuario';
    }
    if (userData.rol === 'vigilante') {
      userData.rol = 'Vigilante';
    }
  }

  const handleLogout = async () => {
    try {
      addToast({
        status: 'loading',
        description: 'Cerrando sesión...',
      });
      await blacklistRequest(refreshToken);
      updateToast({ status: 'success', description: 'Sesión cerrada.' });
      logout();
      invalidate();
    } catch {
      updateToast({ status: 'error', description: 'Error al cerrar sesión.' });
    }
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
      pr="8"
      pl="8"
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box
        w="60"
        p={4}
        display={{ base: 'block', md: 'none' }}
        as={Link}
        to={'/home'}
      >
        <Logo color="var(--chakra-colors-blue-600)" />
      </Box>
      {!userData && (
        <>
          <HStack display={{ base: 'none', md: 'flex' }} spacing={4}>
            <Button
              colorScheme="blue"
              as={Link}
              to="/auth/login"
              search={{ redirect: '/home' }}
            >
              Ingresar
            </Button>
            <Button colorScheme="gray" as={Link} to="/auth/register">
              Registrarse
            </Button>
          </HStack>
          <Flex display={{ base: 'flex', md: 'none' }}>
            <Menu>
              <MenuButton>
                <Flex>
                  <Icon as={FiLogIn} fontSize="3xl" />
                </Flex>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <MenuItem
                  as={Link}
                  to="/auth/login"
                  search={{ redirect: '/home' }}
                >
                  Iniciar sesión
                </MenuItem>
                <MenuItem as={Link} to="/auth/register">
                  Registrarse
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </>
      )}
      {userData && (
        <HStack spacing={{ base: '0', md: '0' }}>
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Icon as={FiUser} fontSize="3xl" />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {[userData.p_nombre, userData.p_apellido].join(' ')}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {userData.rol}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <MenuItem as={Link} to="/home/user">
                  Mis datos
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      )}
    </Flex>
  );
}

type NavPropsType = {
  user: User | string;
  logout: () => void;
};

export default function Nav({ user, logout }: NavPropsType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        user={user}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} user={user} />
        </DrawerContent>
      </Drawer>
      <Stack minH="100vh" gap="0">
        <MobileNav onOpen={onOpen} user={user} logout={logout} />
        <Stack
          background="white"
          ml={{ base: 4, md: 64 }}
          m="4"
          p="4"
          rounded="lg"
          flex="1 1 auto"
        >
          <Outlet />
        </Stack>
      </Stack>
      <Footer ml={{ base: 0, md: 60 }} />
    </Box>
  );
}
