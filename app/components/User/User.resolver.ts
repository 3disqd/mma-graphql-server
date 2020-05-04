import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserModel } from './User.entity';
import { UserCreateInput, UserUpdateInput } from './User.inputType';
import normalizeEmail from 'validator/lib/normalizeEmail';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import { Auth } from '../Auth/entity';
import * as jwt from 'jsonwebtoken';
// import { ValidationError } from 'apollo-server-express';

// import { Cart, CartModel } from '../entities/Cart';

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async returnSingleUser(@Arg('id') id: string) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  @Query(() => [User])
  async returnAllUsers() {
    return UserModel.find();
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data')
      {
        email: emailValue,
        password,
      }: // cart_id
      UserCreateInput
  ): Promise<User> {
    const email = normalizeEmail(emailValue);
    if (!email) throw new Error('Email false');
    if (!isEmail(email)) throw new Error('Email not valid');
    if ((await UserModel.countDocuments({ email })) > 0)
      throw new Error('The email has already been used.');
    return (
      await UserModel.create({
        email,
        password: bcrypt.hashSync(password),
        // cart_id,
      })
    ).save();
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('data')
      { id, username, email: emailValue }: UserUpdateInput
  ): Promise<User> {
    const email = normalizeEmail(emailValue);
    if (!email) throw new Error('Email false');
    if (!isEmail(email)) throw new Error('Email not valid');

    if (email) {
      if (
        (await UserModel.countDocuments({
          _id: { $ne: id },
          email,
        })) > 0
      )
        throw new Error('The email has already been used.');
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        ...(username && { username }),
        ...(email && { email }),
      },
      { new: true }
    );
    if (!user) throw new Error('User not found');
    return user;
  }

  @Mutation(() => Auth)
  async login(
    @Arg('email') emailValue: string,
    @Arg('password') password: string
  ) {
    const email = normalizeEmail(emailValue);
    if (!email) throw new Error('Email false');
    if (!isEmail(email)) throw new Error('Email not valid');

    const user: User | null = await UserModel.findOne({
      email,
    });
    if (!user) throw new Error('User not found');

    if (!(await bcrypt.compare(password, user.password)))
      throw new Error('Password not valid');

    const tkn = getToken(user);
    //TODO refresh token
    const rt = 're'
    return { tkn, rt };
  }

  @Authorized('admin')
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }

  // @FieldResolver(() => Cart)
  // async cart(@Root() user: User): Promise<Cart> {
  //   // console.log(user, "userr!")
  //   return (await CartModel.findById(user._doc.cart_id))!;
  // }
}

const getToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, roles: ['test'] },
    String(process.env.JWT_SECRET)
  );
};
