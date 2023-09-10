import { Cell } from 'node_modules/read-excel-file/types';
import readXlsxFile from 'read-excel-file';

import { BANK, SETTINGS } from './constants';
import { Settings } from './types';

export class Parser {
  columns: string[] = [];
  rows: string[][] = [];
  bank: BANK;
  settings: Settings;

  constructor() {
    this.bank = BANK.VAKIF;
    this.settings = SETTINGS[this.bank];
  }

  private getCSV = () => {
    const addQuotes = (value: string) => `"${value}"`;

    const getStringRow = (row: string[]) =>
      Object.values(row).map(addQuotes).join(',');

    const headersRow = this.columns.map(addQuotes).join(',');
    const recordRows = this.rows.map(getStringRow);
    return headersRow + '\n' + recordRows.join('\n');
  };

  public convert = async (file: File) => {
    const cellToString = (cell: Cell) => (cell ? cell.toString() : '');

    const { headers, rows } = this.settings;

    const lines = await readXlsxFile(file);
    this.columns = lines.slice(headers.start, headers.end)[0].map(cellToString);
    this.rows = lines
      .slice(rows.start, rows.end)
      .map((row) => row.map(cellToString));
    return this.getCSV();
  };
}
