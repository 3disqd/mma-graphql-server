import { InputType, Field, ID } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { User } from './User.entity';
import { ObjectId } from 'mongodb';

@InputType()
export class UserCreateInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
  // @Field(() => ID)
  // cart_id: ObjectId;
}

@InputType()
export class UserUpdateInput implements Partial<User> {
  @Field(() => ID)
  id: ObjectId;

  @Field({ nullable: true })
  @Length(3, 255)
  username: string;

  @Field({ nullable: true })
  @IsEmail()
  @Length(3, 255)
  email: string;
}
