import {
  ObjectType,
  Field,
  ID,
  Float,
  Authorized,
  InputType,
} from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Brand } from '../Brand/Brand.entity';
import { Ref } from '../../types';

@ObjectType({ description: 'The Product model' })
@InputType('ProductInput')
export class Product {
  @Authorized()
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  name: String;

  // @Authorized('ADMIN', 'MODERATOR')
  @Field()
  @Property()
  description: String;

  @Field((_type) => Float)
  @Property()
  price: number;

  @Field((_type) => ID)
  @Property({ ref: Brand })
  brand_id: Ref<Brand>;
}

export const ProductModel = getModelForClass(Product);
