import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import {ApiTags, ApiOperation } from '@nestjs/swagger';
import { AssetService } from './assets.service';
import { CreateAssetDto} from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@ApiTags('assets')
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new asset' })
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all asset with live valuation' })
  findAll() {
    return this.assetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.assetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() UpdateAssetDto: UpdateAssetDto){
    return this.assetService.update(id, UpdateAssetDto);
  }

  @Delete (':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.assetService.remove(id);
  }
}