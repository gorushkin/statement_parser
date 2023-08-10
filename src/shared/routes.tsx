import { Navigate, RouteObject } from 'react-router-dom';
import { PreviewPage } from 'src/pages/PreviewPage';
import { UploadFilePage } from 'src/pages/UploadFilePage';

export enum ROUTE {
  ALL = '*',
  ROOT = '/',
  STATEMENT = '/statement',
  STATEMENT_PREVIEW = '/statement_preview',
  UPLOAD_FILE = '/upload',
}

type RouteType = RouteObject & {
  isNav: boolean;
  name: string;
  path: ROUTE | string;
};

export const routes: RouteType[] = [
  { element: <UploadFilePage />, isNav: true, name: 'Upload File', path: ROUTE.UPLOAD_FILE },
  { element: <UploadFilePage />, isNav: false, name: 'Upload File', path: ROUTE.ROOT },
  { element: <PreviewPage />, isNav: true, name: 'Preview Statement', path: ROUTE.STATEMENT_PREVIEW },
  { element: <Navigate replace to="/" />, isNav: false, name: 'Upload File', path: ROUTE.ALL },
];
