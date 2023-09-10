import { makeAutoObservable, toJS } from 'mobx';
import Papa from 'papaparse';
import { getRates } from 'src/shared/api/api';
import { BooleanFlag } from 'src/shared/booleanFlag';
import { Currency } from 'src/shared/types';

import {
  initCurrencies,
  initPreviewRecords,
  previewColumns,
} from './constants';
import {
  COLUMN,
  ConvertDirection,
  Header,
  PreviewRecord,
  StatementRecord,
} from './types';

export class Preview {
  name = '';
  headers = [] as Header[];
  originalRecords = [] as StatementRecord[];

  private resultRecords = [] as PreviewRecord[];
  private tempResultRecords = [] as PreviewRecord[];
  private columns = previewColumns;

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
    const length = this.originalRecords.length;
    this.resultRecords = Array.from({ length }, () => ({
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
    this.resultRecords = [];
    this.isConvertingEnabled.setFalse();
    this.currencies = initCurrencies;
  };

  get previewRecords() {
    const length = Math.min(5, this.resultRecords.length);
    return this.resultRecords.slice(0, length);
  }

  get visibleColumns() {
    return this.columns.filter(({ visible }) => !!visible);
  }

  public saveStatement = () => {
    console.log(toJS(this.resultRecords));
  };

  public updatePreview = (key: string, rowKey: string) => {
    this.resultRecords = this.resultRecords.map((item, i) => {
      const rowValue = this.originalRecords[i][rowKey];
      return { ...item, [key]: rowValue };
    });
  };

  public updateRates = async () => {
    const dates = this.resultRecords.map(({ date }) => {
      const result = new Date(date);
      return result.toString() === 'Invalid Date' ? null : result;
    });
    const rates = await Promise.all(dates.map(getRates));
    this.tempResultRecords = this.resultRecords;
    this.resultRecords = this.resultRecords.map((record, index) => ({
      ...record,
      [COLUMN.AMOUNT]: rates[index][this.currencies.toCurrency],
    }));
  };

  public resetRates = () => {
    this.resultRecords = this.tempResultRecords;
    this.tempResultRecords = [];
  };

  public saveRates = () => {
    this.tempResultRecords = [];
  };

  get CSV() {
    const addQuotes = (value: string) => `"${value}"`;

    const getStringRow = (row: PreviewRecord) =>
      Object.values(row).map(addQuotes).join(',');

    const headersRow = this.headers.map(addQuotes).join(',');
    const recordRows = this.resultRecords.map(getStringRow);

    const file = headersRow + '\n' + recordRows.join('\n');

    return { file, name: this.name };
  }
}
