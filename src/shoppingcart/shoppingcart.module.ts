import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ShoppingCart , ShoppingCartSchema} from "../auth/Schemas/shoppingcart.schema";
import {ShoppingCartController} from "./shoppingcart.controller";
import {ShoppingCartService} from "./shoppingcart.service";
import {CheckoutSchema , Checkout} from "../auth/Schemas/checkout.schema";
import {Product, ProductSchema} from "../auth/Schemas/product.schema";
import {CheckoutModule} from "../checkout/checkout.module";
import {ProductModule} from "../product/product.module";

@Module({
    imports: [
        forwardRef(() => CheckoutModule),
        forwardRef(() => ProductModule),

        MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema },
        ]),

    ],
    controllers: [ShoppingCartController],
    providers: [ShoppingCartService],
    exports:[ShoppingCartService]
})
export class ShoppingCartModule {}
