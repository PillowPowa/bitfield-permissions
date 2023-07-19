import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  public async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  public async findOne(
    {
      where,
      select,
    }: {
      where: FilterQuery<TDocument>;
      select?: (Partial<keyof TDocument> & string)[];
    },
    filter?: Partial<{ skipExistChecking: boolean }>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(where, {}, { lean: true })
      .select(select);

    if (!document && !filter?.skipExistChecking) {
      throw this.handleEmpty(where);
    }

    return document;
  }

  public async findOneAndUpdate({
    where,
    update,
    select,
  }: {
    where: FilterQuery<TDocument>;
    update: UpdateQuery<TDocument>;
    select?: (Partial<keyof TDocument> & string)[];
  }): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(where, update, {
        lean: true,
        new: true,
      })
      .select(select);

    if (!document) {
      throw this.handleEmpty(where);
    }

    return document;
  }

  public async findById(
    id: Types.ObjectId,
    filter?: Partial<{
      select: (Partial<keyof TDocument> & string)[];
      skipExistChecking: boolean;
    }>,
  ): Promise<TDocument> {
    const document = await this.model.findById(id).select(filter?.select);

    if (!document && !filter?.skipExistChecking) {
      throw this.handleEmpty(id);
    }

    return document;
  }

  public async deleteById(id: Types.ObjectId): Promise<TDocument> {
    return this.model.findByIdAndDelete(id);
  }

  public async updateById(
    id: Types.ObjectId,
    {
      update,
      select,
    }: {
      update: UpdateQuery<TDocument>;
      select?: (Partial<keyof TDocument> & string)[];
    },
  ): Promise<TDocument> {
    return this.model.findByIdAndUpdate(id, update).select(select);
  }

  public async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  public async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  public async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  private handleEmpty(filterQuery: FilterQuery<TDocument>) {
    this.logger.warn(`Document not found with filterQuery:`, filterQuery);
    return new NotFoundException('Document not found.');
  }
}
