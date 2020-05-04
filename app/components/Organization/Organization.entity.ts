import { ObjectType, Field, ID } from 'type-graphql';
import {
  prop as Property,
  arrayProp as ArrayProperty,
  getModelForClass,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { User } from '../User/User.entity';
import { Ref } from '../../types';


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
  @ArrayProperty({ items: User, default: [] })
  managers: Ref<User>[];

}

export const OrganizationModel = getModelForClass(Organization);
