import { AxiosPromise } from 'axios';

export type HandleDeleteT<Data> = (data: Data) => AxiosPromise<Promise<Data>>;
export type HandleUpdateT<Data> = (data: Data) => AxiosPromise<Promise<Data>>;
export type HandleCreateT<Data> = (data: Data) => AxiosPromise<Promise<Data>>;
