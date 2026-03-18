import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { AssetService } from './assets.service';
import { AssetController } from './assets.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Asset])],
    controllers: [AssetController],
    providers: [AssetService],
})
export class AssetsModule {}