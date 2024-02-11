import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/base/base.repository';
import { Product } from '../models/product.model';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(
        @InjectModel('Product')
        private readonly productRepository: Model<Product>
    ) {
        super(productRepository);
    }
    async countDocuments(filter?: any) {
        return await this.productRepository.countDocuments(filter);
    }
}
