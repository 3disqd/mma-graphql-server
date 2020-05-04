import { InputType, Field } from 'type-graphql';
import { Organization } from './Organization.entity';
// import { ObjectId } from 'mongodb';

@InputType()
export class OrganizationCreateInput implements Partial<Organization> {
  @Field()
  name: string;
  //
  // @Field({ nullable: true })
  // managers: string[];
}

@InputType()
export class OrganizationUpdateInput implements Partial<Organization> {
  @Field({ nullable: true })
  name: string;

  // @Field({ nullable: true })
  // managers: ObjectId[];
}
