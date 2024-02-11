import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/base/base.repository';
import { Brand } from '../models/brand.model';

@Injectable()
export class BrandRepository extends BaseRepository<Brand> {
    constructor(
        @InjectModel('Brand')
        private readonly brandModel: Model<Brand>
    ) {
        super(brandModel);
    }

    async countDocuments(filter?: any) {
        return await this.brandModel.countDocuments(filter);
    }

    async findByBrand(title: string) {
        return await this.brandModel.find({
            title: title
        });
    }
}
