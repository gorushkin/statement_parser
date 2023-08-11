import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';

import { columns, MANDATORY_FIELD, outputTransaction } from './constants';
import { Header, Transaction } from './types';

export class Preview {
  name = '';
  headers = [] as Header[];
  outputTransactions = [] as Record<MANDATORY_FIELD, string>[];
  inputTransactions = [] as Transaction[];
  columns = columns;

  constructor() {
    makeAutoObservable(this);
  }

  private setInputTransactions = (data: string) => {
    const result = Papa.parse<Transaction>(data, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
    });

    this.inputTransactions = result.data;
  };

  private setHeaders = (data: string) => {
    const result = Papa.parse<Header[]>(data, { preview: 1 });
    this.headers = result.data[0].map((item) => item.toLowerCase());
  };

  private setOutputTransactions = () => {
    this.outputTransactions = new Array<Record<MANDATORY_FIELD, string>>(
      this.inputTransactions.length
    ).fill(outputTransaction);
  };

  public convert = (data: ArrayBuffer | string, name: string) => {
    this.name = name;
    this.setHeaders(data.toString());
    this.setInputTransactions(data.toString());
    this.setOutputTransactions();
  };

  public reset = () => {
    this.name = '';
    this.headers = [];
    this.inputTransactions = [];
    this.outputTransactions = [];
  };

  public saveStatement = () => {
    console.log(toJS(this.outputTransactions));
  };

  public updatePreview = (key: string, rowKey: string) => {
    this.outputTransactions = this.outputTransactions.map((item, i) => {
      const rowValue = this.inputTransactions[i][rowKey];
      return { ...item, [key]: rowValue };
    });
  };
}
