import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { Product } from './Product.entity';

@InputType()
export class ProductCreateInput implements Partial<Product> {
  @Field()
  name: String;

  @Field()
  @Length(1, 255)
  description: String;

  @Field()
  price: number;
}

@InputType()
export class ProductUpdateInput implements Partial<Product> {
  @Field({nullable: true})
  name: String;

  @Field({nullable: true})
  @Length(1, 255)
  description: String;

  @Field({nullable: true})
  price: number;
}
