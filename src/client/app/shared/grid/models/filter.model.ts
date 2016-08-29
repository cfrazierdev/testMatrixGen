export interface FilterModel<T> {
  filter?: T;
  label?: any;
}

export interface FilterParams {
  apply?: boolean;
  newRowsAction?: string;
  values?: any[];
}

export interface GridFilterAPI<T> {
  getModel: () => FilterModel<T>;
  setModel: (model: FilterModel<T>) => void;
}

export interface GridFilter {
  init(params: {
    column?: any,
    colDef?: any,
    rowModel?: any,
    filterChangedCallback?: () => any,
    filterModifiedCallback?: () => any,
    valueGetter?: (node: any) => any,
    doesRowPassOtherFilter?: (node: any) => any,
    filterParams?: FilterParams,
    context?: any,
    $scope?: any
  }): void;

  getGui(): HTMLElement;

  isFilterActive(): boolean;

  getApi(): GridFilterAPI<any>;
}
