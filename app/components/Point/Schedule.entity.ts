import { Field, ObjectType, InputType } from 'type-graphql';
import { prop as Property } from '@typegoose/typegoose/lib/prop';
import { Ref } from '../../types';

@ObjectType({ description: 'The ScheduleItem model' })
@InputType('ScheduleItemInput')
class ScheduleItem {
  @Field()
  @Property()
  from: string;

  @Field()
  @Property()
  to: string;
}

@ObjectType({ description: 'The Schedule model' })
@InputType('ScheduleInput')
export class Schedule {
  @Field({ nullable: true })
  @Property()
  is_24x7: boolean;

  @Field({ nullable: true })
  @Property()
  comment: string;

  @Field(() => ScheduleItem, { nullable: true })
  @Property()
  mon: Ref<ScheduleItem>;
  @Field(() => ScheduleItem, { nullable: true })
  @Property()
  tue: Ref<ScheduleItem>;
  @Field(() => ScheduleItem, { nullable: true })
  @Property()
  wen: Ref<ScheduleItem>;
  @Field(() => ScheduleItem, { nullable: true })
  @Property()
  thu: Ref<ScheduleItem>;
}
