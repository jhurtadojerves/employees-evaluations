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
    Object.setPrototypeOf(this, HttpNotFound.prototype);
  }
}

export class HttpBadRequest extends HttpError {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
    Object.setPrototypeOf(this, HttpBadRequest.prototype);
  }
}

export class HttpUnauthorized extends HttpError {
  constructor(message?: string) {
    const defaultMessage = message || 'Unauthorized: No user not found';
    super(StatusCodes.UNAUTHORIZED, defaultMessage);
    Object.setPrototypeOf(this, HttpUnauthorized.prototype);
  }
}

export class HttpForbidden extends HttpError {
  constructor(message?: string) {
    const defaultMessage = message || 'Forbidden: You do not have access';
    super(StatusCodes.FORBIDDEN, defaultMessage);
    Object.setPrototypeOf(this, HttpForbidden.prototype);
  }
}

export class HttpNotImplemented extends HttpError {
  constructor(message?: string) {
    const defaultMessage = message || 'Not allowed';
    super(StatusCodes.METHOD_NOT_ALLOWED, defaultMessage);
    Object.setPrototypeOf(this, HttpNotImplemented.prototype);
  }
}
