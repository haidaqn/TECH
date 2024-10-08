import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BrandDto, PaginationBrandDto } from '../dto/brand.dto';
import { BrandService } from '../services/brand.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get('getAll')
    @ApiQuery   ({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getAllBrand(@Query() { page, limit }: PaginationBrandDto) {
        return await this.brandService.GetAllBrand(page, limit);
    }

    @Get('hello')
    async getHello() {
        return 'Hello Tech Store';
    }

    @Post('createBrand')
    async createBrand(@Body() { title }: BrandDto) {
        return await this.brandService.CreateBrand(title);
    }

    @Delete('delete/:id')
    async deleteBrand(@Param('id') id: string) {
        return await this.brandService.DeleteBrand(id);
    }

    @Patch('update/:id')
    async updateBrand(@Param('id') id: string, @Body() { title }: BrandDto) {
        return await this.brandService.UpdateBrand(id, title);
    }

    @Get(':id')
    async GetBrandById(@Param('id') id: string) {
        return await this.brandService.GetBrandById(id);
    }
}
