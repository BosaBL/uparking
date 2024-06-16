import { useLoaderData } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { formatRut } from '../../../utils/rut';
import { capitalize } from '../../../utils/strings';
import CrudTable from '../CrudTable';
import AddVigilanteModal from './CreateVigilanteModal';
import UpdateVigilanteModal from './UpdateVigilanteModal';
import { handleCreate, handleDelete } from './handlers';
import { VigilanteSimpleT, VigilanteT } from './vigilantes';

function displayRol(rol: string): string {
  switch (rol) {
    case 'user':
      return 'Usuario';
    case 'vigilante':
      return 'Vigilante';
    default:
      return '';
  }
}

function Vigilantes() {
  const loaderData = useLoaderData({
    from: '/_admin/admin/vigilantes',
  }) as VigilanteT[];

  const simplifiedData = useMemo<VigilanteSimpleT[]>(() => {
    const simplifiedDataArray: VigilanteSimpleT[] = [];
    loaderData.forEach((value) => {
      simplifiedDataArray.push({
        id: value.id,
        rut: value.rut,
        nombres: [value.p_nombre, value.s_nombre].join(' '),
        apellidos: [value.p_apellido, value.s_apellido].join(' '),
        email: value.email,
        rol: value.rol,
      });
    });

    return simplifiedDataArray;
  }, [loaderData]);

  const columns = useMemo<ColumnDef<VigilanteSimpleT>[]>(
    () => [
      { header: 'id ', accessorKey: 'id', id: 'id' },
      {
        header: 'RUT',
        accessorKey: 'rut',
        id: 'rut',
        cell: (info) => formatRut(info.getValue() as string),
      },
      {
        header: 'Nombres',
        accessorKey: 'nombres',
        id: 'nombres',
        cell: (info) => capitalize(info.getValue() as string),
      },
      {
        header: 'Apellidos',
        accessorKey: 'apellidos',
        id: 'apellidos',
        cell: (info) => capitalize(info.getValue() as string),
      },
      { header: 'Email', accessorKey: 'email', id: 'email' },
      {
        header: 'Rol',
        accessorKey: 'rol',
        id: 'rol',
        cell: (info) => displayRol(info.getValue() as string),
      },
    ],
    []
  );

  return (
    <CrudTable<VigilanteSimpleT>
      data={simplifiedData}
      columns={columns}
      UpdateModal={UpdateVigilanteModal}
      isUpdatable={false}
      addModal={
        <AddVigilanteModal
          dataArray={simplifiedData}
          columns={columns}
          handleCreate={handleCreate}
        />
      }
      handleUpdate={handleDelete}
      handleDelete={handleDelete}
    />
  );
}

export default Vigilantes;
