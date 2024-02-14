import { HttpStatus, Injectable } from '@nestjs/common';
import { BrandRepository } from '../repositories/brand.repository';

@Injectable()
export class BrandService {
    constructor(private readonly brandRepository: BrandRepository) {}

    async GetAllBrand(page: number, limit: number) {
        const count = await this.brandRepository.countDocuments({});
        const count_page = (count / limit).toFixed();

        const data = await this.brandRepository.getByCondition({}, null, {
            sort: {
                _id: -1
            },
            skip: (page - 1) * limit,
            limit: Number(limit)
        });
        return {
            data,
            current_page: page,
            count_page
        };
    }

    async GetBrandById(id: string) {
        const response = await this.brandRepository.findById(id);
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.FOUND,
            message: response ? 'Found Brand' : 'Brand not found'
        };
    }

    async CreateBrand(title: string) {
        const brand = await this.brandRepository.findByBrand(title);
        if (brand[0] && brand) {
            return {
                data: null,
                success: false,
                status: HttpStatus.BAD_REQUEST,
                message: 'Brand already exists'
            };
        }
        const response = await this.brandRepository.create({ title: title });
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
            message: response ? 'Create a successful brand' : 'cannot create a brand'
        };
    }

    async UpdateBrand(id: string, title: string) {
        const response = await this.brandRepository.findByIdAndUpdate(id, { title });
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            message: response ? 'Successfully edited the brand' : 'Brand editing failed'
        };
    }

    async DeleteBrand(id: string) {
        const brand = await this.brandRepository.deleteOne(id);
        if (brand.deletedCount)
            return {
                data: null,
                success: true,
                status: HttpStatus.OK,
                message: 'Brand deletion success'
            };
        return {
            data: null,
            success: false,
            status: HttpStatus.BAD_REQUEST,
            message: 'Brand deletion failed'
        };
    }

    async Hello() {
        return 'Hello Tech Store';
    }
}

