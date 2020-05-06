import { ObjectType, Field, ID, Float, Authorized, InputType } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
} from '@typegoose/typegoose';

@ObjectType({ description: 'The Product model' })
@InputType('ProductInput')
export class Product {
  @Authorized()
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  name: String;

  @Authorized('ADMIN', 'MODERATOR')
  @Field()
  @Property()
  description: String;

  @Field((_type) => Float)
  @Property()
  price: number;

}

export const ProductModel = getModelForClass(Product);
