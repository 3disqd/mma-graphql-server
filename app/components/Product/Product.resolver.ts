import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Product, ProductModel } from './Product.entity';
import { ProductCreateInput, ProductUpdateInput } from './Product.inputType';
import { Context } from '../../types';

@Resolver((_of) => Product)
export class ProductResolver {
  @Query((_returns) => Product, { nullable: false })
  async getProduct(@Arg('id') id: string) {
    const product = await ProductModel.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  @Query(() => [Product])
  async getBrandsProducts(@Arg('brand_id') brand_id: string) {
    return ProductModel.find({ brand_id });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('brand_id') brand_id: string,
    @Arg('data')
    { name, description, price }: ProductCreateInput
  ): Promise<Product> {
    return (
      await ProductModel.create({ brand_id, name, description, price })
    ).save();
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('id') id: string,
    @Arg('data')
    { name }: ProductUpdateInput,
    @Ctx() ctx: Context
  ): Promise<Product> {
    const owner_id = ctx.user?.id;
    if (!owner_id) throw new Error('BadToken');
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );

    if (!product) throw new Error('Product not found');

    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: string) {
    await ProductModel.deleteOne({ id });
    return true;
  }
}
