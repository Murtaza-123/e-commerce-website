import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ShoppingCartDocument = ShoppingCart & Document;

@Schema()
export class ShoppingCart {
    @Prop({ required: true })
    userId: string;

    @Prop({ type: [{ productId: { type: String, required: true }, quantity: { type: Number, required: true } }] })
    products: { productId:mongoose.Types.ObjectId; quantity: number }[];
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);