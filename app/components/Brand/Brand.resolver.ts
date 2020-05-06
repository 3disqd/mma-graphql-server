import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Brand, BrandModel } from './Brand.entity';
import { BrandCreateInput, BrandUpdateInput } from './Brand.inputType';
import { Context } from '../../types';

@Resolver((_of) => Brand)
export class BrandResolver {
  @Query((_returns) => Brand, { nullable: false })
  async getBrand(@Arg('id') id: string) {
    const brand = await BrandModel.findById(id);
    if (!brand) throw new Error('Brand not found');
    return brand;
  }

  @Authorized()
  @Query(() => [Brand])
  async getBrands() {
    return BrandModel.find();
  }

  @Authorized()
  @Mutation(() => Brand)
  async createBrand(
    @Arg('data')
    { name }: BrandCreateInput,
    @Ctx() ctx: Context
  ): Promise<Brand> {
    const owner_id = ctx.user?.id;
    if (!owner_id) throw new Error('BadToken');

    return (await BrandModel.create({ name, owner_id })).save();
  }

  @Authorized()
  @Mutation(() => Brand)
  async updateBrand(
    @Arg('id') id: string,
    @Arg('data')
    { name, managers }: BrandUpdateInput,
    @Ctx() ctx: Context
  ): Promise<Brand> {
    console.log({ ...(name && { name }), ...(managers && { managers }) });
    console.log({ name, managers });
    const owner_id = ctx.user?.id;
    if (!owner_id) throw new Error('BadToken');
    const brand = await BrandModel.findByIdAndUpdate(
      id,
      { ...(name && { name }), ...(managers && { managers }) },
      {
        new: true,
      }
    );

    if (!brand) throw new Error('Brand not found');

    return brand;
  }
}
