import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, {Model, Schema, Types} from 'mongoose';
import {Product , ProductDocument} from "../auth/Schemas/product.schema";


@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async create(product: Product): Promise<Product> {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(productId: mongoose.Types.ObjectId): Promise<Product | null> {
        return this.productModel.findById(productId);
    }

    async update(id: string, product: Product): Promise<Product | null> {
        return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id).exec();
    }
}
