import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategories } from '../dto/categories.dto';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async GetAllCategories(page: number, limit: number) {
        const count = await this.categoriesRepository.countDocuments({});
        const count_page = (count / limit).toFixed();
        const data = await this.categoriesRepository.getByCondition(
            {},
            null,
            {
                sort: { _id: -1 },
                skip: (page - 1) * limit,
                limit: Number(limit)
            },
            { path: 'brand', select: 'title' }
        );
        return {
            data,
            current_page: page,
            count_page
        };
    }

    async GetCategoriesById(id: string) {
        const category = await this.categoriesRepository.findById(id);
        return {
            data: category ? category : null,
            success: category ? true : false,
            status: category ? HttpStatus.OK : HttpStatus.NOT_FOUND,
            message: category ? 'Categories found' : 'Categories not found'
        };
    }

    async CreateCategories(data: CreateCategories) {
        const { title } = data;
        const existingCategories = await this.categoriesRepository.findByCategories(title);
        if (existingCategories)
            return {
                data: null,
                success: false
            };
        const response = await this.categoriesRepository.create(data);
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            message: response ? 'Categories have been created successfully' : 'Categories were created unsuccessfully'
        };
    }

    async UpdateCategories(id: string, data: CreateCategories) {
        const { brand, title } = data;
        const existingCategory = await this.categoriesRepository.findById(id);
        if (!existingCategory) {
            return {
                data: null,
                success: false
            };
        }
        if (title && title !== existingCategory.title) {
            existingCategory.title = title;
        }
        if (brand && JSON.stringify(brand) !== JSON.stringify(existingCategory.brand)) {
            existingCategory.brand = brand;
        }
        const updatedCategory = await existingCategory.save();
        return {
            data: updatedCategory ? updatedCategory : null,
            success: updatedCategory ? true : false,
            status: updatedCategory ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            message: updatedCategory ? 'Edit categories successfully' : 'Editing categories failed'
        };
    }

    async DeleteCategories(id: string) {
        const category = await this.categoriesRepository.findById(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        const response = await this.categoriesRepository.deleteOne(id);
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            message: response ? 'Deleting categories successfully' : 'Deleting categories failed'
        };
    }
}
