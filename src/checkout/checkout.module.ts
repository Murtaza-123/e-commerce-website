import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartModule} from "../shoppingcart/shoppingcart.module";
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import {Checkout , CheckoutSchema} from "../auth/Schemas/checkout.schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Checkout.name, schema: CheckoutSchema }]),
    forwardRef(() => ShoppingCartModule),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService]
})
export class CheckoutModule {}