import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { Comment, PaginationProductDto, ProductDto } from '../dto/product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('getAll')
    async getAllProduct(
        @Query() { page, limit, title, priceTo, priceEnd, color, sold, category }: PaginationProductDto
    ) {
        return await this.productService.getAllProduct(page, limit, title, priceTo, priceEnd, color, category, sold);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return await this.productService.getDetailProduct(id);
    }

    @Get('create')
    async createProduct(data: ProductDto) {}

    @Delete('delete')
    async deleteProduct(@Body() body) {
        return await this.productService.deleteMutipleProduct(body as string[]);
    }

    @Patch('update/:id')
    async updateProduct(@Param('id') id: string, @Body() data: ProductDto) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('updateRating')
    async updateRatings(@Req() request: any, @Body() body: Comment) {
        const userId = (request.user._id as ObjectId).toString();
        return await this.productService.updateComment(body, userId);
    }
}
