import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import {Product, ProductDocument} from "../auth/Schemas/product.schema";
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService,@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) {}

    @Get('browse')
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get()
    async findOne(@Body('id') id: mongoose.Types.ObjectId): Promise<Product | null> {
        return this.productService.findOne(id);
    }
    @Post('create')
    async create(
        @Body('productId') productId: string,
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('category') category: string,
        @Body('price') price: number,
        @Body('imageUrl') imageUrl: string,
    ) {
        const newProduct = new this.productModel({
            productId,
            name,
            description,
            category,
            price,
            imageUrl,
        });
        const result = await newProduct.save();
        return result.id as string;
    }
}