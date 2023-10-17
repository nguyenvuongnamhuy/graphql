import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeDTO {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  address: string;

  @Field()
  companyId: string;
}
