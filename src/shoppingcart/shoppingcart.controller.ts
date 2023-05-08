import {Controller, Post, Body, Get, Param, Put, Delete, NotFoundException} from '@nestjs/common';
import {ShoppingCartService} from "./shoppingcart.service";
import {ShoppingCartDocument} from "../auth/Schemas/shoppingcart.schema";
import mongoose from "mongoose";

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {
    }

    @Post('createCart')
    async createShoppingCart(@Body('userId') userId: string): Promise<ShoppingCartDocument> {
        return this.shoppingCartService.createShoppingCart(userId);
    }

    @Get('view')
    async getShoppingCart(@Body('userId') userId: string): Promise<ShoppingCartDocument> {
        return this.shoppingCartService.getShoppingCart(userId);
    }

    @Post('add')
    async addProductToCart(
        @Body('userId') userId: string,
        @Body('productId') productId: mongoose.Types.ObjectId,
        @Body('quantity') quantity: number,
    ): Promise<ShoppingCartDocument> {
        return this.shoppingCartService.addProductToCart(userId, productId, quantity);

    }

    @Delete('remove')
    async removeProductFromCart(@Body('userId') userId: string, @Body('productId') productId: mongoose.Types.ObjectId): Promise<ShoppingCartDocument> {
        return this.shoppingCartService.removeProductFromCart(userId, productId);
    }


}