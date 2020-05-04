import { InputType, Field, ID } from 'type-graphql';
import { Cart } from './Cart.entity';

import { ObjectId } from 'mongodb';

@InputType()
export class CartInput implements Partial<Cart> {
  @Field(() => ID)
  products: ObjectId;
}
