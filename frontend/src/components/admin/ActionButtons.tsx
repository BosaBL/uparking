import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router'; import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import useUpdatableToast from '../hooks/useUpdatableToast';
import { HandleDeleteT, HandleUpdateT } from './handlers.d';
import { UpdateModalT } from './modals.d';
import { SedeT } from './sedes/sedes';

export default function ActionButtons<Data>({
  data,
  UpdateModal,
  columns,
  handleDelete,
  handleUpdate,
  isDeletable,
  isUpdatable,
}: {
  data: Data;
  UpdateModal: UpdateModalT<Data>;
  columns: ColumnDef<Data>[];
  handleDelete: HandleDeleteT<Data>;
  handleUpdate: HandleUpdateT<Data>;
  isDeletable: boolean;
  isUpdatable: boolean;
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
    <Stack direction="row" justifyContent="center">
      {isDeletable && (
        <Tooltip label="Eliminar">
          <IconButton
            isDisabled={disabled}
            colorScheme="red"
            aria-label="Eliminar"
            icon={<DeleteIcon />}
            onClick={handleClick}
          />
        </Tooltip>
      )}
      {isUpdatable && (
        <UpdateModal
          data={data}
          columns={columns}
          handleUpdate={handleUpdate}
        />
      )}
    </Stack>
  );
}
