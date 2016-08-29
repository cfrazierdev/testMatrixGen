import { FilterParams } from './filter.model';

export interface Header<T_Value> {
  headerName: string;
  field: string;
  valueGetter?: (params: { data: T_Value }) => any;
  keyCreator?: (params: { data: T_Value }) => any;
  headerCellTemplate?: (params: any) => HTMLElement;
  comparator?: (a: T_Value, b: T_Value) => number;
  cellRenderer?: any;
  suppressSorting?: boolean;
  suppressMenu?: boolean;
  sort?: string;
  filter?: any;
  filterParams?: FilterParams;
  width?: number;
}
