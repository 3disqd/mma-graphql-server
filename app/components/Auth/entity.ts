import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: 'The auth model' })
export class Auth {
  @Field()
  tkn: String;

  @Field()
  rt: String;
}
