import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Icon,
  Input,
  InputProps,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import ActionButtons from './ActionButtons';
import { HandleDeleteT, HandleUpdateT } from './handlers';
import { CreateModalT, UpdateModalT } from './modals.d';

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 100,
  props,
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  props?: InputProps;
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
  }, [value, debounce, onChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function Filter<Data>({ column }: { column: Column<Data> }) {
  const columnFilterValue = column.getFilterValue();
  return (
    <DebouncedInput
      value={(columnFilterValue ?? '') as string}
      onChange={useCallback(
        (value: string | number) => column.setFilterValue(value),
        [column]
      )}
      props={{
        placeholder: `Buscar (${column.getFacetedUniqueValues().size})`,
      }}
    />
  );
}

export default function CrudTable<Data>({
  data,
  columns,
  addModal,
  UpdateModal,
  handleDelete,
  handleUpdate,
  isDeletable = true,
  isUpdatable = true,
}: {
  data: Data[];
  columns: ColumnDef<Data>[];
  addModal: CreateModalT;
  UpdateModal: UpdateModalT<Data>;
  handleDelete: HandleDeleteT<Data>;
  handleUpdate: HandleUpdateT<Data>;
  isDeletable?: boolean;
  isUpdatable?: boolean;
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

  return (
    <TableContainer>
      <Table flex="1 0 auto" variant="striped" colorScheme="blue">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <HStack
                          cursor={
                            header.column.getCanSort() ? 'pointer' : 'default'
                          }
                          userSelect={
                            header.column.getCanSort() ? 'none' : 'auto'
                          }
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          <Text minW="20">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Text>
                          {{
                            asc: <Icon as={TriangleUpIcon} />,
                            desc: <Icon as={TriangleDownIcon} />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </HStack>
                        {header.column.getCanFilter() && (
                          <chakra.div>
                            <Filter<Data> column={header.column} />
                          </chakra.div>
                        )}
                      </>
                    )}
                  </Th>
                );
              })}
              <Th>
                <Text userSelect="none">Acciones</Text>
                <Box>{addModal}</Box>
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data && data.length === 0 && (
            <Tr>
              <Th color="red" colSpan={columns.length + 1}>
                <HStack justifyContent="center">
                  <InfoIcon />
                  <Text>No existen datos.</Text>
                </HStack>
              </Th>
            </Tr>
          )}
          {data &&
            data.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
                <Td>
                  <ActionButtons<Data>
                    data={row.original}
                    columns={columns}
                    UpdateModal={UpdateModal}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    isUpdatable={isUpdatable}
                    isDeletable={isDeletable}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <Th key={column.id}>
                  <Text>
                    {flexRender(
                      column.column.columnDef.header,
                      column.getContext()
                    )}
                  </Text>
                </Th>
              ))}
              <Th>
                <Text>Acciones</Text>
              </Th>
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
