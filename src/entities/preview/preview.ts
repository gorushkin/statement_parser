import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';

import { COLUMN, ColumnFormat, columns, transaction } from './constants';
import { Header, InputRecord, Transaction } from './types';

export class Preview {
  name = '';
  headers = [] as Header[];
  transactions = [] as Transaction[];
  inputRecords = [] as InputRecord[];
  columns = columns;
  columnFormat: ColumnFormat = ColumnFormat.INOUT;

  constructor() {
    makeAutoObservable(this);
  }

  public switchFormat(format: ColumnFormat) {
    const switchFormatMap = {
      [ColumnFormat.AMOUNT]: ColumnFormat.INOUT,
      [ColumnFormat.INOUT]: ColumnFormat.AMOUNT,
    };

    this.columnFormat = switchFormatMap[format];
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
    this.transactions = new Array<Record<COLUMN, string>>(
      this.inputRecords.length
    ).fill(transaction);
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
