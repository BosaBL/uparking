import {
  Box,
  Button,
  Icon,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import { useLoaderData, useRouter } from '@tanstack/react-router';
import { SedeT } from './sedes.d';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import {
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table';
import ActionButtons from './ActionButtons';
import AddSedeModal from './AddSedeModal';

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 100,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
          .sort()
          .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return (
    <>
      <chakra.datalist id={column.id + 'list'}>
        {sortedUniqueValues.map((value: any) => (
          <chakra.option value={value} key={value} />
        ))}
      </chakra.datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
        mt={1}
      />
    </>
  );
}

export default function Sedes() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const router = useRouter();
  const data = useLoaderData({ from: '/_admin/admin/sedes' }) as SedeT[];

  const columnHelper = createColumnHelper<SedeT>();
  const columns = useMemo<ColumnDef<SedeT, any>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'nombre',
        cell: (info) => info.getValue(),
      },
      { accessorKey: 'direccion', cell: (info) => info.getValue() },
      {
        accessorKey: 'accion',
        cell: (info) => <ActionButtons {...info.row.original} />,
        header: (info) => <AddSedeModal {info.column.id, data[0]} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
  });
  console.log('a');

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <Box
                          cursor={
                            header.column.getCanSort() ? 'pointer' : 'default'
                          }
                          userSelect={
                            header.column.getCanSort() ? 'none' : 'auto'
                          }
                          onClick={
                            header.column.id !== 'accion'
                              ? header.column.getToggleSortingHandler()
                              : null
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.id !== 'accion' && (
                            <>
                              {{
                                asc: <Icon as={TriangleUpIcon} />,
                                desc: <Icon as={TriangleDownIcon} />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </>
                          )}
                        </Box>
                        {header.column.getCanFilter() &&
                          header.column.id !== 'accion' ? (
                          <chakra.div>
                            <Filter column={header.column} />
                          </chakra.div>
                        ) : null}
                      </>
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Th key={column.id}>{column.id}</Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
