import { HTTPErrorCodes } from 'src/types/index';

declare global {
  namespace Express {
    export interface Response {
      sendError(status: HTTPErrorCodes, message?: any): this;
    }
  }
}
