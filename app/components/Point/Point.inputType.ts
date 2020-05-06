import { InputType, Field } from 'type-graphql';
import { Point } from './Point.entity';
import { Schedule } from './Schedule.entity';
// import { ObjectId } from 'mongodb';

@InputType()
export class PointCreateInput implements Partial<Point> {
  @Field()
  name: string;

  @Field({ nullable: true })
  address: string;

  @Field(() => Schedule, { nullable: true })
  schedule: Schedule;
  //
  // @Field({ nullable: true })
  // managers: string[];
}

@InputType()
export class PointUpdateInput implements Partial<Point> {
  @Field({ nullable: true })
  name: string;

  // @Field({ nullable: true })
  // managers: ObjectId[];
}
