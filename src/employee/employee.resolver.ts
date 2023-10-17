import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO } from './dto/create-employee.input';
import { Company } from 'src/company/entities/company.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: CreateEmployeeDTO) {
    return this.employeeService.create(employee);
  }

  @Query(() => [Employee], { name: 'getAllEmployee' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Query(() => Employee, { name: 'getEmployee' })
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @ResolveField(() => Company)
  company(@Parent() employee: Employee) {
    return this.employeeService.getCompanyByEmployeeId(employee.companyId);
  }
}
