import { ObjectType, Field, ID } from 'type-graphql';
import {
  prop as Property,
  // arrayProp as ArrayProperty,
  getModelForClass,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Ref } from '../../types';
import { Organization } from '../Organization/Organization.entity';
import { Schedule } from './Schedule.entity';

@ObjectType({ description: 'The Point model' })
export class Point {
  @Field(() => ID)
  id: ObjectId;

  @Field()
  @Property({ required: true, unique: true })
  name: string;

  @Field()
  @Property()
  address: string;

  @Field((_type) => ID)
  @Property({ ref: Organization })
  organization_id: Ref<Organization>;
  // _doc: any;

  @Field(() => Schedule, {nullable: true})
  schedule: Schedule;
}

export const PointModel = getModelForClass(Point);
