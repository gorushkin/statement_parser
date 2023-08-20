import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';
import { BooleanFlag } from 'src/shared/booleanFlag';

import { ColumnFormat, columns, transaction } from '../constants';
import { columnFormatMap, conditionMapping, initCurrencies } from './constants';
import {
  ConvertDirection,
  Currency,
  Header,
  StatementRecord,
  Transaction,
} from './types';

export class Preview {
  name = '';
  headers = [] as Header[];
  previewRecords = [] as Transaction[];
  originalRecords = [] as StatementRecord[];
  resultRecords = [] as StatementRecord[];
  columnFormat: ColumnFormat = ColumnFormat.AMOUNT;

  columns = columns.map((column) => ({
    name: column,
    visible: conditionMapping[this.columnFormat](column),
  }));

  currencies = initCurrencies;
  isConvertingEnabled = new BooleanFlag(false);

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrencies = ({
    name,
    value,
  }: {
    name: ConvertDirection;
    value: Currency;
  }) => {
    this.currencies = { ...this.currencies, [name]: value };
  };

  public toggleConverting = () => {
    this.isConvertingEnabled.toggle();
  };

  public toggleColumnsFormat = () => {
    this.columnFormat = columnFormatMap[this.columnFormat];
    this.columns = this.columns.map(({ name }) => ({
      name,
      visible: conditionMapping[this.columnFormat](name),
    }));
  };

  get nextColumnFormat() {
    return columnFormatMap[this.columnFormat];
  }

  private setInputTransactions = (data: string) => {
    const isRowEmpty = (row: StatementRecord) =>
      !!Object.values(row).reduce((acc, item) => acc + item, '');

    const result = Papa.parse<StatementRecord>(data, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
    });

    this.originalRecords = result.data.filter(isRowEmpty);
  };

  private setHeaders = (data: string) => {
    const result = Papa.parse<Header[]>(data, { preview: 1 });
    this.headers = result.data[0].map((item) => item.toLowerCase());
  };

  private setTransactions = () => {
    const transactionsCount = Math.min(5, this.originalRecords.length);
    this.previewRecords = Array.from({ length: transactionsCount }, () => ({
      ...transaction,
    }));
  };

  public createPreview = (data: ArrayBuffer | string, name: string) => {
    this.name = name;
    this.setHeaders(data.toString());
    this.setInputTransactions(data.toString());
    this.setTransactions();
  };

  public resetPreview = () => {
    this.name = '';
    this.headers = [];
    this.originalRecords = [];
    this.previewRecords = [];
    this.resultRecords = [];
    this.columnFormat = ColumnFormat.AMOUNT;
    this.isConvertingEnabled.setFalse();
    this.currencies = initCurrencies;
  };

  public saveStatement = () => {
    console.log(toJS(this.previewRecords));
    console.log(this.currencies);
  };

  public updatePreview = (key: string, rowKey: string) => {
    this.previewRecords = this.previewRecords.map((item, i) => {
      const rowValue = this.originalRecords[i][rowKey];
      return { ...item, [key]: rowValue };
    });
  };
}
