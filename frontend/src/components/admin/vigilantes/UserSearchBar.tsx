import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { APIS } from '../../../constants';
import authApiWithBearer from '../../../libs/axiosAuthBearer';
import { User } from '../../../stores/auth';
import { formatRut } from '../../../utils/rut';
import useDebounce from '../../hooks/useDebounce';
import { VigilanteSimpleT } from './vigilantes';

function MatchRole({ role }: { role: string }) {
  if (role === 'user') {
    return (
      <Tag color="white" background="blue.700">
        Usuario
      </Tag>
    );
  }
}

const searchUser = (
  searchParam: string,
  setData: Dispatch<SetStateAction<User[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const url = new URL('users', APIS.admin);
  url.searchParams.append('search', searchParam);
  setLoading(true);

  authApiWithBearer.get(url.toString()).then((res) => {
    setLoading(false);
    setData(res.data);
  });
};

function UserSearchBar({
  selected,
  setSelected,
  initialRef,
}: {
  selected: VigilanteSimpleT | null;
  setSelected: Dispatch<SetStateAction<VigilanteSimpleT | null>>;
  initialRef: MutableRefObject<HTMLInputElement | null>;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const updateSearch = useDebounce(searchUser);

  return (
    <Stack>
      <FormControl>
        <FormLabel>Buscar usuario</FormLabel>
        <InputGroup>
          <InputLeftElement>
            <Icon as={Search2Icon} />
          </InputLeftElement>
          <InputRightElement>{loading && <Spinner />}</InputRightElement>
          <Input
            ref={initialRef}
            type="search"
            onChange={(e) => {
              if (e.target.value.length > 3)
                updateSearch(e.target.value, setData, setLoading);
            }}
            placeholder="Nombre y apellidos o email"
          />
        </InputGroup>
      </FormControl>
      {data.length > 0 && (
        <Card maxH="80">
          <CardHeader>
            <Heading size="md">
              Resultados de Búsqueda (click para seleccionar)
            </Heading>
          </CardHeader>
          <CardBody overflowY="scroll">
            <Stack spacing="2">
              {data.map((el) => (
                <Box
                  key={el.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2"
                  cursor={selected?.id === el.id ? 'not-allowed' : 'pointer'}
                  background={selected?.id === el.id ? 'green.100' : ''}
                  _hover={
                    selected?.id === el.id
                      ? {}
                      : { background: 'gray.100', transition: '0.3s' }
                  }
                  onClick={() =>
                    setSelected({
                      id: el.id,
                      rut: el.rut,
                      nombres: [el.p_nombre, el.s_nombre].join(' '),
                      apellidos: [el.p_apellido, el.s_apellido].join(' '),
                      email: el.email,
                      rol: el.rol,
                    })
                  }
                >
                  <Heading size="xs" textTransform="capitalize">
                    {[
                      el.p_nombre,
                      el.s_nombre,
                      el.p_apellido,
                      el.s_apellido,
                    ].join(' ')}
                  </Heading>
                  <MatchRole role={el.rol} />
                  <Text>{el.email}</Text>
                  <Text>{formatRut(el.rut)}</Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      )}
    </Stack>
  );
}

export default UserSearchBar;
