import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { Logger } from '../../logger/logger.interface.js';
import { Controller } from './controller.interface.js';
import { Route } from '../types/route.interface.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router;

  constructor(protected readonly logger: Logger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    this._router[route.method](route.path, wrapperAsyncHandler);
    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`,
    );
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res.type(this.DEFAULT_CONTENT_TYPE).status(statusCode).json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
