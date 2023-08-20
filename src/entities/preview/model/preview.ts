import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';
import { BooleanFlag } from 'src/shared/booleanFlag';

import { COLUMN, ColumnFormat, columns, transaction } from '../constants';
import {
  ConvertDirection,
  Currencies,
  Currency,
  Header,
  InputRecord,
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
  transactions = [] as Transaction[];
  inputRecords = [] as InputRecord[];
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
    const isRowEmpty = (row: InputRecord) =>
      !!Object.values(row).reduce((acc, item) => acc + item, '');

    const result = Papa.parse<InputRecord>(data, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
    });

    this.inputRecords = result.data.filter(isRowEmpty);
  };

  private setHeaders = (data: string) => {
    const result = Papa.parse<Header[]>(data, { preview: 1 });
    this.headers = result.data[0].map((item) => item.toLowerCase());
  };

  private setTransactions = () => {
    const transactionsCount = Math.min(5, this.inputRecords.length);
    this.transactions = Array.from({ length: transactionsCount }, () => ({
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
    this.inputRecords = [];
    this.transactions = [];
  };

  public saveStatement = () => {
    console.log(toJS(this.transactions));
  };

  public updatePreview = (key: string, rowKey: string) => {
    this.transactions = this.transactions.map((item, i) => {
      const rowValue = this.inputRecords[i][rowKey];
      return { ...item, [key]: rowValue };
    });
  };
}
