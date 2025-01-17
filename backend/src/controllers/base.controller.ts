import { Request, Response, NextFunction } from 'express';
import { Model, Document } from 'mongoose';
import { ApiResponse, PaginatedResponse } from '../types/api.types';
import { AppError } from '../middleware/error.middleware';

export class BaseController<T extends Document> {
  constructor(
    protected model: Model<T>,
    protected modelName: string
  ) {}

  public async getAll(
    req: Request,
    res: Response<PaginatedResponse<T[]>>,
    next: NextFunction,
    filter: object = {}
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sort = req.query.sort as string || '-createdAt';

      const skip = (page - 1) * limit;
      const total = await this.model.countDocuments(filter);

      const items = await this.model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      res.json({
        success: true,
        data: items,
        pagination: {
          total,
          page,
          limit,
          hasMore: total > skip + items.length
        }
      });
    } catch (error) {
      next(error);
    }
  }

  public async getOne(
    req: Request,
    res: Response<ApiResponse<T>>,
    next: NextFunction
  ) {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        throw new AppError(`${this.modelName} not found`, 404);
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  public async create(
    req: Request,
    res: Response<ApiResponse<T>>,
    next: NextFunction
  ) {
    try {
      const item = await this.model.create(req.body);
      res.status(201).json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  public async update(
    req: Request,
    res: Response<ApiResponse<T>>,
    next: NextFunction
  ) {
    try {
      const item = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!item) {
        throw new AppError(`${this.modelName} not found`, 404);
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  public async delete(
    req: Request,
    res: Response<ApiResponse<null>>,
    next: NextFunction
  ) {
    try {
      const item = await this.model.findByIdAndDelete(req.params.id);
      if (!item) {
        throw new AppError(`${this.modelName} not found`, 404);
      }

      res.json({
        success: true,
        message: `${this.modelName} deleted successfully`
      });
    } catch (error) {
      next(error);
    }
  }
} 