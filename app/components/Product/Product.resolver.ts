import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Product, ProductModel } from './Product.entity';
import { ProductInput } from './Product.inputType';
import { Categories, CategoriesModel } from '../Category/Category.entity';


@Resolver((_of) => Product)
export class ProductResolver {
  @Query((_returns) => Product, { nullable: false })
  async returnSingleProduct(@Arg('id') id: string) {
    return ProductModel.findById({ _id: id });
  }

  @Query(() => [Product])
  async returnAllProduct() {
    return ProductModel.find();
  }

  @Authorized("test")
  @Mutation(() => Product)
  async createProduct(
    @Arg('data')
      { name, description, color, stock, price, category_id }: ProductInput
  ): Promise<Product> {
    return (
      await ProductModel.create({
        name,
        description,
        color,
        stock,
        price,
        category_id,
      })
    ).save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: string) {
    await ProductModel.deleteOne({ id });
    return true;
  }

  @FieldResolver((_type) => Categories)
  async category(@Root() product: Product): Promise<Categories> {
    // console.log(product, "product!")
    return (await CategoriesModel.findById(product._doc.category_id))!;
  }
}
