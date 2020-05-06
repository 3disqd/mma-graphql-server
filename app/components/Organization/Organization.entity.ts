import { ObjectType, Field, ID } from 'type-graphql';
import {
  prop as Property,
  arrayProp as ArrayProperty,
  getModelForClass,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { User } from '../User/User.entity';
import { Ref } from '../../types';
import { Product } from '../Product/Product.entity';

@ObjectType({ description: 'The Organization model' })
export class Organization {
  @Field(() => ID)
  id: ObjectId;

  @Field()
  @Property({ required: true, unique: true })
  name: string;

  @Field((_type) => ID)
  @Property({ ref: User })
  owner_id: Ref<User>;
  // _doc: any;

  @Field(() => [ID])
  @ArrayProperty({ items: ObjectId, default: [] })
  managers: Ref<User>[];

  @Field(() => Product)
  @ArrayProperty({ items: Product, default: [] })
  products: Ref<Product>[];
}

export const OrganizationModel = getModelForClass(Organization);
