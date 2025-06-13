import { Response } from 'express';

type TMeta = {
  limit: number |undefined;
  page: number |undefined;
  total: number |undefined;
  totalPage?: number|undefined;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta ;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode:data?.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
