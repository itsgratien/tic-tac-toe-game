import { Method, ResponseType } from 'axios';

export interface ActionSetupT {
  onSuccess: (values: any) => void;
  onError: (values: any) => void;
  url: string;
  method: Method;
  contentType?: 'application/json' | 'multipart/form-data';
  responseType?: ResponseType;
  data?: any;
}
