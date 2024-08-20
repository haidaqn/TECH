import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategories {
    @ApiProperty({ description: 'The title of the category' })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'List of associated brands',
        type: [String],
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    brand: string[] | null;
}
export class PaginationCategoriesDto {
    @IsNotEmpty()
    page: number;
    @IsNotEmpty()
    limit: number;
}
