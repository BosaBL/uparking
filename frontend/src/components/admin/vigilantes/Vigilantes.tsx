import { useLoaderData } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import CrudTable from '../CrudTable';
import CreateSedeModal from './CreateSedeModal';
import UpdateSedeModal from './UpdateSedeModal';
import { handleCreate, handleDelete, handleUpdate } from './handlers';
import { VigilanteSimpleT, VigilanteT } from './vigilantes';

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
  console.log(loaderData);
  console.log(simplifiedData);

  const columns = useMemo<ColumnDef<VigilanteSimpleT>[]>(
    () => [
      { header: 'id ', accessorKey: 'id', id: 'id' },
      { header: 'RUT', accessorKey: 'rut', id: 'rut' },
      { header: 'Nombres', accessorKey: 'nombres', id: 'nombres' },
      { header: 'Apellidos', accessorKey: 'apellidos', id: 'apellidos' },
      { header: 'Email', accessorKey: 'email', id: 'email' },
      { header: 'Rol', accessorKey: 'rol', id: 'rol' },
    ],
    []
  );

  return (
    <CrudTable<VigilanteSimpleT>
      data={simplifiedData}
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

export default Vigilantes;
