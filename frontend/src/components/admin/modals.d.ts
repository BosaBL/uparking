import { ReactNode } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { HandleCreateT, HandleUpdateT } from './handlers.d';

export type UpdateModalPropsT<Data> = {
  data: Data;
  columns: ColumnDef<Data>[];
  handleUpdate: HandleUpdateT<Data>;
};
export type UpdateModalPropsTS<Data> = {
  data: Data;
  columns: Array<ColumnDef<Data> & { form: string }>;
  handleUpdate: HandleUpdateT<Data>;
  sedes: SedeT[];
};
export type UpdateModalT<Data> = FC<UpdateModalPropsT<Data>>;
export type UpdateModalTS<Data> = FC<UpdateModalPropsTS<Data>>;

export type CreateModalPropsT<Data> = {
  dataArray: Data[];
  columns: ColumnDef<Data>[];
  handleCreate: HandleCreateT<Data>;
};
export type CreateModalT = ReactNode;
