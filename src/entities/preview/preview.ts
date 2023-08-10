import { makeObservable, observable } from 'mobx';
import Papa from 'papaparse';
import { DB } from 'src/entities/dataBase';
import { v4 as uuid } from 'uuid';

import { initMappingState, MANDATORY_FIELD } from './constants';
import { Header, Transaction } from './types';

export class Preview extends DB {
  private getBody = (data: string) => {
    const result = Papa.parse<Transaction>(data, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
    });

    return result.data;
  };

  private getHeaders = (data: string) => {
    const result = Papa.parse<Header[]>(data, { preview: 1 });
    return result.data[0].map((item) => item.toLowerCase());
  };

  public convert = (data: ArrayBuffer | string, name: string) => {
    this.name = name;
    this.key = uuid();
    this.headers = this.getHeaders(data.toString());
    this.rows = this.getBody(data.toString());
  };

  headers = [] as Header[];

  mapping: Record<MANDATORY_FIELD, string> = initMappingState;

  name = '';

  public reset = () => {
    this.name = '';
    this.headers = [];
    this.rows = [];
  };

  rows = [] as Transaction[];

  public setMapping = (name: string, value: string) => {
    this.mapping = { ...this.mapping, [name]: value };
  };

  constructor() {
    super('');
    makeObservable(this, {
      mapping: observable,
      name: observable,
    });
  }
}
