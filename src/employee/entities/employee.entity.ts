import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from 'src/company/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.employees)
  company: Company;

  @Field()
  @Column()
  companyId: string;
}
