import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';

import { COLUMN, columns, transaction } from './constants';
import { Header, InputRecord, Transaction } from './types';

export class Preview {
  name = '';
  headers = [] as Header[];
  transactions = [] as Transaction[];
  private inputRecords = [] as InputRecord[];
  columns = columns;

  constructor() {
    makeAutoObservable(this);
  }

  private setInputTransactions = (data: string) => {
    const result = Papa.parse<InputRecord>(data, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
    });

    this.inputRecords = result.data;
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
