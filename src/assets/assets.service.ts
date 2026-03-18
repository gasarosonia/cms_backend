import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Asset } from "./entities/asset.entity";
import { CreateAssetDto } from "./dto/create-asset.dto";
import { Category } from "src/category/entities/category.entity";
import { UpdateAssetDto } from "./dto/update-asset.dto";

@Injectable()
export class AssetService {
 constructor(
  @InjectRepository(Asset)
  private assetRepository: Repository<Asset>,
 ) {}

 async create(createAssetDto: CreateAssetDto): Promise<Asset> {
  const asset = this.assetRepository.create({
    ...createAssetDto,
    category: { category_id: createAssetDto.category_id } as any,
  });
  return await this.assetRepository.save(asset);
 }
 
 async findAll() {
  const assets = await this.assetRepository.find();
  return assets.map(asset => this.applyDepreciation(asset));
 }

 async findOne(id: string) {
  const asset = await this.assetRepository.findOneBy({ id });
  if (!asset) throw new NotFoundException('Asset not found');
  return this.applyDepreciation(asset);
 }

 async update(id: string, updateAssetDto: UpdateAssetDto) {
  const asset = await this.assetRepository.preload({
    id,
    ...updateAssetDto,
    category: updateAssetDto.category_id ? ({ category_id: updateAssetDto.category_id } as any) : undefined,

  });
  if (!asset) throw new NotFoundException('Asset not found');
  return this.assetRepository.save(asset);
 }

 async remove(id: string) {
  const asset = await this.findOne(id);
  await this.assetRepository.remove(asset);
 
}

private applyDepreciation(asset: Asset) {
  const cost = Number(asset.purchase_cost);
  const rate = Number(asset.category.depreciation_rate);
  const purchaseDate = new Date(asset.purchase_date);
  const now = new Date();

  const months = (now.getFullYear() - purchaseDate.getFullYear()) * 12 + (now.getMonth() - purchaseDate.getMonth());
  const effectiveMonths = months > 0 ? months : 0;

  const monthlyDepreciation = cost * rate;
  const totalDepreciation = monthlyDepreciation * effectiveMonths;
  const currentBookValue = cost - totalDepreciation;

  return {
    ...asset,
    calculations: {
    months_Owned: effectiveMonths,
    monthly_depreciation: monthlyDepreciation,
    total_depreciation: totalDepreciation.toFixed(2),
    current_book_value: (currentBookValue > 0 ? currentBookValue : 0).toFixed(2),

  }
};
}

 }

