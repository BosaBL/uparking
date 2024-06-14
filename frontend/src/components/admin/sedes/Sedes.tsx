import { useLoaderData } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import CrudTable from '../CrudTable';
import CreateSedeModal from './CreateSedeModal';
import UpdateSedeModal from './UpdateSedeModal';
import { handleCreate, handleDelete, handleUpdate } from './handlers';
import { SedeT } from './sedes';

function Sedes() {
  const loaderData = useLoaderData({ from: '/_admin/admin/sedes' });

  const columns = useMemo<ColumnDef<SedeT>[]>(
    () => [
      { header: 'id (código)', accessorKey: 'id', id: 'id' },
      { header: 'nombre', accessorKey: 'nombre', id: 'nombre' },
      { header: 'dirección', accessorKey: 'direccion', id: 'direccion' },
    ],
    []
  );

  return (
    <CrudTable<SedeT>
      data={loaderData}
      columns={columns}
      UpdateModal={UpdateSedeModal}
      addModal={
        <CreateSedeModal
          dataArray={loaderData}
          columns={columns}
          handleCreate={handleCreate}
        />
      }
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  );
}

export default Sedes;
