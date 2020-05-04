import { Resolver, Mutation, Arg, Query,  FieldResolver, Root } from "type-graphql";
import { Order, OrderModel } from "./Order.entity";
import { OrderInput } from "./Order.inputType";
import { Product, ProductModel } from '../Product/Product.entity';




@Resolver(_of => Order)
export class OrderResolver {

  @Query(_returns => Order, { nullable: false})
  async returnSingleOrder(@Arg("id") id: string){
    return await OrderModel.findById({_id:id});
  };

  @Query(() => [Order])
  async returnAllOrder(){
    return await OrderModel.find();
  };

  @Mutation(() => Order)
  async createOrder(@Arg("data"){user_id, date, payde}: OrderInput): Promise<Order> {
    const order = (await OrderModel.create({
      user_id,
      date,
      payde

    })).save();
    return order;
  };

  @Mutation(() => Boolean)
  async deleteOrder(@Arg("id") id: string) {
    await OrderModel.deleteOne({id});
    return true;
  }


  @FieldResolver(_type => (Product))
  async products(@Root() order: Order): Promise<Product> {
    // console.log(order, "order!")
    return (await ProductModel.findById(order._doc.products))!;
  }


}
