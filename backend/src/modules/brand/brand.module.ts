import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from './models/brand.model';
import { BrandRepository } from './repositories/brand.repository';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }])],
    controllers: [BrandController],
    providers: [BrandService, BrandRepository],
    exports: [BrandRepository, BrandService]
})
export class BrandModule {}
