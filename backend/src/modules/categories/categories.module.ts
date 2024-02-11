import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from '../Brand/brand.module';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesSchema } from './models/categories.model';
import { CategoriesRepository } from './repositories/categories.repository';
import { CategoriesService } from './services/categories.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Categories', schema: CategoriesSchema }]),
        forwardRef(() => BrandModule)
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
    exports: []
})
export class CategoriesModule {}
