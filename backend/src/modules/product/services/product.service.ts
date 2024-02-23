import { HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Comment, ProductDto } from '../dto/product.dto';
import { ProductRepository } from '../repositories/product.repository';
@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}
    async getAllProduct(
        page: number,
        limit: number,
        title?: string,
        priceTo?: number,
        priceEnd?: number,
        color?: string,
        category?: string,
        sold: boolean = false,
        search?: string
    ) {
        const searchCondition: any = {};
        if (search) searchCondition.title = { $regex: search, $options: 'i' };
        if (title) searchCondition.title = { $regex: title, $options: 'i' };
        if (priceTo || priceEnd) {
            searchCondition.price = {};
            if (priceTo) searchCondition.price.$gte = priceTo;
            if (priceEnd) searchCondition.price.$lte = priceEnd;
        }
        if (color) searchCondition.color = { $regex: color, $options: 'i' };
        if (category) searchCondition.category = { $regex: category, $options: 'i' };

        try {
            const sortCondition = sold
                ? { totalRatings: -1, sold: -1, _id: -1, createdAt: -1 }
                : { totalRatings: -1, _id: -1, createdAt: -1 };
            const count = await this.productRepository.countDocuments(searchCondition);
            const count_page = Math.ceil(count / limit);
            const data = await this.productRepository.getByCondition(searchCondition, null, {
                sort: sortCondition,
                skip: (page - 1) * limit,
                limit: Number(limit)
            });
            return {
                data,
                current_page: page,
                count_page
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getDetailProduct(id: string) {
        const response = await this.productRepository.findByCondition({ _id: id }, null, null, {
            path: 'ratings.postedBy',
            select: 'name avatar'
        });
        return {
            data: response ? response : null,
            success: response ? true : false,
            status: response ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            message: response ? 'Product found' : 'Product not found'
        };
    }
    async deleteMutipleProduct(productIDs: string[]) {
        try {
            const validProductIDs = productIDs.filter((productID) => Types.ObjectId.isValid(productID));
            if (!validProductIDs) throw new Error('Invalid product IDs');
            await this.productRepository.deleteMany(validProductIDs);
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async updateProductSold(_id: string, quantity: number) {
        try {
            const res = await this.productRepository.updateMany({ _id }, { $inc: { sold: quantity } });
            return res ? true : false;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async updateComment(commentReq: Comment, userID: string) {
        try {
            const { star, comment, idProduct } = commentReq;
            const dateNow = new Date();
            await this.productRepository.findByIdAndUpdate(idProduct, {
                $push: {
                    ratings: {
                        star,
                        comment,
                        updateAt: dateNow,
                        postedBy: userID
                    }
                }
            });
            const product = await this.productRepository.findById(idProduct);
            if (!product) throw new Error('product not found');
            const ratingsCount = product.ratings.length;
            const totalRatings = product.ratings.reduce((sum, item) => sum + item.star, 0);
            product.totalRatings = Math.round((totalRatings * 10) / ratingsCount) / 10 + '';
            product.save();
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createProduct(data: ProductDto) {
        try {
            const res = await this.productRepository.create(data);
            return res ? true : false;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduct(data: ProductDto, id: string) {
        try {
            const res = await this.productRepository.findByIdAndUpdate(id, data);
            return res ? true : false;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
