import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import UpdateSedeModal from './UpdateSedeModal';
import { deleteSedeRequest } from './api';
import { SedeT } from './sedes.d';

export default function ActionButtons(sede: SedeT) {
  const { invalidate } = useRouter();
  const [enabled, setEnabled] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setEnabled(false);
    toast.closeAll();
    const deleterq = deleteSedeRequest(sede.id);

    toast.promise(deleterq, {
      success: {
        title: `Se está eliminó el elemento ${sede.id}.`,
        isClosable: true,
      },
      error: {
        title: `Ha ocurrido un error al tratar de eliminar el elemento ${sede.id}.`,
        isClosable: true,
      },
      loading: {
        title: `Eliminando el elemento ${sede.id}...`,
        isClosable: true,
      },
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
      <UpdateSedeModal {...sede} />
    </Stack>
  );
}
