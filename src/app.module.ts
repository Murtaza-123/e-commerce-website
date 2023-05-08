import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { ProductModule } from './product/product.module';
import { ShoppingCartService } from './shoppingcart/shoppingcart.service';
import { ShoppingCartController } from './shoppingcart/shoppingcart.controller';
import { ShoppingCartModule } from './shoppingcart/shoppingcart.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),MongooseModule.forRoot('mongodb://127.0.0.1:27017/ecommerce'),CheckoutModule, AuthModule, ProductModule , ProductModule, ShoppingCartModule, CheckoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
