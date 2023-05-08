import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ShoppingCartService from "../shoppingcart/shoppingcart.service";
import {ShoppingCartDocument} from "../auth/Schemas/shoppingcart.schema";
import {Checkout , CheckoutDocument} from "../auth/Schemas/checkout.schema";

@Injectable()
export class CheckoutService {
    constructor(
        @InjectModel(Checkout.name) private readonly checkoutModel: Model<CheckoutDocument>,
      //  private readonly shoppingCartService: ShoppingCartService,
        @Inject(forwardRef(() => ShoppingCartService))
        private shoppingCartService: ShoppingCartService,

    ) {}

    async placeOrder(userId: string): Promise<CheckoutDocument> {
        const shoppingCart: ShoppingCartDocument = await this.shoppingCartService.getShoppingCart(userId);

        // Check if shopping cart is empty
        if (shoppingCart.products.length === 0) {
            throw new Error('Cannot place order: Shopping cart is empty.');
        }

        const checkout: CheckoutDocument = new this.checkoutModel({
            userId: shoppingCart.userId,
            products: shoppingCart.products,
            //totalPrice: shoppingCart.totalPrice,
        });

        try {
            const newCheckout = await checkout.save();
           // await this.shoppingCartService.clearShoppingCart(userId);
            return newCheckout;
        } catch (error) {
            console.log(error)
            throw new Error(`Error placing order for user ID '${userId}'.`);
        }
    }
}