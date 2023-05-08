import {

    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {ShoppingCart, ShoppingCartDocument} from "../auth/Schemas/shoppingcart.schema";
import {CheckoutService} from "../checkout/checkout.service";
import {ProductService} from "../product/product.service";

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart.name) private readonly shoppingCartModel: Model<ShoppingCartDocument>,
        private checkoutService: CheckoutService,
        private productService: ProductService,
    ) {
    }

    async getShoppingCart(userId: string): Promise<ShoppingCartDocument> {
        const shoppingCart = await this.shoppingCartModel.findOne({userId}).exec();
        if (shoppingCart) {
            return shoppingCart;
        } else {
            return this.createShoppingCart(userId);
        }
    }
    async addProductToCart(userId: string, productId: mongoose.Types.ObjectId, quantity: number): Promise<ShoppingCartDocument> {
        const shoppingCart = await this.getShoppingCart(userId);
        const productIndex = shoppingCart.products.findIndex((p) => p.productId === (productId));
        if (productIndex >= 0) {
            shoppingCart.products[productIndex].quantity += quantity;
        } else {
            shoppingCart.products.push({productId, quantity});
        }
        return shoppingCart.save();
    }

    async removeProductFromCart(userId: string, productId: mongoose.Types.ObjectId): Promise<ShoppingCartDocument> {
        const shoppingCart = await this.getShoppingCart(userId);
        const productIndex = shoppingCart.products.findIndex((p) => p.productId === (productId));
        if (productIndex >= 0) {
            shoppingCart.products.splice(productIndex, 1);
            return shoppingCart.save();
        }
        throw new NotFoundException('Product not found in cart');
    }

    async createShoppingCart(userId: string): Promise<ShoppingCartDocument> {
        const shoppingCart = new this.shoppingCartModel({
            userId: userId,
            products: [],
        });

        try {
            const newShoppingCart = await shoppingCart.save() as ShoppingCartDocument;
            return newShoppingCart;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(`Error creating shopping cart for user ID '${userId}'.`);
        }
    }


}

export default ShoppingCartService