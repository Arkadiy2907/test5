export interface eIdObj {
  id: string;
  rowName: string;
}

export interface ButtonItemProps {
  src: string;
  alt: string;
  id: number;
  title: string;
}

export type TableObj = {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number | null;
  rowName: string;
  salary: number;
  supportCosts: number;
};

export interface DefaultMyState {
  eID: {
    eID: eIdObj;
  };
  table: {
    table: TableObjId[];
  };
}

export type iD = {
  id: string;
  eID: string;
};

export type TableObjId = TableObj & iD;
