import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import { CartResolver } from './components/Cart/Cart.resolver';
import { UserResolver } from './components/User/User.resolver';
import { PointResolver } from './components/Point/Point.resolver';
import { OrderResolver } from './components/Order/Order.resolver';
import { ProductResolver } from './components/Product/Product.resolver';
import { CategoriesResolver } from './components/Category/Category.resolver';
import { OrganizationResolver } from './components/Organization/Organization.resolver';
import { authChecker } from './auth-checker';
import { Context, Token } from './types';
import * as jwt from 'jsonwebtoken';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      CategoriesResolver,
      ProductResolver,
      UserResolver,
      CartResolver,
      OrderResolver,
      OrganizationResolver,
      PointResolver,
    ],
    authChecker,
    emitSchemaFile: true,
    validate: false,
  });

  const MONGO_URI = process.env.DB_CONNECTION_STRING || '';

  // create mongoose connection
  const mongoose = await connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  await mongoose.connection;

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      let ctx: Context = {};

      const token = req.headers.authorization || '';
      if (token) {
        try {
          const { id, roles, email } = <Token>(
            jwt.verify(token, String(process.env.JWT_SECRET))
          );
          ctx.user = { id, roles, email };
        } catch (e) {}
      }
      return ctx;
    },
    introspection: true,
    playground: true,
  });

  const app = Express();

  server.applyMiddleware({ app });

  const port = parseInt(process.env.APP_PORT || '3333');
  const hostname = process.env.APP_IP || 'localhost';

  app.listen({ port, hostname }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://${hostname}:${port}${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, 'error');
});
