import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { ChakraProps, IconButton, Stack, useToast } from '@chakra-ui/react';
import React, {
  ButtonHTMLAttributes,
  HtmlHTMLAttributes,
  Ref,
  useRef,
  useState,
} from 'react';
import { SedeT } from './sedes.d';
import { deleteSedeRequest } from './api';
import { useRouter } from '@tanstack/react-router';

export default function ActionButtons(sede: SedeT) {
  const { invalidate } = useRouter();
  const [enabled, setEnabled] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setEnabled(false);
    const deleterq = deleteSedeRequest(sede.id);

    toast.promise(deleterq, {
      success: { title: `Se está eliminó el elemento ${sede.id}.` },
      error: {
        title: `Ha ocurrido un error al tratar de eliminar el elemento ${sede.id}.`,
      },
      loading: { title: `Eliminando el elemento ${sede.id}...` },
    });

    deleterq
      .then(() => {
        invalidate();
      })
      .catch(() => setEnabled(true));
  };

  return (
    <Stack direction="row">
      <IconButton
        colorScheme="red"
        aria-label="Eliminar"
        icon={<DeleteIcon />}
        onClick={handleDelete}
        isDisabled={enabled}
      />
      <IconButton
        onClick={() => console.log(sede)}
        colorScheme="blue"
        aria-label="Editar"
        icon={<EditIcon />}
      />
    </Stack>
  );
}
