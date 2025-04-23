import { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class HttpNotFound extends HttpError {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class HttpBadRequest extends HttpError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class HttpUnauthorized extends HttpError {
  constructor(message?: string) {
    const defaultMessage = message || 'Unauthorized: No user not found';
    super(StatusCodes.UNAUTHORIZED, defaultMessage);
  }
}

export class HttpForbidden extends HttpError {
  constructor(message?: string) {
    const defaultMessage = message || 'Forbidden: You do not have access';
    super(StatusCodes.FORBIDDEN, defaultMessage);
  }
}
