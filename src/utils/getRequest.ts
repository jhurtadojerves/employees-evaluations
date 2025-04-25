/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
// @ts-expect-error
import httpContext from 'express-cls-hooked';

export const getRequestContext = (): Request => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const req = httpContext.get('req');

  return req;
};
