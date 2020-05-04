import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Organization, OrganizationModel } from './Organization.entity';
import { OrganizationCreateInput } from './Organization.inputType';
import { Context } from '../../types';

@Resolver((_of) => Organization)
export class OrganizationResolver {
  @Query((_returns) => Organization, { nullable: false })
  async returnSingleOrganization(@Arg('id') id: string) {
    const organization = await OrganizationModel.findById(id);
    if (!organization) throw new Error('User not found');
    return organization;
  }

  @Authorized()
  @Query(() => [Organization])
  async returnAllOrganizations() {
    return OrganizationModel.find();
  }

  @Authorized()
  @Mutation(() => Organization)
  async createOrganization(
    @Arg('data')
    { name }: OrganizationCreateInput,
    @Ctx() ctx: Context
  ): Promise<Organization> {
    const owner_id = ctx.user?.id;
    if (!owner_id) throw new Error('BadToken');

    return (await OrganizationModel.create({ name, owner_id })).save();
  }

  @Authorized()
  @Mutation(() => Organization)
  async updateOrganization(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<Organization> {
    // console.log('=====');
    const owner_id = ctx.user?.id;
    if (!owner_id) throw new Error('BadToken');

    const organization = await OrganizationModel.findById(id);

    if (!organization) throw new Error('Organization not found');

    return organization;
  }
}
