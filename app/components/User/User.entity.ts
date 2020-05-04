import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

// import { Ref } from '../types';
//
// import { Cart } from './Cart';

// @modelOptions({
//   schemaOptions: {
//     toJSON: { virtuals: true },
//   },
// })
@ObjectType({ description: 'The User model' })
export class User {
  @Field(() => ID)
  readonly id: ObjectId;

  @Field({ nullable: true })
  @Property()
  username: string;

  @Field()
  @Property({ required: true, unique: true })
  email: string;

  @Field()
  @Property({ required: true })
  password: string;

  // @Field((_type) => String)
  // @Property({ ref: Cart, required: true })
  // cart_id: Ref<Cart>;
}

export const UserModel = getModelForClass(User);
