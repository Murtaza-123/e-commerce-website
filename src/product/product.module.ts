import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Product , ProductSchema} from "../auth/Schemas/product.schema";
import { ProductController } from './product.controller';
import {ProductService} from "./product.service";
import {CheckoutModule} from "../checkout/checkout.module";
import {ShoppingCartModule} from "../shoppingcart/shoppingcart.module";

@Module({
  imports: [
    forwardRef(() => ShoppingCartModule),

    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}