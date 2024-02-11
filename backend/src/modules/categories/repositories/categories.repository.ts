import { BaseRepository } from 'src/shared/base/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories } from '../models/categories.model';

@Injectable()
export class CategoriesRepository extends BaseRepository<Categories> {
    constructor(
        @InjectModel('Categories')
        private readonly categoriesModel: Model<Categories>
    ) {
        super(categoriesModel);
    }

    async countDocuments(filter?: any) {
        return await this.categoriesModel.countDocuments(filter);
    }

    async findByCategories(title: string) {
        return await this.categoriesModel.findOne({
            title: title
        });
    }
}
