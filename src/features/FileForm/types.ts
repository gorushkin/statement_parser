export type FileInfo = {
  file: File;
  name: string;
  size: number;
};

export enum FileFormat {
  CSV = 'csv',
  XLS = 'xls',
  XLSX = 'xlsx',
}
