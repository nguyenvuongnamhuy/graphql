import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;
}
