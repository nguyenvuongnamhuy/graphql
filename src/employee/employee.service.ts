import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDTO } from './dto/create-employee.input';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private companyService: CompanyService,
  ) {}

  async create(employee: CreateEmployeeDTO): Promise<Employee> {
    const emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
    });
  }

  async getCompanyByEmployeeId(id: string): Promise<Company> {
    return this.companyService.findOne(id);
  }
}
