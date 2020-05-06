import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Point, PointModel } from './Point.entity';
import { PointCreateInput } from './Point.inputType';
import { Context } from '../../types';
import { BrandModel } from '../Brand/Brand.entity';

@Resolver((_of) => Point)
export class PointResolver {
  @Query((_returns) => Point, { nullable: false })
  async getPoint(@Arg('id') id: string) {
    const point = await PointModel.findById(id);
    if (!point) throw new Error('Point not found');
    return point;
  }

  @Authorized()
  @Query(() => [Point])
  async getAllPoints() {
    return PointModel.find();
  }

  @Authorized()
  @Mutation(() => Point)
  async createPoint(
    @Arg('brand_id') brand_id: string,
    @Arg('data')
    { name, address, schedule }: PointCreateInput,
    @Ctx() ctx: Context
  ): Promise<Point> {
    const owner_id = ctx.user?.id;
    if (!owner_id) throw new Error('BadToken');

    const brand = await BrandModel.findById(brand_id);
    if (!brand) throw new Error('Brand not exist');

    if (owner_id !== String(brand.owner_id))
      throw new Error('Permission denied ');

    return (
      await PointModel.create({ brand_id, name, address, schedule })
    ).save();
  }

  // TODO updatePoint

  // TODO deletePoint
}
