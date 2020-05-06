import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Product, ProductModel } from './Product.entity';
import { ProductCreateInput } from './Product.inputType';
import { OrganizationModel } from '../Organization/Organization.entity';
import find from 'lodash/find';

@Resolver((_of) => Product)
export class ProductResolver {
  @Query((_returns) => Product, { nullable: false })
  async returnSingleProduct(@Arg('id') id: string) {
    // const organization = await OrganizationModel.findOne({
    //   products: { $elemMatch: { _id: id } },
    // });
    const organization = await OrganizationModel.findOne({
      'products._id': { $eq: id },
      // 'products._id': id,
    });
    if (!organization) throw new Error('Organization not found');

    return find(organization.products, { id });
  }

  @Query(() => [Product])
  async getProducts(@Arg('organization_id') organization_id: string) {
    const organization = await OrganizationModel.findById(organization_id);
    if (!organization) throw new Error('Organization not found');

    return organization.products;
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('organization_id') organization_id: string,
    @Arg('data')
    { name, description, price }: ProductCreateInput
  ): Promise<Product> {
    const product = new ProductModel({
      name,
      description,
      price,
    });

    console.log(product._id);
    //
    // const a = await OrganizationModel.find({ _id: organization_id });
    const a = await OrganizationModel.find({
      'products._id': { $eq: '5eb06df04af8990bd483f256' },
    });
    console.log(a);

    const organization = await OrganizationModel.findByIdAndUpdate(
      organization_id,
      {
        $push: {
          products: product,
        },
      },
      { new: true }
    );

    if (!organization) throw new Error('Organization not found');

    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('organization_id') organization_id: string,
    @Arg('data')
    { name, description, price }: ProductCreateInput
  ): Promise<Product> {
    const product = new ProductModel({
      name,
      description,
      price,
    });

    const organization = await OrganizationModel.findByIdAndUpdate(
      organization_id,
      {
        $push: {
          products: product,
        },
      },
      { new: true }
    );

    if (!organization) throw new Error('Organization not found');

    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: string) {
    await ProductModel.deleteOne({ id });
    return true;
  }
}
