import { AbstractRepository } from "../../utils/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "../../schemas/user.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UsersRepository.name);
    
    constructor(
        @InjectModel(User.name) orderModel: Model<User>,
        @InjectConnection() connection: Connection,
    ) {
        super(orderModel, connection);
    }
}