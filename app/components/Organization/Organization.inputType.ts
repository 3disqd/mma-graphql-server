import { InputType, Field, ID } from 'type-graphql';
import { Organization } from './Organization.entity';
import { ObjectId } from 'mongodb';

@InputType()
export class OrganizationCreateInput implements Partial<Organization> {
  @Field()
  name: string;
  //
  @Field(() => [ID], { nullable: true })
  managers: ObjectId[];
}

@InputType()
export class OrganizationUpdateInput implements Partial<Organization> {
  @Field({ nullable: true })
  name: string;

  @Field(() => [ID], { nullable: true })
  managers: ObjectId[];
  // @Field({ nullable: true })
  // managers: ObjectId[];
}
