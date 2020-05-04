import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Product } from '../Product/Product.entity';
import { Ref } from '../../types';

@ObjectType({ description: 'The  Cart model' })
export class Cart {
  @Field(() => ID)
  id: string;

  @Field((_type) => String)
  @Property({ ref: Product, required: true })
  products: Ref<Product>;
  _doc: any;
}

export const CartModel = getModelForClass(Cart);