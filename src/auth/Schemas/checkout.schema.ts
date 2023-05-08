import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



export type CheckoutDocument = Checkout & Document;

@Schema()
export class Checkout {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    products: {
        productId: string;
        quantity: number;
        price: number;
    }[];

    // @Prop({ required: true })
    // totalAmount: number;
    //
    // @Prop({ required: true, default: Date.now() })
    // createdAt: Date;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);

