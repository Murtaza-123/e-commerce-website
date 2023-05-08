import { Controller, Post, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import {CheckoutService} from "./checkout.service";
import {Checkout} from "../auth/Schemas/checkout.schema";

@Controller('shopping-cart')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) {}

    @Post('checkout')
    async placeOrder(@Body('userId') userId: string): Promise<Checkout> {
        try {
            const checkout = await this.checkoutService.placeOrder(userId);
            return checkout;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            } else {
                throw new InternalServerErrorException('Error placing order.');
            }
        }
    }
}


