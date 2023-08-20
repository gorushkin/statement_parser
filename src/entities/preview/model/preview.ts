import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';
import { BooleanFlag } from 'src/shared/booleanFlag';

import { COLUMN, ColumnFormat, columns, transaction } from '../constants';
import {
  ConvertDirection,
  Currencies,
  Currency,
  Header,
  StatementRecord,
  Transaction,
} from './types';

export class Preview {
  conditionMapping: Record<ColumnFormat, (column: COLUMN) => boolean> = {
    [ColumnFormat.AMOUNT]: (column) =>
      column !== COLUMN.OUTFLOW && column !== COLUMN.INFLOW,
    [ColumnFormat.INOUT]: (column) => column !== COLUMN.AMOUNT,
  };

  columnFormatMap = {
    [ColumnFormat.AMOUNT]: ColumnFormat.INOUT,
    [ColumnFormat.INOUT]: ColumnFormat.AMOUNT,
  };

  name = '';
  headers = [] as Header[];
  previewRecords = [] as Transaction[];
  originalRecords = [] as StatementRecord[];
  resultRecords = [] as StatementRecord[];
  columnFormat: ColumnFormat = ColumnFormat.AMOUNT;
  columns = columns.map((column) => ({
    name: column,
    visible: this.conditionMapping[this.columnFormat](column),
  }));
  currencies: Currencies = {
    fromCurrency: Currency.NZD,
    toCurrency: Currency.RUB,
  };
  isConvertingEnabled = new BooleanFlag(false);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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
    this.columnFormat = this.columnFormatMap[this.columnFormat];
    this.columns = this.columns.map(({ name }) => ({
      name,
      visible: this.conditionMapping[this.columnFormat](name),
    }));
  };

  get nextColumnFormat() {
    return this.columnFormatMap[this.columnFormat];
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
  };

  public saveStatement = () => {
    console.log(toJS(this.previewRecords));
  };

  public updatePreview = (key: string, rowKey: string) => {
    this.previewRecords = this.previewRecords.map((item, i) => {
      const rowValue = this.originalRecords[i][rowKey];
      return { ...item, [key]: rowValue };
    });
  };
}
