import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/base/base.repository';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(
        @InjectModel('User')
        private readonly userRepository: Model<User>
    ) {
        super(userRepository);
    }

    async countDocuments(filter?: any) {
        return await this.userRepository.countDocuments({ role: 1111 });
    }
}
