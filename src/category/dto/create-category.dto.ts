import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Electronics', description: 'The name of asset category' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: 0.0005, description: 'Monthly depreciation rate (0.005% to 0.5%)' })
    @IsNumber({ maxDecimalPlaces: 4 })
    @Type(() => Number)
    @Min(0.0005)
    @Max(0.005)
    depreciation_rate: number;

    @ApiProperty({ example: 'High-value tech assets', required: false })
    @IsString()
    @IsOptional()
    description?: string;

}
