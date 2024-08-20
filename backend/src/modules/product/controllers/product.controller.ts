import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { Comment, deleteMutipleProduct, PaginationProductDto, ProductDto } from '../dto/product.dto';
import { ProductService } from '../services/product.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('getAll')
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'title', required: false, type: String })
    @ApiQuery({ name: 'priceTo', required: false, type: Number })
    @ApiQuery({ name: 'priceEnd', required: false, type: Number })
    @ApiQuery({ name: 'color', required: false, type: String })
    @ApiQuery({ name: 'sold', required: false, type: Number })
    @ApiQuery({ name: 'category', required: false, type: String })
    @ApiQuery({ name: 'search', required: false, type: String })
    async getAllProduct(
        @Query() { page, limit, title, priceTo, priceEnd, color, sold, category, search }: PaginationProductDto
    ) {
        return await this.productService.getAllProduct(
            page,
            limit,
            title,
            priceTo,
            priceEnd,
            color,
            category,
            sold,
            search
        );
    }

    @Get(':id')
    async getProductById(@Param('id') id: string) {
        return await this.productService.getDetailProduct(id);
    }

    @Post('create')
    async createProduct(@Body() body: ProductDto) {
        return await this.productService.createProduct(body);
    }

    @Delete('delete')
    async deleteProduct(@Body() data: deleteMutipleProduct) {
        return await this.productService.deleteMutipleProduct(data.ids);
    }

    @Patch('update/:id')
    async updateProduct(@Param('id') id: string, @Body() data: ProductDto) {
        return await this.productService.updateProduct(data, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('updateRating')
    async updateRatings(@Req() request: any, @Body() body: Comment) {
        const userId = (request.user._id as ObjectId).toString();
        return await this.productService.updateComment(body, userId);
    }
}
