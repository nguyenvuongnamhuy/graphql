import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';

enum SUBSCRIPTION_EVENTS {
  newCompany = 'newCompany',
}

@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    @Inject(PUB_SUB)
    private readonly pubSub: RedisPubSub,
    private readonly companyService: CompanyService,
  ) {}

  @Mutation(() => Company, { name: 'createCompany' })
  async createCompany(@Args('companyInput') company: CreateCompanyInput) {
    const comp = await this.companyService.create(company);
    this.pubSub.publish(SUBSCRIPTION_EVENTS.newCompany, { newCompany: comp });
    return comp;
  }

  @Subscription(() => Company)
  newCompany() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newCompany);
  }

  @Query(() => [Company], { name: 'getAllCompany' })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: 'getCompany' })
  findOne(@Args('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  updateCompany(@Args('companyInput') company: UpdateCompanyInput) {
    return this.companyService.update(company.id, company);
  }

  @Mutation(() => Company, { name: 'removeCompany' })
  removeCompany(@Args('id') id: string) {
    return this.companyService.remove(id);
  }
}
