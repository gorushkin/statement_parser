import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';
import { BooleanFlag } from 'src/shared/booleanFlag';

import {
  initCurrencies,
  initPreviewRecords,
  previewColumns,
} from './constants';
import {
  ConvertDirection,
  Currency,
  Header,
  PreviewRecord,
  StatementRecord,
} from './types';

export class Preview {
  name = '';
  headers = [] as Header[];
  previewRecords = [] as PreviewRecord[];
  originalRecords = [] as StatementRecord[];
  resultRecords = [] as StatementRecord[];

  columns = previewColumns;

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

  private setOriginalRecords = (data: string) => {
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

  private setPreviewRecords = () => {
    const length = Math.min(5, this.originalRecords.length);
    this.previewRecords = Array.from({ length }, () => ({
      ...initPreviewRecords,
    }));
  };

  public createPreview = (data: ArrayBuffer | string, name: string) => {
    this.name = name;
    this.setHeaders(data.toString());
    this.setOriginalRecords(data.toString());
    this.setPreviewRecords();
  };

  public resetPreview = () => {
    this.name = '';
    this.headers = [];
    this.originalRecords = [];
    this.previewRecords = [];
    this.resultRecords = [];
    this.isConvertingEnabled.setFalse();
    this.currencies = initCurrencies;
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
