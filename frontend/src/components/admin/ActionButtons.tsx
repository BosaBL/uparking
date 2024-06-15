import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Stack } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import useUpdatableToast from '../hooks/useUpdatableToast';
import { HandleDeleteT, HandleUpdateT } from './handlers.d';
import { UpdateModalT } from './modals.d';

export default function ActionButtons<Data>({
  data,
  UpdateModal,
  columns,
  handleDelete,
  handleUpdate,
  isDeletable = true,
}: {
  data: Data;
  UpdateModal: UpdateModalT<Data>;
  columns: ColumnDef<Data>[];
  handleDelete: HandleDeleteT<Data>;
  handleUpdate: HandleUpdateT<Data>;
  isDeletable?: boolean;
}) {
  const [disabled, setDisabled] = useState(false);
  const { addToast, updateToast, clearToasts } = useUpdatableToast();
  const { invalidate } = useRouter();

  const handleClick = () => {
    clearToasts();
    addToast({
      status: 'loading',
      description: `Se está eliminando el elemento.`,
    });
    setDisabled(true);
    handleDelete(data)
      .then(() => {
        updateToast({
          status: 'success',
          description: `Se ha eliminado el elemento.`,
        });
      })
      .catch(() => {
        updateToast({
          status: 'error',
          description: 'Ha ocurrido un error inesperado.',
        });
      })
      .finally(invalidate);
    setDisabled(false);
  };

  return (
    <Stack direction="row">
      {isDeletable && (
        <IconButton
          isDisabled={disabled}
          colorScheme="red"
          aria-label="Eliminar"
          icon={<DeleteIcon />}
          onClick={handleClick}
        />
      )}
      <UpdateModal data={data} columns={columns} handleUpdate={handleUpdate} />
    </Stack>
  );
}
