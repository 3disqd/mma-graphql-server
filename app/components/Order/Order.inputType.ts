import { InputType, Field } from "type-graphql";
import { Order } from "./Order.entity";



@InputType()
export class OrderInput implements Partial<Order> {

  @Field()
  user_id: String;

  @Field()
  payde: Boolean;

  @Field()
  date: Date;

}
