import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAssetDto {
   @ApiProperty({ example: 'Laptop'})
   @IsString()
   name: string;
   
   @ApiProperty({ example: 1000.50 })
   @IsNumber()
   @Min(0)
   @Type(() => Number)
   purchase_cost: number;

   @ApiProperty({ example: '2025-01-01', description: 'YYYY-MM-DD' })
   @IsDateString()
   purchase_date: Date;

   @ApiProperty({ example: 'HISP-RW-001' })
   @IsString()
   tag_id: string;

   @ApiProperty({ description: 'The UUId of the associated Category' })
   @IsUUID()
   category_id: string;
}