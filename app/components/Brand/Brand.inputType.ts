import { InputType, Field, ID } from 'type-graphql';
import { Brand } from './Brand.entity';
import { ObjectId } from 'mongodb';

@InputType()
export class BrandCreateInput implements Partial<Brand> {
  @Field()
  name: string;
  //
  @Field(() => [ID], { nullable: true })
  managers: ObjectId[];
}

@InputType()
export class BrandUpdateInput implements Partial<Brand> {
  @Field({ nullable: true })
  name: string;

  @Field(() => [ID], { nullable: true })
  managers: ObjectId[];

  // @Field({ nullable: true })
  // managers: ObjectId[];
}
